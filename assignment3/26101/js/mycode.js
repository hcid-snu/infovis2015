d3.csv("/data/bar_chart_Assign1.csv" function(error,data))
	var dataSet = []
	var dataLabel=[]
	for(var i = 0; i < data.length; i++) {
		dataSet.push(data[i].country)
		dataLabel.push(data[i].value)
	}
	var barElements = d3.select("#myGraph")
			.selectAll("rect")
			.data(dataSet)
	barElements.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function(d, i) {return i * (barWidth + barGap) })
		.attr("y", svgHeight)
		.transition()
		.delay(function(d,i) {return i * 500})
		.duration(2500)
		.attr("height", function(d,i) {return d})
	barElements.attr("width", 0)
		.transition()
		.delay(function(d,i) {return i * 500})
		.duration(2500)
		.attr("height", function(d,i) {return d})		

	
	var svgEle = document.getElementById("myGraph")
	var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
	var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
	svgWidth = parseFloat(svgWidth)
	svgHeight = parseFloat(svgHeight)
	
	var barWidth = 10
	var bargap = 5
	svgWidth = i(w+g)
	
	var barElements
	
	var offsetX = 30
	var offsetY = 20 
	
	barElements.enter()
		.append("rect")
			.attr("class", "bar")
			.attr("height", 0)
			.attr("x", function(d,i) {return i*(barWidth + barGap) })
			.attr("y", svgHeight)
			.transition()
			.delay(function(d,i) {return i*500})
			.duration(3000)
			.attr("y", function(d,i) {return svgHeight - d})
			.attr("height", function(d,i) {return d})
	barElements.enter()
			.append("text")
			.attr("class", "barNum")
			.attr("x", function(d,i) {return i * (barWidth + barGap) + barWidth/2})
			.attr("y", function(d,i) {return svgHeight - d - 5})
			.text(function(d,i) {return d})
	
	barNum {
		font: 9pt "Helvetica Neue", Arial, Helvetica, Geneva, sans-serif;
		text-anchor: middle;
		}
		
			
	var yScale = d3.scale.linear()
			.domain([0,35000])
			.range([35000,0])
			
	d3.select("#myGraph").append("g")
			.attr("class", "axis")
			.attr("transform", "translate(" + offsetX + ", " + ((svgHeight - 300) - offsetY) + ")" )
			.call(
					d3.svg.axis()
					.scale(yScale)
					.orient("left")
			)
			
	d3.select("#myGraph")
			.append("rect")
			.attr("class", "axis_x")
			.attr("width", 320)
			.attr("height", 1)
			.attr("transform", "translate(" + offsetX + ", " + (svgHeight-offsetY) + ")" )
			
	barElements.enter()
			.append("text")
			.attr("class", "barName")
			.attr("x", function(d,i) {return i * (barWidth + barGap) + barWidth/2 })
			.attr("y", svgHeight + offsetY - 5)
			.text(function(d,i) {return dataLabel[i] })

			 	