//Lab 6-1: 여러 데이터의 로딩

//drawPie 함수 호출
drawPie("data/mydata2014.csv")

d3.select("#year").on("change", function() { 
	d3.select("#myGraph").selectAll("*").remove()   //화면지
	drawPie("data/mydata" + this.value + ".csv", this.value)
})

// 코드를 drawPie함수로 생성
function drawPie(filename) {
	
	d3.csv(filename, function(error, data){
	
		// svg 요소의 크기를 구한다
		var svgEle = document.getElementById("myGraph")
		var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
		var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
		svgWidth = parseFloat(svgWidth) // remove px
		svgHeight = parseFloat(svgHeight) // remove px
	
		// 데이터 로딩
		var dataSet = []  // empty array to store data
		var dataLabel = []  // empty array to store label
		for(var i = 0; i < data.length; i++) {
			dataSet.push(data[i].share)
			dataLabel.push(data[i].carrier)
		}
	
		console.log(dataSet)
	
		//var color = d3.scale.category20c()
		var color = ["#A40000","#B80000","#CC0000","#EB0000","#FF0B0B","#FF2A2A","#FF4A4A","#FF6969","#FF8888","#FFA7A7","#FFC6C6"]

	
		// pie chart layout 설정
		var pie = d3.layout.pie().sort(null)
	
		// pie chart 크기 설정
		var arc = d3.svg.arc().innerRadius(50).outerRadius(200)
	
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
			.style("fill", function(d, i) { return color[i] })
			.transition()
			.duration(500)
			.delay(function(d, i) { return i * 500 })
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
				return dataLabel[i]//+"("+d.value+")"	// 값 표시
			})
	})
	
}
