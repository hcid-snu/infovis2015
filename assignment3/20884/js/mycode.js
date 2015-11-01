
d3.csv("data/hw3.csv", function(error, data){
	
	// svg 요소의 크기를 구한다
	var svgEle = document.getElementById("myGraph")
	var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
	var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
	svgWidth = parseFloat(svgWidth) // remove px
	svgHeight = parseFloat(svgHeight) // remove px

	// 바 그래프의 폭과 그래프 간의 간격을 설정
	var barWidth = 30
	var barGap = 5
	
	// 바 그래프 요소
	var barElements
	
	// 그래프를 이동하기 위한 offset 변수 
	var offsetX = 30
	var offsetY = 40

	// 데이터 로딩
	var dataSet = []  // empty array to store data
	var dataSet2 = []
	var dataLabel = []  // empty array to store label
	var dataLabel2 = []
	for(var i = 0; i < data.length; i++) {
		dataSet.push(data[i].val2)
		dataSet2.push(data[i].val1)
		dataLabel.push(data[i].c_short)
		dataLabel2.push(data[i].c_long)
	}

	var tip = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([-20, 0])
	  .html(function(d,i) {
	    return "<strong>Country:</strong> <span style='color:red'>" + dataLabel2[i] + "</span><br><strong>2013:</strong> <span style='color:red'>"+dataSet2[i]+"</span><br><strong>2014:</strong> <span style='color:red'>"+dataSet[i]+"</span>";
	  });

	d3.select("#myGraph").call(tip);

	// 요소 추가
	barElements = d3.select("#myGraph")
		.append("g")
		.attr("transform", "translate(" + offsetX + ", " + -offsetY + ")")
		.selectAll("rect")
		.data(dataSet);

	// 데이터 추가
	barElements.enter()
	  .append("rect")
		.attr("class", "bar")
		.attr("height", 0) // 애니메이션 시작시 바의 크기
		.attr("width", barWidth)
		.attr("x", function(d, i) { return i * (barWidth + barGap) })
		.attr("y", svgHeight)
		// 마우스 이벤트 처리
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide) 
		.transition()
		.delay(function(d, i) { return i*50 })
		.duration(100)
		.attr("y", function(d, i) { return svgHeight - d*5 })
		.attr("height", function(d, i) { return d*5 });

	// 텍스트 요소 추가
	barElements.enter()
		.append("text")
		.attr("class", "barNum")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		.attr("y", function(d, i) { return svgHeight - d*5 - 5 })
		.text(function(d, i) { return d })

	// y축을 표시하기 위한 스케일 설정
	var yScale = d3.scale.linear()  // 직선의 스케일 사용
		.domain([0, 60])  // 현재 데이터가 300 미만임
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
	
	// x축을 표시
	d3.select("#myGraph")
		.append("rect")
		.attr("class", "axis_x")
		.attr("width", svgWidth)
		.attr("height", 1)
		.attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")
	
        barElements.enter()
          .append("rect")
                .attr("class", "bottombar")
                .attr("height", 0) // 애니메이션 시작시 바의 크기
                .attr("width", barWidth)
                .attr("x", function(d, i) { return i * (barWidth + barGap) })
                .attr("y", svgHeight)
                .transition()
                .delay(function(d, i) { return i*50 })
                .duration(100)
                .attr("y", function(d, i) { 
			if (d>dataSet2[i]) {
				return svgHeight - (d-dataSet2[i])*5 
			} else {
				return svgHeight
			}})
                .attr("height", function(d, i) { 
			if (d>dataSet2[i]) {
				return (d-dataSet2[i])*5
			} else {
				return (dataSet2[i]-d)*5
			}});


	// x축 레이블 표시
	barElements.enter()
		.append("text")
		.attr("class", "barName")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		.attr("y", svgHeight + offsetY - 5)
		.text(function(d, i) { return dataLabel[i] })

		
})











