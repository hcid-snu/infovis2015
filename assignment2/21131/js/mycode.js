d3.select("#myBasketball")
  .append("rect")
  .attr("x", 80)
  .attr("y", 240)
  .attr("width", 220)
  .attr("height", 80)
  .attr("rx", 110)
  .attr("ry", 40)

 d3.select("#myBasketball")
  .append("circle")
  .attr("cx", 160)
  .attr("cy", 160)
  .attr("r", 130)

 d3.select("#myBasketball")
   .append("path")
   .attr("d", "M30 160 C100 60 220 60 285 130")
 d3.select("#myBasketball")
   .append("path")
   .attr("d", "M45 100 C30 155 40 190 60 243")
 d3.select("#myBasketball")
   .append("path")
   .attr("d", "M60 77 C55 155 100 270 220 275")
 d3.select("#myBasketball")
   .append("path")
   .attr("d", "M160 30 C55 80 70 170 285 190")

 d3.select("#myBasketball")
   .append("circle")
   .attr("cx", 100)
   .attr("cy", 130)
   .attr("r", 130)
   .attr("class", "class1")

