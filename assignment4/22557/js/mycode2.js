


d3.csv("data/mydata2014.csv", function(error, data){

	// svg 요소의 크기를 구한다
	var svgEle = document.getElementById("myGraph")
	var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
	var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
	svgWidth = parseFloat(svgWidth) // remove px
	svgHeight = parseFloat(svgHeight) // remove px
	var cwidth = 100;

	// 데이터 로딩
	var dataSet = {
                apples: [53245, 28479, 19697, 24037, 40245],
                oranges: [53, 28, 19, 24],
                lemons: [53245, 28479, 19697, 24037, 40245],
                pears: [53245, 28479, 19697, 24037, 40245],
                pineapples: [53245, 28479, 19697, 24037, 40245],
            };
  // empty array to store data
	var dataLabel = []  // empty array to store label
/*	for(var i = 0; i < data.length; i++) {
		dataSet.push(data[i].item1)
		dataLabel.push(data[i].carrier)
	} */

	console.log(dataSet)

	var color = d3.scale.category10()

	// pie chart layout 설정
	var pie = d3.layout.pie().sort(null)

	// pie chart 크기 설정
	var arc = d3.svg.arc()//.innerRadius(100).outerRadius(140)

	// pie chart 그리기 준비
	var pieElements = d3.select("#myGraph")
		.selectAll("g")
		.data(pie(dataSet))
		.enter()
		.append("g")
		.attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")") // g 의 중심을 원의 가운데로 이동
	
	// 데이터 추가
	pieElements
		.append("path")
		.attr("class", "pie")
		.style("fill", function(d, i) { return color(i) })
		.transition()
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
        .attr("d", function (d, i, j) { return arc.innerRadius(10 + cwidth * j).outerRadius(cwidth * (j + 1))(d); });
	
	// 파이 데이터 개별 값을 표시
	pieElements
	  .append("text")	// 데이터 수만큼 text 요소가 추가됨
	  .attr("class", "pieNum")	// CSS 클래스 설정
	  .attr("transform", function(d, i){
			return "translate(" + arc.centroid(d) + ")"    // 부채꼴의 중심으로 함(무게 중심 계산)
		})
	  .text(function(d, i){
			return d.value	// 값 표시
		})
})

