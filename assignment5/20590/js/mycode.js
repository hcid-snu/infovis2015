var width = 1000,
    height = 800

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
  
  if(d.value == 'c')  {
    return "<strong>ID: </strong> <span style='color:#19A319'>" + d.id + "</span>" + "<br /><strong>Label: </strong> <span style='color:#19A319'>" + d.label + "</span>" + "<br /><strong>Value: </strong> <span style='color:#19A319'>" + "Conservative(C)" + "</span>";
  }
  
  else if(d.value == 'n') {
    return "<strong>ID: </strong> <span style='color:#19A319'>" + d.id + "</span>" + "<br /><strong>Label: </strong> <span style='color:#19A319'>" + d.label + "</span>" + "<br /><strong>Value: </strong> <span style='color:#19A319'>" + "Neutral(N)" + "</span>";
  }
  
  else {
    return "<strong>ID: </strong> <span style='color:#19A319'>" + d.id + "</span>" + "<br /><strong>Label: </strong> <span style='color:#19A319'>" + d.label + "</span>" + "<br /><strong>Value: </strong> <span style='color:#19A319'>" + "Liberal(L)" + "</span>";
  }
  });


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height).call(tip);

var color = d3.scale.category20();

var force = d3.layout.force()
        .charge(-120)
        .linkDistance(width/6)
        .size([width, height]);

d3.json("data/data.json", function(error, graph) {
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
      .on('mouseover',tip.show)
      .on('mouseout',tip.hide)     
      .call(force.drag)
  
	node.append("circle")
    	.attr("r", 8)
			.style("fill", function(d) {if(d.value == 'c') return "#FF704D"; else if(d.value == 'n') return "#3385FF"; else return "#5CE62E"; })
	  
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
})


