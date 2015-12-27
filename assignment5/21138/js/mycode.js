drawPie("data/12.json")

d3.select("#year").on("change", function() { 
  d3.select("svg").selectAll("*").remove()
  drawPie("data/"+ this.value + ".json", this.value)
})

function drawPie(filename){
  var width = 1800,
      height = 1000

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)

  var color = d3.scale.category10()

  var force = d3.layout.force()
      .gravity(.1)		// 노드 간의 중력
      .distance(100)	// 노드 간의 기본 거리
      .charge(-900)		// 서로 밀치고 당기는 힘
      .size([width, height])


  d3.json(filename, function(error, graph) {
    force
        .nodes(graph.nodes)
        .links(graph.links)
        .start()
  	
    var link = svg.selectAll(".link")
        .data(graph.links)
  			.enter().append("line")
        .attr("class", "link")
  			.style("stroke-width", function(d) { return 5*Math.sqrt(d.value) })
  	
    var node = svg.selectAll(".node")
        .data(graph.nodes)
      	.enter().append("g")
        .attr("class", "node")
  			.on("mouseover", mouseover)
  			.on("mouseout", mouseout)
        .call(force.drag)
    
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
  	
  	function mouseover() {
  		d3.select(this).select("circle").transition()
  				.duration(500)
  				.attr("r", 16)
  	}
  	
  	function mouseout() {
  		d3.select(this).select("circle").transition()
  				.duration(500)
  				.attr("r", 8)
  	}
  })
}