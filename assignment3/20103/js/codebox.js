d3.csv("data/mydata.csv", function(error, data){
	
	// svg 요소의 크기를 구한다
	var svgEle = document.getElementById("gdpGraph")
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
	var dataSet = []  // empty array to store data (gdp*ratio)
	var dataSetgdp = [] // gdp data
	var dataLabel = []  // empty array to store label
	for(var i = 0; i < data.length; i++) {
		dataSet.push(data[i].value /100 *data[i].gdp /10000)
		dataSetgdp.push(data[i].gdp)  //gdp data
		dataLabel.push(data[i].country)
	}



	//d3.tip VARIABLES
	var tip = d3.tip()
	    .attr("class", "d3-tip")
	    .offset([-15, 0])
	    .html(function (d,i) { return " " + dataLabel[i]+ " GDP : " + d3.round(dataSetgdp[i]/10000 , 0) ;
  })


	// ADD BAR ELEMENTS for dataSet
	barElements = d3.select("#gdpGraph")
	    .append("g")
	    .attr("transform", "translate(" + offsetX + ", " + -offsetY + ")")
		.call(tip)
		.selectAll("rect")
		.data(dataSetgdp)


	// gdp 데이터 추가
	barElements.enter()
	  .append("rect")
		.attr("class", "bargdp")
		.attr("height", 0) // 애니메이션 시작시 바의 크기
		.attr("width", barWidth)
		.attr("x", function(d, i) { return i * (barWidth + barGap) })
		.attr("y", svgHeight)
  		.on('mouseover', tip.show)
  		.on('mouseout', tip.hide)
		.transition()
		.delay(function(d, i) { return i * 500 })
		.duration(3000)
		.attr("y", function(d, i) { return svgHeight - d/10000/5.2 })
		.attr("height", function(d, i) { return d/10000/5.2 })




	// gdp*ratio 요소 추가
	barElements = d3.select("#gdpGraph")
		.append("g")
		.attr("transform", "translate(" + offsetX + ", " + -offsetY + ")")
		.selectAll("rect")
		.data(dataSet)
	// gdp*ratio 데이터 추가
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
		.attr("y", function(d, i) { return svgHeight - d/5.2 })
		.attr("height", function(d, i) { return d/5.2 })
	// gdp*ratio 텍스트 요소 추가
	barElements.enter()
		.append("text")
		.attr("class", "barNum")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		.attr("y", function(d, i) { return svgHeight - d/5.2 - 5 })
		.text(function(d, i) { return d3.round(d , 0); })






	// y축을 표시하기 위한 스케일 설정
	var yScale = d3.scale.linear()  // 직선의 스케일 사용
		.domain([0, 5000])  // 현재 데이터가 300 미만임
		.range([svgHeight-80-offsetX, 0])  // 그래프가 아래에서 위로 그려지기 때문에 range를 역으로 써주어야 함.
	// y축을 표시
	d3.select("#gdpGraph").append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + offsetX + ", " + ((svgHeight - 970) - offsetY) + ")")
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
	d3.select("#gdpGraph").append("g")
	      .attr("class", "axis")
	      .attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")
	      .call(xAxis)
	     .selectAll("text")
	      .style("text-anchor", "end")
	      .attr("dx", "-.8em")
	      .attr("dy", "-.55em")
	      .attr("transform", "rotate(-90)" );






		
})
