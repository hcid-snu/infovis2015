d3.select("#myGraph")
	.append("svg")
	.append("rect")
	.style("fill", "orange")
	.style("stroke", "orange")
	.attr("x", 0)
	.attr("y", 0)
	.attr("height", 20)
	.attr("width", 0)
	.transition()
	.duration(2000)
	.attr("width", 600)