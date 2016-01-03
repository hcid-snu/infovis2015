var width = 800,
    height = 500

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)

// var color = d3.scale.category20() + d3.scale.category20b() + d3.scale.category20c();

var force = d3.layout.force()
    .gravity(.05)		// 노드 간의 중력
    .distance(150)	// 노드 간의 기본 거리
    .charge(-100)		// 서로 밀치고 당기는 힘
    .size([width, height])

d3.json("mydata.json", function(error, graph) {
// d3.tsv("email-Enron_.tsv", function(error,data) {

  raw_nodes = graph.nodes;
  var raw_links2 = [];
  graph.links.forEach(function(d) {
      raw_links2.push({source: +d.from_no, target: +d.to_no, value: +d.value});
  });

  // var graph = {nodes: raw_nodes, links: raw_links2};

  // d3.tsv("email-Enron_nodes.tsv", function(error,data2) {
  //   data2.forEach(function(d) {
  //     graph.nodes.push({name: d.name}); //몇번째인지를 가지고 아래 링크 반영
  //   });
  // });

  // data.forEach(function(d) {
  //   graph.links.push({source: +d.from_no, target: +d.to_no, value: +d.value});
  // });

  force
      .nodes(raw_nodes)
      .links(raw_links2)
      .start()

  var link = svg.selectAll(".link")
      .data(raw_links2)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value)/100 })

  var node = svg.selectAll(".node")
      .data(raw_nodes)
      .enter().append("g")
      .attr("class", "node")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .call(force.drag)

  node.append("circle")
      .attr("r", 8)
      .style("fill", "salmon");
      // .style("fill", function(d) { return "hsl(" + Math.random()*360 + ",80%,50%)" });
      // .style("fill", function(d) { return color(d.group) })

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