// financing 1
// payment&infrastructure 2
// investment&wealth management 3
// online banking 4
// big data finance 5

var width = 1200,
    height = 800

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)

var color = d3.scale.category10()

var force = d3.layout.force()
    .gravity(.05)		// 노드 간의 중력
    .distance(150)	// 노드 간의 기본 거리
    .charge(-300)		// 서로 밀치고 당기는 힘
    .size([width, height])



//try
//Set up tooltip
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
    return  "| Company : " + d.name + "<br>" + "| Site : " + d.site + "<br>" + "| Info : " + d.summary +"";
})
svg.call(tip);




d3.json("data/chinafin.json", function(error, graph) {

  if (error) throw error;

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
//			.on("mouseover", mouseover)
//			.on("mouseout", mouseout)
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide)
      .call(force.drag)
      .on('dblclick', connectedNodes)




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
            //Reduce the op
            toggle = 1;
        } else {
            //Put them back to opacity=1
            node.style("opacity", 1);
            link.style("opacity", 1);
            toggle = 0;
        }
    }



  
	node.append("circle")
    	.attr("r", function(d) {
        if (d.type === "chinafin") {
          return 20 ;
        } else if (d.type === "category") {
          return 15 ;
        } else {
          return 8 ;
        }


      })
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