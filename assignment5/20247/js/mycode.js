var width = 1200,
    height = 1000

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)

var color = d3.scale.category10()

var force = d3.layout.force()
    .gravity(0.05)		// 노드 간의 중력
    .distance(230)	    // 노드 간의 기본 거리
    .charge(-200)		// 서로 밀치고 당기는 힘
    .size([width, height])


/**************************TEXT START**********************************/

svg.append("text")
	.attr("x", 10)
	.attr("y", 9)
	.attr("class","desc_text")
	.attr("dy", ".35em")
	.style("text-anchor", "start")
	.text("This network shows my Kakaotalk group chat relationship.");
svg.append("text")
	.attr("x", 10)
	.attr("y", 30)
	.attr("class","desc_text")
	.attr("dy", ".35em")
	.style("text-anchor", "start")
	.text("The strength of the link represents the number of Group Chatrooms.");
svg.append("text")
	.attr("x", 10)
	.attr("y", 51)
	.attr("class","desc_text")
	.attr("dy", ".35em")
	.style("text-anchor", "start")
	.text("You can double click on circles to highlight the neighboring nodes. (Double click again to return to the original network.)");
svg.append("text")
	.attr("x", 10)
	.attr("y", 72)
	.attr("class","desc_text")
	.attr("dy", ".35em")
	.style("text-anchor", "start")
	.text("(Please DO NOT bring this data outside the classroom Thank you.)")


/**************************TEXT END**********************************/


d3.json("data/katalkgroup2.json", function(error, graph) {
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start()
	
// LINK & NODES
  var link = svg.selectAll(".link")
      		.data(graph.links)
			.enter().append("line")
      		.attr("class", "link")
			.style("stroke-width", function(d) { return (d.value)})
	
  var node = svg.selectAll(".node")
      		.data(graph.nodes)
    		.enter().append("g")
        	.attr("class", "node")
			.on("mouseover", mouseover)
			.on("mouseout", mouseout)
			.call(force.drag)
			.on('dblclick', connectedNodes); 
			

  
	node.append("circle")
    	.attr("r", 9)
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

 

/**********************Highlighting START**************************/
  
  //Toggle stores whether the highlighting is on
  var toggle = 0;
  //Create an array logging what is connected to what
  var linkedByIndex = {};
  for (i = 0; i < graph.nodes.length; i++) {
      linkedByIndex[i + "," + i] = 1;
  };
  graph.links.forEach(function (d) {
      linkedByIndex[d.source.index + "," + d.target.index] = 1;
  });
  //This function looks up whether a pair are neighbours
  function neighboring(a, b) {
      return linkedByIndex[a.index + "," + b.index];
  }
  function connectedNodes() {
      if (toggle == 0) {
          //Reduce the opacity of all but the neighbouring nodes
          d = d3.select(this).node().__data__;
          node.style("opacity", function (o) {
              return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
          });

         link.style("opacity", function (o) {
              return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
          });
		  
          d3.select(this).select("circle")
		  	.transition()
          	.duration(400)
          	.style("fill", function(d) { return color(d.group) })
	      	.attr("stroke","#FFFFFF")
		  	.attr("stroke-width",3)
		  	.attr("r", 20);
          //Reduce the op
          toggle = 1;
      } else {
          //Put them back to opacity=1
	    d3.select(this).select("circle").transition()
	        .duration(750)
	        .attr("r", 9)
			.style("fill", function(d) { return color(d.group) })
		    .attr("stroke",function(d) { return color(d.group) } )
		  .attr("stroke-width",0)
          node.style("opacity", 1);
          link.style("opacity", 1);
          toggle = 0;
      }
  }  
  
/**********************Highlighting START**************************/ 
  
/**********************Legend START**************************/
  
 var legend = svg.selectAll(".legend")
     .data(color.domain())
   	 .enter().append("g")
     .attr("class", "legend")
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
     .text(function(d) {return d; });
  
/**********************Legend END**************************/	 
	 

/**********************Mouse Interaction END**************************/	
	function mouseover() {
		d3.select(this).select("circle").transition()
				.duration(300)
				.attr("r", 20)
	}
	
	function mouseout() {
		d3.select(this).select("circle").transition()
				.duration(500)
				.attr("r", 9)
	}
/**********************Mouse Interaction END**************************/	

})