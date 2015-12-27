var width=1000,
	height=800

var svg=d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)

var color = d3.scale.category20()

var force=d3.layout.force()
	.gravity(0.1)
	.distance(300)
	.charge(-50)
	.size([width, height])

d3.csv("data/notreal.csv", function(data) {
    graph = { "nodes": [], "links": []};

    data.forEach(function(d) {
    	graph.nodes.push({ "name": d.source, "group": +d.groupsource});
    	graph.nodes.push({ "name": d.target, "group": +d.grouptarget});
    	graph.links.push({ "source":d.source, "target": d.target, "value": d.value});
    });

    var nodesmap = d3.nest()
    					.key(function(d) {return d.name; })
    					.rollup(function(d) {return { "name": d[0].name, "group":d[0].group }})
    					.map(graph.nodes);

    graph.nodes=d3.keys(d3.nest()
    					.key(function(d) { return d.name; })
    					.map(graph.nodes));
    graph.links.forEach(function(d,i) {
    	graph.links[i].source=graph.nodes.indexOf(graph.links[i].source);
    	graph.links[i].target=graph.nodes.indexOf(graph.links[i].target);
    });

    graph.nodes.forEach(function(d,i) {graph.nodes[i]={ "name": nodesmap[d].name, "group": nodesmap[d].group }; })

	force
		.nodes(graph.nodes)
		.links(graph.links)
		.start();

	var link = svg.selectAll(".link")
		.data(graph.links)
	  .enter().append("line")
		.attr("class", "link")
		.style("stroke-width", function(d) {return Math.sqrt(d.value)});

	var node = svg.selectAll(".node")
		.data(graph.nodes)
	  .enter().append("g")
		.attr("class", "node")
			.on("mouseover", mouseover)
			.on("mouseout", mouseout)
		.call(force.drag);

	  node.append("circle")
	  	  .attr("r", 8)
	  	  		.style("fill", function(d) {return color(d.group) })
	node.append("text")
		.attr("dx", 12)
		.attr("dy", ".35em")
		.text(function(d) {return d.name})
	force.on("tick", function() {
		link.attr("x1", function(d) {return d.source.x })
			.attr("y1", function(d) {return d.source.y })
			.attr("x2", function(d) {return d.target.x })
			.attr("y2", function(d) {return d.target.y })
		node.attr("transform", function(d) {return "translate(" + d.x + "," + d.y + ")" })
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
		};

});
