var margin = { top: 75, bottom: 75, right: 100, left: 100 },
	width = 1200 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom

var color = d3.scale.category20()

var treemap = d3.layout.treemap()
	.size([width, height])
	.sticky(true)
	.value(function(d) { return d.size })

var div = d3.select("body").append("div")
	.style("position", "relative")
	.style("width", (width + margin.right + margin.left) + "px")
	.style("height", (height + margin.top + margin.bottom) + "px")
	.style("top", margin.top + "px")
	.style("left", margin.left + "px")

d3.json("mydata.json", function(error, root) {
	if (error) throw error;

	var node = div.datum(root).selectAll(".node")
		.data(treemap.nodes)
		.enter().append("div")
		.attr("class", "node")
		.call(position)
		.style("background", function(d) { return d.children ? color(d.name) : null })
		.text(function(d) { return d.children ? null : d.name })
		.style("font-weight", "bold")
		.attr("transform", "translate(-100," + gridSize / 2 + ")")


	d3.selectAll("input").on("change", function change() {
		var value = this.value == "count"
		? function() { return 1 }
		: function(d) { return d.size }

		node
		.data(treemap.value(value).nodes)
		.transition()
		.duration(1000)
		.call(position)
	})
})

function position() {
	this.style("width", function(d) { return Math.max(0, d.dx) + "px" })
		.style("height", function(d) { return Math.max(0, d.dy) + "px" })
		.style("top", function(d) { return d.y + "px" })
		.style("left", function(d) { return d.x + "px" })
		.style("line-height", function(d) { return Math.max(0, d.dy) + "px" })
}