var width = 1500,
	height = 800;

var color = d3.scale.category20();

var force = d3.layout.force()
				.gravity(.03)
				.charge(-350)
				.linkDistance(70)
				.size([width, height]);

var svg = d3.select("body").append("svg")
			.attr("width", width)
			.attr("height", height);

d3.json("data.json", function(error, graph) {
	if (error) throw error;

	force.nodes(graph.nodes)
		 .links(graph.links)
		 .start();

	var link = svg.selectAll(".link")
				.data(graph.links)
				.enter().append("line")
				.attr("class", "link")
				.style("stroke-width", function(d) { return Math.sqrt(d.value); });

	var node = svg.selectAll(".node")
				.data(graph.nodes)
				.enter()
				.append("g")
				.attr("class", "node")
				.on("mouseover", mouseover)
				.on("mouseout", mouseout)
				.call(force.drag)

	node.append("circle")
		.attr("r", 8)
		.style("fill", function(d) { return color(d.value) });
			
	
	node.append("text")  
		.attr("dx", 12) 
		.attr("dy", ".35em")  
		.attr("font-size","0.7em")
		.text(function(d) { return d.label; });
	
	force.on("tick", function() {
		link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")" })
	});	

	function mouseover() {
		
		d3.select(this)
			.select("circle")
			.transition()
			.duration(500)
			.attr("r", 16)

		d3.select(this)
			.select("text")
			.style("font-size","2.0em")
			.style("fill", "red")

	}
	
	function mouseout() {
		d3.select(this)
			.select("circle")
			.transition()
			.duration(500)
			.attr("r", 8)

		d3.select(this)
			.select("text")
			.style("font-size",".70em")
			.style("fill", "black")
	}
});

