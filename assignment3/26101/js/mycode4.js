var margin = {top:50, right:20, bottom:30, left:40},
	width = 1024 -margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
	.rangeRoundBands([0,width], .1);

var y = d3.scale.linear()
	.range([height, 0]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("bottom")
	.ticks(10);

var svg = d3.select("#myGraph")
	.attr("width", width+ margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
  	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/data.csv", function(error, data) {
	if (error) throw error;
	else {
		x.domain(data.map(function(d) {return d.country; }));
		y.domain([0, d3.max(data, function(d) {return d.value })]);

		svg.append("g")
			 .attr("class", "x axis")
			 .attr("transform", "translate(0," + height + ")")
			 .call(xAxis);
		svg.append("g")
			 .attr("class", "y axis")
			 .attr("transform", "rotate(90)")
			 .call(yAxis)
		  .append("text")
		  	 .attr("x", -9)
		  	 .attr("transform", "rotate(-90)")
		  	 .attr("y", 6)
		  	 .attr("dy", ".71em")
		  	 .style("text-anchor", "end")
		  	 .text("(%)");

		svg.selectAll(".bar")
			.data(data)
		  .enter().append("rect")
		  	.attr("class", "bar")
		  	.attr("x", function(d) {return x(d.country); })
		  	.attr("width", x.rangeBand())
		  	.attr("y", function(d) {return y(d.value); })
		  	.attr("height", function(d) {return height - y(d.value); });
}});

function type(d) {
	d.value = +d.value;
	return d;
};

