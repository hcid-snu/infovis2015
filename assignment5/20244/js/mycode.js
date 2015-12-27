function selectableForceDirectedGraph() {
var width = 1000,
    height = 540,
    shiftkey, ctrlKey;

var nodeGraph = null;
var xScale = d3.scale.linear()
	.domain([0, width]).range([0, width]);
	
var yScale = d3.scale.linear()
	.domain([0, height]).range([0, height]);

var svg = d3.select("#force_graph")
	.attr("tabindex", 1)
	.on("keydown.brush", keydown)
	.on("keyup.brush", keyup)
	.each(function() {this.focus();})
	.append("svg")
    .attr("width", width)
    .attr("height", height)
    
var zoomer = d3.behavior.zoom()
	.scaleExtent([0.1, 10])
	.x(xScale)
	.y(yScale)
	.on("zoomstart", zoomstart)
	.on("zoom", redraw)
	
function zoomstart() {
	node.each(function(d) {
		d.selected = false
		d.previouslySelected = false
	})
	node.classed("selected", false)
}

function redraw() {
        vis.attr("transform",
                 "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
}

var brusher = d3.svg.brush()
	.x(xScale)
	.y(yScale)
	.on("brushstart", function (d) {
		node.each(function (d) {
			d.previouslySelected = shiftKey && d.selected
		})
	})
	.on("brush", function() {
        var extent = d3.event.target.extent();

        node.classed("selected", function(d) {
            return d.selected = d.previouslySelected ^
            (extent[0][0] <= d.x && d.x < extent[1][0]
             && extent[0][1] <= d.y && d.y < extent[1][1]);
        });
    })
    .on("brushend", function() {
        d3.event.target.clear();
        d3.select(this).call(d3.event.target);
    });

var svg_graph = svg.append("svg:g")
	.call(zoomer)

var rect = svg_graph.append('svg:rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'transparent')
    //.attr('opacity', 0.5)
    .attr('stroke', 'transparent')
    .attr('stroke-width', 1)
    //.attr("pointer-events", "all")
    .attr("id", "zrect")

var brush = svg_graph.append("g")
    .datum(function() { return {selected: false, previouslySelected: false}; })
    .attr("class", "brush");

var vis = svg_graph.append("svg:g");

vis.attr('fill', 'red')
   .attr('stroke', 'black')
   .attr('stroke-width', 1)
   .attr('opacity', 0.6)
   .attr('id', 'vis')


brush.call(brusher)
     .on("mousedown.brush", null)
     .on("touchstart.brush", null) 
     .on("touchmove.brush", null)
     .on("touchend.brush", null); 

brush.select('.background').style('cursor', 'auto');

var link = vis.append("g")
    .attr("class", "link")
    .selectAll("line");

var node = vis.append("g")
    .attr("class", "node")
    .selectAll("circle");
    
var tag = vis.append("g")
    .attr("class", "tag")
    .selectAll("text");

var legend = svg_graph.append("g")
    .attr("class", "legend")
    .selectAll("circle");
    
var legendTag = svg_graph.append("g")
    .attr("class", "legendTag")
    .selectAll("text");   
    
var linkDescript = svg_graph.append("g")
    .attr("class", "linkDescript")
    .selectAll("rect");
    
var linkTag = svg_graph.append("g")
    .attr("class", "linkTag")
    .selectAll("text");                  

center_view = function() {
        // Center the view on the molecule(s) and scale it so that everything
        // fits in the window

	if (nodeGraph === null)
         return;

    var nodes = nodeGraph.nodes;

        //no molecules, nothing to do
    if (nodes.length === 0)
         return;

        // Get the bounding box
        min_x = d3.min(nodes.map(function(d) {return d.x;}));
        min_y = d3.min(nodes.map(function(d) {return d.y;}));

        max_x = d3.max(nodes.map(function(d) {return d.x;}));
        max_y = d3.max(nodes.map(function(d) {return d.y;}));


        // The width and the height of the graph
        mol_width = max_x - min_x;
        mol_height = max_y - min_y;

        // how much larger the drawing area is than the width and the height
        width_ratio = width / mol_width;
        height_ratio = height / mol_height;

        // we need to fit it in both directions, so we scale according to
        // the direction in which we need to shrink the most
        min_ratio = Math.min(width_ratio, height_ratio) * 0.8;

        // the new dimensions of the molecule
        new_mol_width = mol_width * min_ratio;
        new_mol_height = mol_height * min_ratio;

        // translate so that it's in the center of the window
        x_trans = -(min_x) * min_ratio + (width - new_mol_width) / 2;
        y_trans = -(min_y) * min_ratio + (height - new_mol_height) / 2;


        // do the actual moving
        vis.attr("transform",
                 "translate(" + [x_trans, y_trans] + ")" + " scale(" + min_ratio + ")");

                 // tell the zoomer what we did so that next we zoom, it uses the
                 // transformation we entered here
                 zoomer.translate([x_trans, y_trans ]);
                 zoomer.scale(min_ratio);

    };

    function dragended(d) {
        //d3.select(self).classed("dragging", false);
        node.filter(function(d) { return d.selected; })
        .each(function(d) { d.fixed &= ~6; })

    }
        
    

var colores_g = ["#ff9900", "#990099", "#008080", "#66aa00", "#D4AF37", "#800000", "#000080", 
				"#808000", "#808080", "#800080", "#FF00FF", "#dc3912", "#000000", "#C0C0C0", 
				"#66CCFF", "#3366cc", "#FFDF00" ]

var colores_r = ["#008000", "#FF0000", "#0000FF", "#FF3399", "#999999"];

var force = d3.layout.force()
    .gravity(0.05)		// 노드 간의 중력
    .distance(100)	// 노드 간의 기본 거리
    .charge(-120)		// 서로 밀치고 당기는 힘
    .size([width, height])

d3.json("data/champion.json", function(error, graph) {
  nodeGraph = graph;
  graph.links.forEach(function(d) {
  	d.source = graph.nodes[d.source];
  	d.target = graph.nodes[d.target];
  });
  
  link = link.data(graph.links).enter().append("line")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
        .style("stroke", function(d) { return colores_r[d.value-1] })
		.style("stroke-width", 2.5)

  var force = d3.layout.force()
  				.charge(-120)
		        .linkDistance(30)
		        .nodes(graph.nodes)
		        .links(graph.links)
		        .size([width, height])
		        .start();
		        

 function dragstarted(d) {
            d3.event.sourceEvent.stopPropagation();
            if (!d.selected && !shiftKey) {
                // if this node isn't selected, then we have to unselect every other node
                node.classed("selected", function(p) { return p.selected =  p.previouslySelected = false; });
            }

            d3.select(this).classed("selected", function(p) { d.previouslySelected = d.selected; return d.selected = true; });

            node.filter(function(d) { return d.selected; })
            .each(function(d) { d.fixed |= 2; })
        }

        function dragged(d) {
            node.filter(function(d) { return d.selected; })
            .each(function(d) { 
                d.x += d3.event.dx;
                d.y += d3.event.dy;

                d.px += d3.event.dx;
                d.py += d3.event.dy;
            })

            force.resume();
        }
    		
        node = node.data(graph.nodes).enter().append("circle")
        .attr("r", 7)
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .style("fill", function(d) { return colores_g[d.group-1] })
        .on("dblclick", function(d) { d3.event.stopPropagation(); })
        .on("click", function(d) {
            if (d3.event.defaultPrevented) return;

            if (!shiftKey) {
                //if the shift key isn't down, unselect everything
                node.classed("selected", function(p) { return p.selected =  p.previouslySelected = false; })
            }

            // always select this node
            d3.select(this).classed("selected", d.selected = !d.previouslySelected);
        })
        .on("mouseup", function(d) {
            //if (d.selected && shiftKey) d3.select(this).classed("selected", d.selected = false);
        })
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .call(d3.behavior.drag()
              .on("dragstart", dragstarted)
              .on("drag", dragged)
              .on("dragend", dragended));

	  tag = tag.data(graph.nodes).enter().append("text")
      .attr("dx", 10)
      .attr("dy", ".35em")
      .text(function(d) { return d.name })
      .style("font-size", "8.5px")
      
      legend = legend.data(graph.region)
      	.enter().append("circle")
  		.attr("class", "legend")
  		.attr("r", 8)
  		.style("fill", function(d) { return colores_g[d.group-1] })
  		.style("opacity", "0.75")
  		.attr("transform", function (d, i) { return "translate(8," + (i * 30 + 30) + ")";})
  		
  	  legendTag = legendTag.data(graph.region)
  	  	.enter().append("text")
  	  	.attr("x", 20)
  		.attr("transform", function (d, i) { return "translate(0," + i * 30 + ")";})
  		.attr("dy", "2.22em")
  		.style("fill", function(d) { return colores_g[d.group-1] })
  		.style("opacity", "0.75")
  		.text(function(d) { return d.name; });  
  		
      linkDescript = linkDescript.data(graph.relation)
      	.enter().append("rect")
  		.attr("class", "linkDescript")
  		.attr("width", 110)
  		.attr("height", 5)
  		.style("fill", function(d) { return colores_r[d.value-1] })
  		.style("opacity", "0.75")
  		.attr("transform", function (d, i) { return "translate(870," + (i * 30 + 10 ) + ")";})
  		
  	  linkTag = linkTag.data(graph.relation)
  	  	.enter().append("text")
  	  	.attr("x", 75)
  	  	.attr("dy", "1em")
  		.attr("transform", function (d, i) { return "translate(850," + (i * 30 + 15) + ")";})
  		.style("fill", function(d) { return colores_r[d.value-1] })
  		.style("text-anchor", "middle")
  		.style("opacity", "0.75")
  		.text(function(d) { return d.name; });  
  		  		
      function tick() {
                  link.attr("x1", function(d) { return d.source.x; })
                  .attr("y1", function(d) { return d.source.y; })
                  .attr("x2", function(d) { return d.target.x; })
                  .attr("y2", function(d) { return d.target.y; });

                  node.attr('cx', function(d) { return d.x; })
                  .attr('cy', function(d) { return d.y; });
                  
                  tag.attr('x', function(d) { return d.x; })
                  .attr('y', function(d) { return d.y; });

              };

              force.on("tick", tick);

    });
    
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
        function keydown() {
        shiftKey = d3.event.shiftKey || d3.event.metaKey;
        ctrlKey = d3.event.ctrlKey;

        console.log('d3.event', d3.event)

        if (d3.event.keyCode == 67) {   //the 'c' key
            center_view();
       		}

        if (shiftKey) {
            svg_graph.call(zoomer)
            .on("mousedown.zoom", null)
            .on("touchstart.zoom", null)                                                                      
            .on("touchmove.zoom", null)                                                                       
            .on("touchend.zoom", null);                                                                       

            //svg_graph.on('zoom', null);                                                                     
            vis.selectAll('g.gnode')
            .on('mousedown.drag', null);
            

            brush.select('.background').style('cursor', 'crosshair')
            brush.call(brusher);
        	}
    	}

   		function keyup() {
        shiftKey = d3.event.shiftKey || d3.event.metaKey;
        ctrlKey = d3.event.ctrlKey;

        brush.call(brusher)
        .on("mousedown.brush", null)
        .on("touchstart.brush", null)                                                                      
        .on("touchmove.brush", null)                                                                       
        .on("touchend.brush", null);                                                                       

        brush.select('.background').style('cursor', 'auto')
        svg_graph.call(zoomer);
    	}
}
// 
// var colores_g = ["#ff9900", "#990099", "#008080", "#66aa00", "#D4AF37", "#800000", "#000080", 
				// "#808000", "#808080", "#800080", "#FF00FF", "#dc3912", "#000000", "#C0C0C0", 
				// "#66CCFF", "#3366cc", "#FFDF00" ]
// 
// var colores_r = ["#008000", "#FF0000", "#0000FF", "#FF3399", "#999999"];
// 
// var force = d3.layout.force()
    // .gravity(0.05)		// 노드 간의 중력
    // .distance(100)	// 노드 간의 기본 거리
    // .charge(-100)		// 서로 밀치고 당기는 힘
    // .size([width, height])
// 
// d3.json("data/champion.json", function(error, graph) {
  // force
      // .nodes(graph.nodes)
      // .links(graph.links)
      // .start()
// 	
  // var link = svg.selectAll(".link")
      // .data(graph.links)
			// .enter().append("line")
      // .attr("class", "link")
			// .style("stroke-width", 2.5)
			// .style("stroke", function(d) { return colores_r[d.value-1] })
// 	
  // var node = svg.selectAll(".node")
      // .data(graph.nodes)
    	// .enter().append("g")
      // .attr("class", "node")
			// .on("mouseover", mouseover)
			// .on("mouseout", mouseout)
      // .call(force.drag)
//   
	// node.append("circle")
    	// .attr("r", 8)
			// .style("fill", function(d) { return colores_g[d.group-1] })
// 			
  // node.append("text")
      // .attr("dx", 12)
      // .attr("dy", ".35em")
      // .text(function(d) { return d.name })
// 	
  // force.on("tick", function() {
    // link.attr("x1", function(d) { return d.source.x })
        // .attr("y1", function(d) { return d.source.y })
        // .attr("x2", function(d) { return d.target.x })
        // .attr("y2", function(d) { return d.target.y })
    // node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")" })
  // })
// 	
	// function mouseover() {
		// d3.select(this).select("circle").transition()
				// .duration(500)
				// .attr("r", 16)
	// }
// 	
	// function mouseout() {
		// d3.select(this).select("circle").transition()
				// .duration(500)
				// .attr("r", 8)
	// }
// })