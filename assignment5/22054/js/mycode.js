
var width = 500,
    height = 500;

var cluster = d3.layout.cluster()
    .size([width, height - 200]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(40,0)");
    


d3.json("city.json", function(error, root) {
	
  var nodes = cluster.nodes(root);
  var links = cluster.links(nodes);
  
  console.log(nodes);
  console.log(links);

  var link = svg.selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = svg.selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

  node.append("circle")
      .attr("r", 4.5);

  node.append("text")
      .attr("dx", function(d) { return d.children ? -8 : 8; })
      .attr("dy", 3)
      .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { return d.name; });
});
function mouseover() {
		d3.select(this).select("circle").transition()
				.duration(500)
				.attr("r", 8)
	}
	
function mouseout() {
		d3.select(this).select("circle").transition()
				.duration(500)
				.attr("r", 4.5)
	}