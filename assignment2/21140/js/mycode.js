/**
 * Created by andy on 2015-10-10.
 */
d3.select("#myGraph")
    .append("circle")
    .attr("cx", 140)
    .attr("cy", 130)
    .attr("fill", "rgb(216, 41, 36)")
    .transition()
    .delay(300)
    .duration(5000)
    .attr("r", 90)
    .attr("fill", "white")
