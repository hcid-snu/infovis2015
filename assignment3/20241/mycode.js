d3.csv("mydata.csv", function(error, data){
	

	var svgEle = document.getElementById("myGraph")
	var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
	var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
	svgWidth = parseFloat(svgWidth) 
	svgHeight = parseFloat(svgHeight) 


	var barWidth = 20
	var barGap = 5
	

	var barElements
	

	var offsetX = 30
	var offsetY = 20


	var dataSet = []  
	var dataLabel = []  
	for(var i = 0; i < data.length; i++) {
		dataSet.push(data[i].Value)
		dataLabel.push(data[i].COUNTRY)
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
				.style("fill", "#9e211e")
		})
		.on("mouseout", function() { 
			d3.select(this)
				.transition()
				.duration(500)
				.style("fill", "#bababa")
		})
		.transition()
		.delay(function(d, i) { return i * 500 })
		.duration(1000)
		.attr("y", function(d, i) { return svgHeight - d * 3 })
		.attr("height", function(d, i) { return d * 3 })
	


	barElements.enter()
		.append("text")
		.attr("class", "barNum")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		.attr("y", function(d, i) { return svgHeight - d * 3- 5 })
		.text(function(d, i) { return d })
	
	

	var yScale = d3.scale.linear() 
		.domain([0, 46]) 
		.range([150, 0])  


	d3.select("#myGraph").append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + offsetX + ", " + ((svgHeight - 150 ) - offsetY) + ")")
		.call(
			d3.svg.axis()
			.scale(yScale)
		    .ticks(4)
			.orient("left")
		)
	

	d3.select("#myGraph")
		.append("rect")
		.attr("class", "axis_x")
		.attr("width", 2110)
		.attr("height", 1)
		.attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")
		

	barElements.enter()
		.append("text")
		.attr("class", "barName")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		.attr("y", svgHeight + offsetY - 5)
		.text(function(d, i) { return dataLabel[i] })
		


})











