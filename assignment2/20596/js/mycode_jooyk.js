d3.select("#myGraph")
.append("circle")
.style("fill", "black")
.style("stroke","black")
.attr("cx", 100)
.attr("cy", 500)
.attr("r", 50)
.transition()
.duration(5000)
.style("fill", "yellow")
.style("stroke","black")
.attr("cx", 500)
.attr("cy", 250)
.attr("r", 150)
.transition()
.duration(5000)
.style("fill", "black")
.style("stroke","black")
.attr("cx", 900)
.attr("cy", 500)
.attr("r", 50)