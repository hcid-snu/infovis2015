
// 기본 setup 준비 5페이지
var width = 1100,
    height = 800

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)

var color = d3.scale.category10()


// force layout 준비 6페이지
var force = d3.layout.force()
    .gravity(.05)		// 노드 간의 중력
    .distance(150)	// 노드 간의 기본 거리
    .charge(-80)		// 서로 밀치고 당기는 힘
    .size([width, height])

// json 파일 로딩 8페이지
d3.json("data/mydata.json", function(error, graph) {
	
  if (error) throw error;
	
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start() //nodes와 links의 상관관계를 내부적으로 계산해라는 명령
	
  var link = svg.selectAll(".link") //line 데이터이기 때문에 line으로 그림
      .data(graph.links)
			.enter().append("line") //enter하면 실제 화면에 나타나도록 준비
      .attr("class", "link")
	  .style("stroke-width", function(d) { return Math.sqrt(d.value) })
// .style("stroke-width", 10)으로 하면 모든 배경이 10으로 잡힘
  //sqrt를 씌워서 전체 사이즈 크기를 줄이기로 함

	
  var node = svg.selectAll(".node")
      .data(graph.nodes)
    	.enter().append("g") // g 대신에 circle을 쓸 수 있지만, 텍스트를 집어넣어야 하기 때문에 텍스트와 circle을 하단에 다시 따로 추가하는 방식을 사용하기로 함
      .attr("class", "node")
  
  
    .attr("r", 5)
    .style("fill", function (d) {return color(d.group);})
			.on("mouseover", mouseover) //이게 마우스 온 오버 실행시켜라
			.on('dblclick', connectedNodes) //Added code 
			.on("mouseout", mouseout) // call 들어가기 전에 입력시켜야 함
      .call(force.drag) // 이 단계까지 새로고침해도 데이터 안 나타남
  
  // 실제로 노드를 assign 해줘야 함
	node.append("circle")
    	.attr("r", 8)
		.style("fill", function(d) { return color(d.group) })
  // color를 동일하게 하고 싶으면 CSS에서 지정하거나 color 뒤에 지정하면 됨
	  
  	node.append("text")
      .attr("dx", 12)
  .attr("dy", ".35em") // em: 미세한 조정 단위(px보다 더 미세한 조정)
      .text(function(d) { return d.name }) // 노트 옆에 이름 붙이기
	
	// 적용시키면 force가 적용이 안 되서 모든 텍스트가 0으로 몰린 상태로 나옴
  force.on("tick", function() { // force->tick이 발생하면 아래의 기능하라
    link.attr("x1", function(d) { return d.source.x })
        .attr("y1", function(d) { return d.source.y })
        .attr("x2", function(d) { return d.target.x })
        .attr("y2", function(d) { return d.target.y })
    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")" })
  })
  //node.append(circle)을 했어야 했는데 텍스트를 넣고 싶어서 append("g")로 묶어두게 되면서, g의 좌표를 입력해줘야 함 circle은 cx, cy로 한 방에 적어두면 바로 해결 됨. g는 기본적으로 좌표가 있는게 아니라, 어느 좌표에서 다른 좌표로 translate해줘야 한다. 그래서 cx, cy라는 값 입력이 아니라 위에 적힌 것처럼 node g(64번째 줄)는 transform해줘서 translate해줘야 함. 어떤 애들은 바로 cx와 cy를 바로 쓰는 경우가 있음. 
  
  //이걸 새로고침하면 연결망이 나타나는데, 스타일링이 안되어 있고, 글자도 안 이쁘고, 줄도 안 그려져 있음
	
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

  //선택된 애들말고는 다 흐리게 만들거나, 1차 노드만 선택되어 보여진다던지 하면 보기가 편함
  //d3에서 자유도가 떨어지기 때문에, 비슷한 포맷으로 만들 것
  // 데이터가 많지 않아도 됨. 주위 친구들 또는 페이스북 최근 1주일간 라이크 누른, 답글을 쓴 사람들이라던지. 개인데이터 가지고 구조화시켜서 소셜네트워크 그래프를 만들어 보도록 하겠음
	
	
	// 아래는 마우스 인터랙션
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
	
	// 아래는 마우스 인터랙션
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
})