
var z = d3.scale.category20b(),
    i = 0;

var svg = d3.select("body")
    .on("touchstart", function() { d3.event.preventDefault(); })
  .append("svg")
    .style("pointer-events", "all")
    .on("mousemove", function() { particle(d3.mouse(this)); })
    .on("touchmove", function() { d3.touches(this).forEach(particle); });

function particle(m) {
  svg.append("circle")
      .attr("cx", m[0])
      .attr("cy", m[1])
      .attr("r", 1e-8)
      .style("stroke", z(++i))
      .style("stroke-opacity", 1)
    .transition()
      .duration(2000)
      .ease(Math.sqrt)
      .attr("r", 30)
      .style("stroke-opacity", 1e-8) //1e-6
      .remove();
}

