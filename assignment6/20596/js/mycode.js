var margin = {top: 40, right: 10, bottom: 10, left: 10},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom

var color = d3.scale.category20c()

var treemap = d3.layout.treemap()
    .size([width, height])
    .sticky(true)
    .value(function(d) { return d["size"]["2013"] })

d3.select("body").selectAll("div").remove()
var div = d3.select("body").append("div")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", margin.top + "px")

d3.json('data.json', function(error, root) {
  if (error) {
    alert(error);
    throw error;
  }

  var node = div.datum(root).selectAll(".node")
      .data(treemap.nodes)
    	.enter().append("div")
      .attr("class", "node")
      .call(position)
      .style("background", function(d) { return d.children ? color(d.name) : null })
      .text(function(d) { return d.children ? null : d.name + " (" + d["size"]["2013"] + ")"})

  d3.selectAll("#control input[name=mode]").on("click", function() {
    var year = this.value + "";
    var value = function(d) { return d["size"][year] }
    node
      .data(treemap.value(value).nodes)
      .text(function(d) { return d.children ? null : d.name + " (" + d["size"][year] + ")"})
      .transition()
      .duration(1500)
      .call(position)
  });
})

function position() {
  this.style("left", function(d) { return d.x + "px" })
      .style("top", function(d) { return d.y + "px" })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px" })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px" })
			.style("line-height", function(d) { return Math.max(0, d.dy - 1) + "px" })
}