
d3.csv("data/mydata2014.csv", function(error,data){

var svgEle = document.getElementById("myGraph")
var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
svgWidth = parseFloat(svgWidth)
svgHeight = parseFloat(svgHeight)

var dataSet = []
var dataLabel = []
for (var i = 0; i < data.length; i++){
	dataSet.push(data[i].item1)
	dataLabel.push(data[i].name)
}

var color = d3.scale.category10()
var pie = d3.layout.pie().sort(null)
var arc = d3.svg.arc().innerRadius(50).outerRadius(100)

	var pieElements = d3.select("#myGraph")
		.selectAll("g")
		.data(pie(dataSet))
		.enter()
		.append("g")
		.attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")") // g 의 중심을 원의 가운데로 이동

	pieElements
		.append("path")
		.style("fill", function(d, i) { return color(i) })
		.transition()
		.attr("class", "pie")
		.duration(1000)
		.delay(function(d, i) { return i * 1000 })
		.ease("linear")
		.attrTween("d", function(d, i) {
			var interpolate = d3.interpolate(
				// 각 부분의 시작 각도
				{ startAngle: d.startAngle, endAngle: d.startAngle },
				// 각 부분의 종료 각도
				{ startAngle: d.startAngle, endAngle: d.endAngle }
			)
			return function(t) { return arc(interpolate(t) )}
		})

	// 파이 데이터의 총 합을 표시
	var textElements = d3.select("#myGraph")
		.append("text")
		.attr("class", "total")
		.attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")")
		.text("Total: " + d3.sum(dataSet))

	// 파이 데이터 개별 값을 표시
	pieElements
	  .append("text")	// 데이터 수만큼 text 요소가 추가됨
	  .attr("class", "pieNum")	// CSS 클래스 설정
	  .attr("transform", function(d, i){
			return "translate(" + arc.centroid(d) + ")"    // 부채꼴의 중심으로 함(무게 중심 계산)
		})
	  .text(function(d, i){
			return dataLabel[i] // + "\n" + d.value  // 레이블 표
		})


})