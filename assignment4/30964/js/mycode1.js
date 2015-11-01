//숫자가 안나오는 부풀어오르는 파이차트


var margin = { top: 20, right: 20, bottom: 30, left: 50 }
var width = 960 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom
var svg = d3.select("body").append("svg")
 	.attr("width", width + margin.left + margin.right)
 	.attr("height", height + margin.top + margin.bottom)
 	.append("g")
 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")


var parseDate = d3.time.format("%d-%b-%y").parse

d3.tsv("data/yearby.tsv", function(error, data) {

	data.forEach(function(d) {
		d.date = parseDate(d.date)
		d.close = +d.close
		 console.log(d.close)
	})
	
	//x.domain(d3.extent(data, function(d) { return d.date }))
	//y.domain(d3.extent(data, function(d) { return d.close }))
	
// Set the rangestrann
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(30);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(10);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([35000, d3.max(data, function(d) { return d.close; })]);

    svg.append("path")        
        .attr("class", "line")
        .attr("d", valueline(data))
        
    svg.append("g")    
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")    
        .attr("class", "y axis")
        .call(yAxis);



})


drawPie("data/pie2009.csv")

d3.select("#year").on("change", function() {
 d3.select("#myGraph").selectAll("*").remove()
 drawPie("data/pie" + this.value + ".csv",
 this.value)
})


function drawPie(filename) {
	d3.csv(filename, function(error, data){
	
		var svgEle = document.getElementById("myGraph")
		var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
		var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
		svgWidth = parseFloat(svgWidth)
		svgHeight = parseFloat(svgHeight)
	
		var dataSet = []
		var dataLabel = []
		for(var i = 0; i < data.length; i++) {
			dataSet.push(data[i].a)
			dataLabel.push(data[i].Toa)
		}
	
		console.log(dataSet)

var outerRadius = height / 2 - 20,
    innerRadius = outerRadius / 3,
    cornerRadius = 10;



	var pie = d3.layout.pie().sort(null).padAngle(.02)

var arc = d3.svg.arc()
    .padRadius(outerRadius)
    .innerRadius(innerRadius);

	var color = d3.scale.category10()

	var ddd = 10

	var pieElements = d3.select("#myGraph")
		.selectAll("path")
		.data(pie(dataSet))
		.enter()
		.append("path")
		.attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")")
		.each(function(d) { d.outerRadius = outerRadius - 20; })
    	.attr("d", arc)
    	.on("mouseover", arcTween(outerRadius, 0))
    	.on("mouseout", arcTween(outerRadius - 20, 150));

    function arcTween(outerRadius, delay) {
  	return function() {
    d3.select(this).transition().delay(delay).attrTween("d", function(d) {
      var i = d3.interpolate(d.outerRadius, outerRadius);
      return function(t) { d.outerRadius = i(t); return arc(d); };
    });
  }

}
	pieElements
		.selectAll("g")
		.append("g")
		.attr("class", "pie")
		.style("fill", function(d, i) {
			return color(i)
		}) 
		.transition()
		.duration(1000)
		.delay(function(d, i) {
 			return i * 1000
		})
		.ease("cubic")




		.attrTween("d", function(d, i) {
 		var interpolate = d3.interpolate(
 			{ startAngle: d.startAngle, endAngle: d.startAngle },
 			{ startAngle: d.startAngle, endAngle: d.endAngle }
 			)
 				return function(t) {
 				return arc(interpolate(t) )}
			}) 

	pieElements
 		.append("text")
 		.attr("class", "pieNum")
 		.attr("x", 800)
 		.attr("y", 200)
 		.text(function(d, i){
 			return d.value + "%";

	 	})

 	.on('mouseover', function (d) {
    d3.select(this)
    .attr('fill', 'orange');
	})
                             
     .on('mouseout', function () {
     d3.select(this)
     .attr('fill', 'black');
	})

	svg.append("rect")




	})

}

