var width = 1400,
    height = 1000

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)

var color = d3.scale.category10()

var force = d3.layout.force()
    .gravity(.03)		// 노드 간의 중력
    .distance(400)	// 노드 간의 기본 거리
    .charge(-250)		// 서로 밀치고 당기는 힘
    .size([width, height])

d3.json("database.json", function(error, graph) {
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
  
	node.append("circle")
    	.attr("r", 8)
			.style("fill", function(d) { return color(d.group) })	  


var images = node.append("svg:image")
        .attr("xlink:href",  function(d) { return d.img;})
        .attr("x", function(d) { return -25;})
        .attr("y", function(d) { return -25;})
        .attr("height", 50)
        .attr("width", 50);





  node.append("text")
      .attr("dx", 24)
      .attr("dy", ".35em")
      .text(function(d) { return d.name })
      .attr("fill","blue")
      .attr("font-weight", "bold")
	
  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x })
        .attr("y1", function(d) { return d.source.y })
        .attr("x2", function(d) { return d.target.x })
        .attr("y2", function(d) { return d.target.y })
    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")" })
  })
	
})