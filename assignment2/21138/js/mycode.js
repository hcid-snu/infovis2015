// bar graph를 위한 dataset
var dataSet = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]

// visualization code
d3.select("#myGraph")
	.selectAll("line")
	.data(dataSet)
	.enter()
  .append("line")
	.attr("x1", 0)
	.attr("y1", function(d, i) { return (i+1) * 25 })
	.attr("x2", function(d, i) { return (i+1) * 25 })
	.attr("y2", 500)