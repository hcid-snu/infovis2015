/* 	sohyun's InfoVis assignment 
	  piechart + linegraph
*/

// Define elements for a pie chart
var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    		    .range(["#8894ae", "#9fa9be", "#b7bece", "#cfd4de", "#e7e9ee"]);

var arc = d3.svg.arc()
    		  .outerRadius(radius - 10)
    		  .innerRadius(0);

var pie = d3.layout.pie()
    		  .sort(null)
    		  .value(function(d) { return d.events; });

var svg1 = d3.select("body").append("svg")
    		  .attr("width", width)
    		  .attr("height", height)
  			  .append("g")
    		  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Get data and draw a pie chart 
d3.csv("data/locdata.csv", function(error, data) {

  data.forEach(function(d) {
    d.events = +d.events;
  });

  	var g = svg1.selectAll(".arc")
      		  .data(pie(data))
    		    .enter().append("g")
      		  .attr("class", "arc");

  		  g.append("path")
      		.attr("d", arc)
      		.style("fill", function(d) { return color(d.data.state); });

  		  g.append("text")
      		.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      		.attr("dy", ".35em")
      		.style("text-anchor", "middle")
      		.text(function(d) { return d.data.state; });

});

// Define elements for a linegraph
var margin = {top: 100, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale().range([0, width]);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    		    .scale(x)
            .ticks(d3.time.days, 1)
            .tickFormat(d3.time.format('%a %e'))
    		    .orient("bottom");

var yAxis = d3.svg.axis()
    		    .scale(y)
    		    .orient("left");

var line = d3.svg.line()
    		  .x(function(d) { return x(d.date); })
    		  .y(function(d) { return y(d.events); });

var svg2 = d3.select("body").append("svg")
    		  .attr("width", width + margin.left + margin.right)
    		  .attr("height", height + margin.top + margin.bottom)
  			  .append("g")
    		  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get data and draw a linegraph
d3.csv("data/timedata.csv", function(error, data) {
  		if (error) throw error;
      data.forEach(function(d) {
    	d.date = parseDate(d.date);
    	d.events = +d.events;
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.events; }));

  	svg2.append("g")
      	.attr("class", "x axis")
      	.attr("transform", "translate(0," + height + ")")
      	.call(xAxis);

  	svg2.append("g")
      	.attr("class", "y axis")
      	.call(yAxis)
    	  .append("text")
      	.attr("transform", "rotate(-90)")
      	.attr("y", 6)
      	.attr("dy", ".71em")
      	.style("text-anchor", "end")
      	.text("# Accidents/Incidents");

  	svg2.append("path")
      	.datum(data)
      	.attr("class", "line")
      	.attr("d", line);
});

