var width = 1000,
    height = 800

var svg = d3.select("#myGraph")
    .attr("width", width)
    .attr("height", height)

var color = d3.scale.category10().domain([0, 1, 2, 3, 4, 5, 6])

var force = d3.layout.force()
    .gravity(.05)		// 노드 간의 중력
    .distance(200)	// 노드 간의 기본 거리
    .charge(-70)		// 서로 밀치고 당기는 힘
    .size([width, height])

d3.json("data/mydata.json", function(error, graph) {
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
			.on("mouseover", mouseover)
			.on("mouseout", mouseout)
      .call(force.drag)
  
	node.append("circle")
    	.attr("r", 8)
			.style("fill", function(d) { 
        index = 0;
        if(d.group>2) { index = d.group-2}
        else {index = d.group -1} 
          
        return color(index) })
	  
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

    var dataLabel = []
        dataLabel.push('정시') // 1 
        dataLabel.push('지역 균형')  // 3
        dataLabel.push('특기자')
        dataLabel.push('농어촌')
        dataLabel.push('기회균형')
        dataLabel.push('외국인')
        dataLabel.push('정원 외') // 8
        
 var legend = svg.selectAll(".legend")
      .data(dataLabel)
     .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width - 280)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d, i){return color(i)});

  // draw legend text
  legend.append("text")
      .attr("x", width - 260)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "front")
      .text(function(d) { return d;})
	
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