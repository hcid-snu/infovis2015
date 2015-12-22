d3.csv("data/oecd_welfare.csv", function(error, data){
	
	var svgEle = document.getElementById("myGraph")
	var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
	var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
	svgWidth = parseFloat(svgWidth)
	svgHeight = parseFloat(svgHeight)

	var barWidth = 25.43
	var barGap = 10
	
	var barElements

	var offsetX = 50
	var offsetY = 30

	var dataSet = [] 
	var dataLabel = []
	for(var i = 0; i < data.length; i++) {
		dataSet.push(data[i].value)
		dataLabel.push(data[i].country)
	}
	
	//바 그리기
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
		.attr("x", function(d, i) { 
			return i * (barWidth + barGap)})
		.attr("y", svgHeight)

		//마우스 오버 & 아웃
		.on("mouseover", function() { 
			d3.select(this)
				.style("fill", "orange")
		})
		.on("mouseout", function() { 
			d3.select(this)
				.transition()
				.duration(100)
				.style("fill", "#ccc")
		})

		//움직임
		.transition()
		.duration(300)
		.attr("y", function(d, i) { return svgHeight - d*4})
		.attr("height", function(d, i) { return d*4})
	
	barElements.enter()
		.append("text")
		.attr("class", "barNum")
		.attr("x", function(d, i) { return i * (barWidth + barGap)+ barWidth/2 })
		.attr("y", function(d, i) { return svgHeight - d*4 - 5})
		.text(function(d, i) { return d + "%" })
	

	//axis
	var yScale = d3.scale.linear()
		.domain([0, 100])  
		.range([300, 0])  

	d3.select("#myGraph")
	.append("g")
		.attr("class", "axis")
		.attr("transform", "translate("+ offsetX + ", " + ((svgHeight - 300) - offsetY) + ")")
		.call(
			d3.svg.axis()
			.scale(yScale)
			.orient("left")
			.ticks(6)
		)

  
	d3.select("#myGraph")
		.append("rect")
		.attr("class", "axis_x")
		.attr("width", 1000)
		.attr("height", 1)
		.attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY ) + ")")


	barElements.enter()
		.append("text")
		.attr("class", "barName")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2})
		.attr("y", svgHeight + offsetY -10)
		.text(function(d, i) { return dataLabel[i]})

//average
	d3.select("#myGraph")
		.append("rect")
		.attr("class", "ave")
		.attr("width", 1000)
		.attr("height", 2)
		.attr("transform", "translate(" + offsetX + ", " + (svgHeight - 21.6*4- offsetY) + ")")
		.attr("fill", "red")
		.style("opacity", .4)
		
	barElements.enter()
		.append("text")
		.attr("class", "ave_text")
		.attr("x", offsetX + 1000)
		.attr("y", svgHeight - 21.6 *4 )
		.text("OECD Average : 21.6%")

	
})