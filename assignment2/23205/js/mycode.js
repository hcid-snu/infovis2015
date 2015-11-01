var count = 111
var w = window.innerWidth
var h = window.innerHeight
var color1 = Math.random()*260

var svg = d3.select("body")
    .append("svg")
    .attr("width", w-30)
    .attr("height", h - 200);

for (var i = 0; i < count; i++) {
    svg
    .append("circle")
    .attr("cx", Math.random() * w)
    .attr("cy", Math.random() * h - 150)
    .attr("r", (Math.random() * 60)^2 + 5)
    .attr("fill", function() { return "hsl(" + Math.random() * 360 + ", 100%, 60%)" })
    // .style("opacity",  Math.random())
    .transition()
    .style("stroke", function() { return "hsl(" + Math.random() * 360 + ", 100%, 80%)" })
    .style("stroke-width", (Math.random() * 20)^2 + 20);
    // .style("stroke-opacity", Math.random());
}
