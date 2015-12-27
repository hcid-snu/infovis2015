var width = 1000,
    height = 800

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)

var color = d3.scale.category20()

var force = d3.layout.force()
    .gravity(.01)		
    .distance(200)	
    .charge(-100)		
    .size([width, height])

d3.json("data/instagram.json", function(error, graph) {
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start()
	
  var link = svg.selectAll(".link")
      .data(graph.links)
			.enter().append("line")
      .attr("class", "link")
			.style("stroke-width", function(d) { return Math.sqrt(d.value) })
	
  var node = svg.selectAll(".node")
      .data(graph.nodes)
    	.enter().append("g")
      .attr("class", "node")
      .call(force.drag)
      .on('dblclick', connectedNodes);
        
  
	node.append("circle")
    	.attr("r", 8)
			.style("fill", function(d) { return color(d.group) })
	  
  node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.name })
	
  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x })
        .attr("y1", function(d) { return d.source.y })
        .attr("x2", function(d) { return d.target.x })
        .attr("y2", function(d) { return d.target.y })
    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")" })
  })
	
  // highlighting
  var toggle = 0;

  var linkedByIndex = {};
  for (i = 0; i < graph.nodes.length; i++) {
    linkedByIndex[i + "," + i] = 1;
    };
  graph.links.forEach(function (d) {
    linkedByIndex[d.source.index + "," + d.target.index] = 1;
  });

  // legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .attr("class","legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

  legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });

  // f(x) for highlighting
  function neighboring(a, b) {
    return linkedByIndex[a.index + "," + b.index];
    }

  function connectedNodes() {
    if (toggle == 0) {
      d = d3.select(this).node().__data__;
        node.style("opacity", function (o) {
          return neighboring(d, o) | neighboring(o ,d) ? 1 : 0.1;
      });

      link.style("opacity", function (o) {
        return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
      });

      toggle = 1;
      } else {
        node.style("opacity", 1);
        link.style("opacity", 1);
        toggle = 0;
      }
    }

})




