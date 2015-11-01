d3.csv("data/mydata.csv", function(error, data){
	

	var barWidth = 25
	var barGap = 10
	
	var barElements
	
	var svgHeight = 400
	
	var offsetX = 30
	var offsetY = 20
	

	var dataSet = []  
	var dataLabel = []  
	var dataMax = 35;
	for(var i = 0; i < data.length; i++) {
		dataSet.push(data[i].value * 10)
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
		.attr("x", function(d, i) { 
			return i * (barWidth + barGap)})
		.attr("y", svgHeight - offsetY)
		.on("mouseover", function(){
			d3.select(this)
			  .style("fill", "red")
		})
		.on("mouseout", function(){
			d3.select(this)
			  .style("fill", "steelblue")
		})
		.transition()
		.duration(3000)
		.delay(function(d,i){
			return i * 100
		})
		.attr("y", function(d, i) { 
			return svgHeight - d })								
		.attr("height", function(d, i) { 
			return d; 
		})
	
	barElements.enter()
		.append("text")
		.attr("class", "barNum")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		.transition()
		.duration(4000)
		.delay(function(d, i){
			return i * 200;
		})
		.attr("y", function(d, i) { return svgHeight - d - 5 })
		.text(function(d, i) { return Math.round(d*10)/100})
			
	
	var yScale = d3.scale.linear()  
		.domain([0, dataMax])  
		.range([350, 0])  

	d3.select("#myGraph").append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + offsetX + ", " + ((svgHeight - 350) - offsetY) + ")")
		.call(
			d3.svg.axis()
			.scale(yScale)
			.orient("left")
		)
	
	
	d3.select("#myGraph")
		.append("rect")
		.attr("class", "axis_x")
		.attr("width", 1050)
		.attr("height", 1)
		.attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")
		
	
	barElements.enter()
		.append("text")
		.attr("class", "barName")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2})
		.attr("y", svgHeight + offsetY - 5)
		.text(function(d, i) { 
			return dataLabel[i] })
		
})
