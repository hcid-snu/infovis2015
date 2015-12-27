var margin = {top: 40, right: 10, bottom: 10, left: 10},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom

var color = d3.scale.category20()
var treemap = d3.layout.treemap()
	.size([width, height])
	.sticky(true)
	.value(function(d) { return d.size })

var div = d3.select("body").append("div")
	// div의 size를 지정하면 자동으로 왼쪽으로 붙는다
	// codeacademy의 html css 강좌
	// 'position'을 absolute로 하면 절대적인 위치에 div가 존재하게 됨
	.style("position", "relative")
	// 우리가 준비한 캔버스에 treemap이 꽉차게 하기 위해서 size를 설정해줘야 함
	.style("width", (width + margin.left + margin.right) + "px") 
	.style("height", (height + margin.top + margin.bottom) + 'px')
	.style("left", margin.left + "px")
	.style("top", margin.top + "px")

	d3.json("data/tree.json", function(error, root) {
		if (error) throw error;
		// datum과  data와이 차이가 무엇인가
		var node = div.datum(root).selectAll(".node")
		.data(treemap.nodes)
		.enter().append("div")
		.attr("class", "node")
		// 각 노드의 위치를 정해주는 부분
		.call(position)
		.style("background", function(d) {return d.children ? color(d.name) : null })
		.text(function(d) { return d.children ? null : d.name + " (" + d.size + ")" })

	 d3.selectAll("input").on("change", function change() {
   		 var value = this.value == "count" 
   		 	// count가 되면 1이 되어서 모든 사각형의 넓이(크기?)가 동일해짐
   		 	? function() { return 1 }
   		 	: function(d) { return d.size }

	    node
	        .data(treemap.value(value).nodes)
	      	.transition()
	        .duration(1500)
	        .call(position)
  })

})

function position() {
	this.style("left", function(d) { return d.x + "px" })
		.style("top", function(d) { return d.y + "px" })
		.style("width", function(d) { return Math.max(0,d.dx - 1) + "px" })
		.style("height", function(d) {return Math.max(0, d.dy - 1) + "px" })
		// line-heigth는 css 명령어. 이 한 줄이 없으면 text가 위에 달라 붙어 있음
		// 중앙 정렬하고 싶기 때문에 height와 동일한 크기로 line-height를 할당해 준다.
		.style("line-height", function(d) { return Math.max(0, d.dy - 1) + "px" })
}