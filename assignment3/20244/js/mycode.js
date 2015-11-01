var margin = {top: 20, right: 40, bottom: 70, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y1 = d3.scale.linear().domain([0, 50]).range([height, 0]);
    
var y2 = d3.scale.linear().domain([0,35]).range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxisLeft = d3.svg.axis()
    .scale(y1)
    .orient("left")

var yAxisRight = d3.svg.axis()
    .scale(y2)
    .orient("right")
    
var color = ["#FFBF00", "#58ACFA"];    
    
var legendRectSize = 18;

var legendSpacing = 4;
var legendNames = ["Ratio of Social Expenditure in GDP", "Amount of Social Expenditure"];
    
var tip1 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "Employment:"+" "+"<span style='color:red; font-weight: bold; font-size: 12px'>" + d.Employment + "</span>"+" "+"/ 10" 
    +"<br/>"+ 
    "Community Network:"+" "+"<span style='color:red; font-weight: bold; font-size: 12px'>" + d.Community + "</span>"+" "+"/ 10"
    +"<br/>"+ 
    "Education Attainment:"+" "+"<span style='color:red; font-weight: bold; font-size: 12px'>" + d.Education + "</span>"+" "+"/ 10"
    +"<br/>"+ 
    "Civic Engagement:"+" "+"<span style='color:red; font-weight: bold; font-size: 12px'>" + d.Civic + "</span>"+" "+"/ 10"
    +"<br/>"+ 
    "Health:"+" "+"<span style='color:red; font-weight: bold; font-size: 12px'>" + d.Health + "</span>"+" "+"/ 10"
    +"<br/>"+ 
    "Satisfaction:"+" "+"<span style='color:red; font-weight: bold; font-size: 12px'>" + d.Satisfaction + "</span>"+" "+"/ 10"  
    ;
  })	
  
var tip2 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "Social Exp.:"+" "+"$"+" "+"<span style='color:red; font-weight: bold'>" + d.INTs + "</span>"+" "+"(trillion)"
    +"<br/>"+
    "GDP:"+" "+"$"+" "+"<span style='color:red; font-weight: bold'>" + d.gdp + "</span>"+" "+"(trillion)" 
    +"<br/>"+ 
    "GDP per head:"+" "+"$"+" "+"<span style='color:red; font-weight: bold'>" + d.gdpP + "</span>"
  })	
	  
	
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "graph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


svg.call(tip1);
svg.call(tip2);

d3.csv("data/soex.csv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.country; }));
  y1.domain([0, d3.max(data, function(d) { return d.value+70; })]);
 
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
		.selectAll("text")
    	.style("text-anchor", "end")
    	.attr("dx", "-.8em")
    	.attr("dy", ".15em")
    	.attr("transform", function(d) {
        	return "rotate(-45)" 
    	})

  svg.append("g")
      .attr("class", "y axis axisLeft")
      .attr("transform", "translate(0,0)")
      .call(yAxisLeft)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("percent(%)");
  
  svg.append("g")
      .attr("class", "y axis axisRight")
      .attr("transform", "translate(" + (width) + ",0)")
      .call(yAxisRight)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", 5)
      .attr("y", 20)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("$ in Trillion");    

  bars = svg.selectAll(".bar").data(data).enter();
  
  bars.append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x(d.country); })
      .attr("width", x.rangeBand()/2)
      .attr("y", function(d) { return y1(d.value); })
      .attr("height", function(d) { return height - y1(d.value); })
      .on('mouseover', tip1.show)
      .on('mouseout', tip1.hide)

  bars.append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x(d.country) + x.rangeBand()/2; })
      .attr("width", x.rangeBand()/2)
      .attr("y", function(d) { return y2(d.INTs); })
      .attr("height", function(d) { return height - y2(d.INTs); })
      .on('mouseover', tip2.show)
      .on('mouseout', tip2.hide)
      
  legend = svg.selectAll(".legend").data(color).enter();
  legend.append("g")
  .attr('class', 'legend')
  .attr('transform', function(d, i) {
  	var height = legendRectSize + legendSpacing;
  	 var offset =  height * color.length / 2;     // NEW
            var horz = -2 * legendRectSize;                       // NEW
            var vert = i * height - offset;                       // NEW
            return 'translate(' + horz + ',' + vert + ')';        // NEW
  });
    
  legend.append('rect')
  .attr('x', width-190)
  .attr("y", function(d, i){ return i *  23;})
  .attr("width", 13)
  .attr("height", 13)
  .style("fill", function(d, i) { 
    return color[i];
  });

  legend.append('text')
  .attr("x", width-170)
  .attr("y", function(d, i){ return i *  23+10;})
  .text(function(d, i) {
  	return legendNames[i];
  })
});

function type(d) {
  d.value = +d.value;
  return d;
}