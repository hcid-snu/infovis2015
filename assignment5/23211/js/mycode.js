drawNetwork(1)

d3.select("#episode").on("change", function() { 
  d3.select("#network").selectAll("*").remove()  
  drawNetwork(this.value, this.value)
})

var activePerson = undefined;
function drawNetwork(episodeNum){
  var width = 1200,
    height = 800

var svg = d3.select('#network')
    .attr("width", width)
    .attr("height", height)

var color = d3.scale.category10().domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

var force = d3.layout.force()
    .gravity(.05)   // 노드 간의 중력
    .distance(150)  // 노드 간의 기본 거리
    .charge(-300)   // 서로 밀치고 당기는 힘
    .size([width-100, height-100])
    

d3.json('data/json/jdj'+episodeNum+'.json', function(error, graph) {
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start()
  
  var nodeArray = graph.nodes;
  var linkArray = graph.links;
  var SHOW_THRESHOLD = 2.5;

  var link = svg.selectAll(".link")
      .data(graph.links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return 2*(d.value) })

  
  var node = svg.selectAll(".node")
      .data(graph.nodes)
      .enter().append("g") // circle로 append하면 text를 추가할 수 없다
      .attr("class", "node")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .call(force.drag) // drag가 가능하게 만드는 것
  
  node.append("circle")
      .attr("r", 10)
      .style("fill", function(d) { return color(d.group) })
    
  node.append("text")
      .attr("dx", 15)
      .attr("dy", ".35em")
      .style('font-size', 15)
      .text(function(d) { return d.name })
  
  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x })
        .attr("y1", function(d) { return d.source.y })
        .attr("x2", function(d) { return d.target.x })
        .attr("y2", function(d) { return d.target.y })
    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")" })

  var dataLabel = []
  dataLabel.push('온건 신진사대부')
  dataLabel.push('급진 신진사대부 & 이성계 세력')
  dataLabel.push('이인임 세력')
  dataLabel.push('이방원 세력')
  dataLabel.push('정도전의 가족')
  dataLabel.push('권문세족 & 왕실 세력')
  dataLabel.push('원 & 명나라 세력')
  dataLabel.push('왜구 세력')
  dataLabel.push('정도전이 나주에서 만난 사람들')


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

function highlightGraphNode( node, on )
    {
      //if( d3.event.shiftKey ) on = false; // for debugging

      // If we are to activate a movie, and there's already one active,
      // first switch that one off
      if( on && activePerson !== undefined ) {
  highlightGraphNode( nodeArray[activePerson], false );
      }

      // locate the SVG nodes: circle & label group
      circle = d3.select( '#c' + node.group );
      label  = d3.select( '#l' + node.index );

      // activate/deactivate the node itself
      circle
  .classed( 'main', on );
      label
  .classed( 'on', on || currentZoom >= SHOW_THRESHOLD );
      label.selectAll('text')
  .classed( 'main', on );

      // activate all siblings
    Object(node.links).forEach( function(id) {
  d3.select("#c"+id).classed( 'sibling', on );
  label = d3.select('#l'+id);
  label.classed( 'on', on || currentZoom >= SHOW_THRESHOLD );
  label.selectAll('text.nlabel')
    .classed( 'sibling', on );
      } );

      // set the value for the current active movie
      activePerson = on ? node.index : undefined;
    }