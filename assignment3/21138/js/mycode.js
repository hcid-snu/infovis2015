d3.csv("data/bar_chart_Assign1.csv", function(error, data){
	
	// svg 요소의 크기를 구한다
	var svgEle = document.getElementById("myGraph")
	var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
	var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
	svgWidth = parseFloat(svgWidth) // remove px
	svgHeight = parseFloat(svgHeight) // remove px

	// 바 그래프의 폭과 그래프 간의 간격을 설정
	var barWidth = 40
	var barGap = 21
	
	// 바 그래프 요소
	var barElements
	
	// 그래프를 이동하기 위한 offset 변수 
	var offsetX = 30
	var offsetY = 20

	// 데이터 로딩
	var dataSet = []  // empty array to store data
	var dataLabel = []  // empty array to store label
	for(var i = 0; i < data.length; i++) {
		dataSet.push(data[i].value)
		dataLabel.push(data[i].country)
	}

	// 요소 추가
	barElements = d3.select("#myGraph")
		.append("g")
		.attr("transform", "translate(" + offsetX + ", " + -offsetY + ")")
		.selectAll("rect")
		.data(dataSet)
	
	// 데이터 추가
	barElements.enter()
	  .append("rect")
		.attr("class", "bar")
		.attr("height", 0) // 애니메이션 시작시 바의 크기
		.attr("width", barWidth)
		.attr("x", function(d, i) { return i * (barWidth + barGap) })
		.attr("y", svgHeight)
		// 마우스 이벤트 처리
		.on("mouseover", function() { 
			d3.select(this)
				.style("fill", function(d, i){ if(d>30){return "red"}else{if(d==21.638){return "blue"}else{return "orange"}}})
		})
		.on("mouseout", function() { 
			d3.select(this)
				.transition()
				.duration(500)
				.style("fill", "#ccc")
		})

		.transition()
		.delay(function(d, i) { return i * 5 })
		.duration(2500)
		.attr("y", function(d, i) { return svgHeight - 10*d })
		.attr("height", function(d, i) { return 10*d })
	
	// 텍스트 요소 추가
	barElements.enter()
		.append("text")
		.attr("class", "barNum")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		.attr("y", function(d, i) { return svgHeight - 10*d - 10 })
		.text(function(d, i) { return d })
		
	
	
	// y축을 표시하기 위한 스케일 설정
	var yScale = d3.scale.linear()  // 직선의 스케일 사용
		.domain([0, 35])  // 현재 데이터가 300 미만임
		.range([350, 0])  // 그래프가 아래에서 위로 그려지기 때문에 range를 역으로 써주어야 함.

	// y축을 표시
	d3.select("#myGraph").append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + offsetX + ", " + ((svgHeight - 350) - offsetY) + ")")
		.call(
			d3.svg.axis()
			.scale(yScale)
			.orient("left")
		)
	
	// x축을 표시
	d3.select("#myGraph")
		.append("rect")
		.attr("class", "axis_x")
		.attr("width", 1800)
		.attr("height", 1)
		.attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")

	d3.select("#myGraph")
		.append("rect")
		.attr("class", "ave")
		.attr("width", 1800)
		.attr("height", 3)
		.attr("fill", "blue")
		.attr("transform", "translate(" + offsetX + ", " + (svgHeight - 216- offsetY) + ")")
		
	// x축 레이블 표시
	barElements.enter()
		.append("text")
		.attr("class", "barName")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		.attr("y", svgHeight + offsetY - 5)
		.text(function(d, i) { return dataLabel[i] })

	// ave 축 레이블 표시
	barElements.enter()
		.append("text")
		.attr("class", "barName")
		.attr("x", 15)
		.attr("y", svgHeight - 216 - 5 )
		.text("21.638")

 	d3.select("input").on("change", change);
	var sortTimeout = setTimeout(function() {
    d3.select("input").property("checked", true).each(change);
  	}, 2000);

})











