
// dataset
var dataSet = [230, 200, 150, 160, 210, 240, 160, 120, 100, 70, 80, 95, 110, 130, 180, 190, 240, 220, 180, 140, 120, 100, 90, 100, 150, 170, 200, 230, 210, 180, 120, 100, 80, 50, 30, 20, 35, 50, 100, 130, 200, 190, 150, 160, 220, 240, 160, 120, 130, 70, 80, 95, 110, 130, 160, 160, 180, 220, 180, 120, 90, 50, 70, 100, 150, 180, 220, 240, 230, 210, 180, 120, 100, 80, 50, 30, 20, 35, 50, 100, 130]

// visualization code
d3.select("#body")
	.selectAll("rect")
	.data(dataSet)
	.enter()
  .append("rect")
	.attr("x", function(d, i) { return i * 15 })
	.attr("y", 0)
	.attr("height", "0px")
	.attr("width", 8)
	.transition()
	.delay(function(d, i){ return i * 500; })  
	.duration(2500)														 // 2.5초에 걸쳐 애니메이션화 함
	.attr("height", function(d, i) { return d })
	