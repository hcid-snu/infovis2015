
var colors = ["red", "orange", "yellow", "green", "blue", "purple"]

d3.select("#mySVG")  
  	.selectAll("rect")
    .data(colors)
  	.enter()
  .append("rect")
  	.attr("x", 0) 
  	.attr("y", function(d, i) { return i * 80 })  // 각 사각형의 시작 y좌표 조정 
    .style("fill", function(d, i) { return d })
  	.attr("width", "0px")  // transition 효과를 위해 수정 
  	.transition()  
  	.attr("width", 750) // 각 사각형의 너비 조정 
  	.attr("height", 80)
  	.delay(function(d, i) { return i * 500 })  //transition 효과 순서
  	.duration(2500) // 각 transition 사이 시간차 
