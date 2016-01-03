var margin = {top: 0, right: 10, bottom: 30, left: 10},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom

var color = d3.scale.category20()

var treemap = d3.layout.treemap()
    .size([width, height])
    .sticky(true)
    .value(function(d) { return d.score })

var div = d3.select("body").append("div")
    .style("position", "relative")
    .style("width", (width + margin.left + margin.right) + "px")
    .style("height", (height + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", margin.top + "px")

d3.json("tree2.json", function(error, data) {
  if (error) throw error;

  var root = {"name": "webtoon", "children": [
    {"name": "월요일", "children": []},
    {"name": "화요일", "children": []},
    {"name": "수요일", "children": []},
    {"name": "목요일", "children": []},
    {"name": "금요일", "children": []},
    {"name": "토요일", "children": []},
    {"name": "일요일", "children": []},
  ] };

  data.forEach(function(d) {
    root.children.forEach(function(r) {
      if (d.dow == r.name) r.children.push({name: d.name, score: d.score})
    })
  });

  var node = div.datum(root).selectAll(".node")
      .data(treemap.nodes)
    	.enter().append("div")
      .attr("class", "node")
      .call(position)
      .style("background", function(d) { return d.children ? color(d.name) : null })
      .text(function(d) { return d.children ? null : d.name + " (" + d.score + ")"})

  d3.selectAll("input").on("change", function change() {
    var value = this.value == "count"
        ? function() { return 1 }
        : function(d) { return d.score }

    node
        .data(treemap.value(value).nodes)
      	.transition()
        .duration(1500)
        .call(position)
  })
})

function position() {
  this.style("left", function(d) { return d.x + "px" })
      .style("top", function(d) { return d.y + "px" })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px" })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px" })
			.style("line-height", function(d) { return Math.max(0, d.dy - 1) + "px" })
}