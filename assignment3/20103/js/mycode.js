d3.csv("data/mydata.csv", function(error, data){
	
	// svg 요소의 크기를 구한다
	var svgEle = document.getElementById("myGraph")
	var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
	var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
	svgWidth = parseFloat(svgWidth) // remove px
	svgHeight = parseFloat(svgHeight) // remove px

	// 바 그래프의 폭과 그래프 간의 간격을 설정
	var barWidth = 25.43
	var barGap = 5
	
	// 바 그래프 요소
	var barElements
	
	// 그래프를 이동하기 위한 offset 변수 
	var offsetX = 50
	var offsetY = 110

	// 데이터 로딩
	var dataSet = []  // empty array to store data
	// var dataSetgdp = [] // gdp data
	var dataLabel = []  // empty array to store label
	for(var i = 0; i < data.length; i++) {
		dataSet.push(data[i].value)
	//	dataSetgdp.push(data[i].gdp)  //gdp data
		dataLabel.push(data[i].country)
	}





	// bar100 요소 추가
	barElements = d3.select("#myGraph")
		.append("g")
		.attr("transform", "translate(" + offsetX + ", " + -offsetY + ")")
		.selectAll("rect")
		.data(dataSet)
	
	// bar100 데이터 추가
	barElements.enter()
	  .append("rect")
		.attr("class", "bar100")
		.attr("height", 0) // 애니메이션 시작시 바의 크기
		.attr("width", barWidth)
		.attr("x", function(d, i) { return i * (barWidth + barGap) })
		.attr("y", svgHeight)
		// 마우스 이벤트 처리
		.on("mouseover", function() { 
			d3.select(this)
				.style("fill", "#FFDC9A")
		})
		.on("mouseout", function() { 
			d3.select(this)
				.transition()
				.duration(500)
				.style("fill", "#E0DADA")
		})
		.transition()
		.delay(function(d, i) { return i * 500 })
		.duration(3000)
		.attr("y", function(d, i) { return svgHeight - 100*3 })
		.attr("height", 100*3)





	// % 요소 추가
	barElements = d3.select("#myGraph")
		.append("g")
		.attr("transform", "translate(" + offsetX + ", " + -offsetY + ")")
		.selectAll("rect")
		.data(dataSet)
	
	// % 데이터 추가
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
				.style("fill", "orange")
		})
		.on("mouseout", function() { 
			d3.select(this)
				.transition()
				.duration(500)
				.style("fill", "#5E5E5E")
		})
		.transition()
		.delay(function(d, i) { return i * 500 })
		.duration(3000)
		.attr("y", function(d, i) { return svgHeight - d*3 })
		.attr("height", function(d, i) { return d*3 })

	// 텍스트 요소 추가
	barElements.enter()
		.append("text")
		.attr("class", "barNum")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		.attr("y", function(d, i) { return svgHeight - d*3 - 5 })
		.text(function(d, i) { return d3.round(d , 0)+"%"; })
	





	// y축을 표시하기 위한 스케일 설정
	var yScale = d3.scale.linear()  // 직선의 스케일 사용
		.domain([0, 100])  // 현재 데이터가 300 미만임
		.range([300, 0])  // 그래프가 아래에서 위로 그려지기 때문에 range를 역으로 써주어야 함.

	// y축을 표시
	d3.select("#myGraph").append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + offsetX + ", " + ((svgHeight - 300) - offsetY) + ")")
		.call(
			d3.svg.axis()
			.scale(yScale)
			.orient("left")
		)
	
	


	// x축을 표시하기 위한 스케일 설정
	var xScale = d3.scale.ordinal()
		.domain(["Australia", "Austria","Belgium", "Canada", "Czech Republic", "Denmark", "Finland" ,"France","Germany","Greece","Hungary","Iceland" ,"Ireland" ,"Italy","Korea" ,"Luxembourg" ,"Netherlands" ,"Norway" ,"Poland" ,"Portugal" ,"Slovak Republic" ,"Spain" ,"Sweden","Switzerland","United Kingdom","United States","Estonia","Slovenia","OECD - Total"])
		.rangeBands([0, 880]);

	// x축을 표시 
	var xAxis = d3.svg.axis()
			.scale(xScale)
			.orient("bottom")

	d3.select("#myGraph").append("g")
	      .attr("class", "axis")
	      .attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")
	      .call(xAxis)
	     .selectAll("text")
	      .style("text-anchor", "end")
	      .attr("dx", "-.8em")
	      .attr("dy", "-.55em")
	      .attr("transform", "rotate(-90)" );


	/*
	// x축을 표시
	d3.select("#myGraph")
		.append("rect")
		.attr("class", "axis_x")
		.attr("width", 960)
		.attr("height", 1)
		.attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")
		
	// x축 레이블 표시
	barElements.enter()
		.append("text")
		.attr("class", "barName")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		.attr("y", svgHeight + offsetY - 5)
		.text(function(d, i) { return dataLabel[i] })
	*/
		

	





		
})











