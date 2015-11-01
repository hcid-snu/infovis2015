var dataSet = [300, 250, 160, 300, 200]
var circleSet = [250, 160, 300, 200]
var lineSet = [250, 160, 300]

var h = 600;

d3.select("#myPic")
	.selectAll("rect")
	.data(dataSet)
	.enter()
	.append("rect")
	.attr("y", function(d) {return h - d;})
	.attr("x", function(d, i) { return i*100 + 10;})
	.attr("width", 80)
	.attr("height", function(d) { var barHeight = d; return barHeight + "px";});

d3.select("#myPic")
	.selectAll("line")
	.data(lineSet)
	.enter()
	.append("line")
	.attr("x2", function(d, i) { if (i == 2) return 450; else {return (i+1)*100 + 150}})
	.attr("y2", function(d, i) { if (i == 2) return 400; else {var y2 = lineSet[i+1]; return h - y2;}})
	.attr("x1", function(d, i) { return i*100 +150})
	.attr("y1", function(d) {return h-d;})

d3.select("#myPic")
	.selectAll("circle")
	.data(circleSet)
	.enter()
	.append("circle")
	.attr("r", 20)
	.attr("cx", function(d, i) { return i*100 + 150})
	.attr("cy", function(d) {return h - d;})


