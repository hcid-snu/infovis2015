var colors = ['dummy','dummy', 'red', 'yellow', 'green', 'blue']

d3.select("#cambody")
	.selectAll("rect")
	.data(colors)
	.enter()
  .append("rect")
	.attr("x", function(d, i) { return i * 17 + 30 })
	.attr("y", 10)
	.attr("height", 0)
	.transition()
	.delay(function(d, i){ return i * 200; })
	.duration(2000)
	.attr("height", 100)
	.attr("width", 17)
	.style("fill", function(d, i) { return d })


// <rect x = "60" y = "10" width = "15" height = "100"
// 	style = "fill:red"/>
// <rect x = "75" y = "10" width = "15" height = "100"
// 	style = "fill:yellow"/>
// <rect x = "90" y = "10" width = "15" height = "100"
// 	style = "fill:green"/>
// <rect x = "105" y = "10" width = "15" height = "100"
// 	style = "fill:blue"/>