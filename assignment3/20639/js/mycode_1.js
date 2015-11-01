d3.csv("data/bar_chart_Assign1.csv", function(error, data){
	
	
	var svgEle = document.getElementById("myGraph")
	var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
	var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
	svgWidth = parseFloat(svgWidth) // remove px
	svgHeight = parseFloat(svgHeight) // remove px

    
	data.sort(function(a,b){ return b.value-a.value;});
	
	
	var barWidth = 30
	var barGap = 45

	
	
	var barElements
	
	
	var offsetX = 30
	var offsetY = 20


	var dataSet = []  
	var dataLabel = []  
	for(var i = 0; i < data.length; i++) {
		dataSet.push(data[i].value)
		dataLabel.push(data[i].country)
	}

  
	

	barElements = d3.select("#myGraph")
		.append("g")
		.attr("transform", "translate(" + offsetX + ", " + -offsetY + ")")
		.selectAll("rect")
		.data(dataSet)
	
	barElements.enter()
	  .append("rect")
		.attr("class", "bar")
		.attr("height", 0) 
		.attr("width", barWidth)
		.attr("x", function(d, i) { return i * (barWidth + barGap) })
		.attr("y", svgHeight)
		
		.on("mouseover", function() { 
			d3.select(this)
				.style("fill", "red")

		})
		.on("mouseout", function() { 
			d3.select(this)
				.transition()
				.duration(500)
				.style("fill", "#ccc")
		})
		.transition()
		.delay(function(d, i) { return i * 500 })
		.duration(500)
		.attr("y", function(d, i) { return svgHeight - d*10  })
		.attr("height", function(d, i) { return d*10 })
	
	// 텍스트 요소 추가
	barElements.enter()
		.append("text")
		.attr("class", "barNum")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		.attr("y", function(d, i) { return svgHeight - d *10 -5})
		.text(function(d, i) { return d })

	// y축 scale
	var yScale = d3.scale.linear()  // 직선의 스케일 사용
		.domain([0, 40])  // 현재 데이터가 40% 미만임
		.range([400, 0])  

	// y축 표시
	d3.select("#myGraph").append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + offsetX + ", " + ((svgHeight - 400) - offsetY) + ")")
		.text("value")
		.call(
			d3.svg.axis()
			.scale(yScale)
			.orient("left")

		)
	
	// x축 표시
	d3.select("#myGraph")
		.append("rect")
		.attr("class", "axis_x")
		.attr("width", 2100)
		.attr("height", 1)
		.attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")
		
	// x축 label
	barElements.enter()
		.append("text")
		.attr("class", "barName")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		.attr("y", svgHeight + offsetY - 5)
		.text(function(d, i) { return dataLabel[i] })
	
	


		
})











