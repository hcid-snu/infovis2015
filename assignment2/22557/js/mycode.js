var dataSet = [230, 180, 130, 80, 30]


d3.select("#myGraph")
	.append("svg")
	.selectAll("rect")
	.data(dataSet)
	.enter()
	.append("rect")
	.attr("x", function(d, i){return 30+i*50})
	.attr("y", function(d, i){return 300-d})
	.attr("width", 30)
	.attr("height", function(d, i) {return d})
	.style("fill", function(d, i) {return d3.rgb(30+i*50, 255-i*50, 130+i*20)})
	.transition()
	.duration(2000)
	.delay(function (d, i) {
		return i*300
	})
	.attr("y", 295)
	.attr("height", 5);
d3.select("#myGraph")
	.append("svg")
	.selectAll("circle")
	.data(dataSet)
	.enter()
	.append("circle")
	.attr("cx", function(d, i){return 45+i*50})
	.attr("cy", function(d, i){return 300-d})
	.attr("r", 0)
	.style("fill", function(d, i) {return d3.rgb(255-i*50, 130+i*20, 30+i*50)})
	.transition()
	.duration(1000)
	.delay(function (d, i) {
		return i*300
	})
	.attr("r", 6);
