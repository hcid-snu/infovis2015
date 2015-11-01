d3.csv("data/mydata.csv", function(error, data){

	var svgEle = document.getElementById("myGraph")
	var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
	var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
	svgWidth = parseFloat(svgWidth) 
	svgHeight = parseFloat(svgHeight) 
	
	var barWidth = 15
	var barGap = 30
	//var barGap = 24

	var barElements
	var barElements2

	var svgHeight = 500

	var offsetX = 50
	var offsetY = -15

	// LOAD DATA - dataSet, dataSet2, & dataLabel
	var dataSet = []  // 1980 social expenditure 
	var dataSet2 = [] // 2014 social expenditure 
	var dataLabel = []  // country names 
	for(var i = 0; i < data.length; i++) {
		dataSet.push(data[i].item1) 
		dataSet2.push(data[i].item2) 
		dataLabel.push(data[i].country)
	}

	// d3.tip VARIABLES
	var tip = d3.tip()
	    .attr("class", "d3-tip")
	    .offset([-25, 0])
	    .html(function (d, i) {
	  	return "<strong>1980</strong>" + " " + dataLabel[i] + " : " + d3.round(d,2) + "%"; })

    // d3.tip VARIABLES
	var tip2 = d3.tip()
	    .attr("class", "d3-tip")
	    .offset([-25, 0])
	    .html(function (d, i) {
	  	return "<strong>2014</strong>" + " " + dataLabel[i] + " : " + d3.round(d,2) + "%"; })

	// ADD BAR ELEMENTS for dataSet
	barElements = d3.select("#myGraph")
	    .append("g")
	    .attr("transform", "translate(" + offsetX + ", " + -offsetY + ")")
		.call(tip)
		.selectAll("rect")
		.data(dataSet)

	// ADD BAR ELEMENTS for dataSet2
	barElements2 = d3.select("#myGraph")
		.append("g")
		.attr("transform", "translate(" + offsetX + ", " + -offsetY + ")")
		.call(tip2)
		.selectAll("rect")
		.data(dataSet2)

	// ADD DATA (dataSet)
	barElements.enter()
	    .append("rect")
		.attr("class", "bar")
		.attr("x", function(d, i) { return i * (barWidth + barGap) })
		.attr("y", function(d, i) { return svgHeight - d*14.3 })
		.attr("width", barWidth)
		.attr("height", function(d, i) { return d*14.3})
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide)
	
	// ADD DATA (dataSet2) 
	barElements2.enter()
		.append("rect")
		.attr("class", "bar2")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + 15.5; })
		.attr("y", function(d, i) { return svgHeight - d*14.3 })
		.attr("width", barWidth)
		.attr("height", function(d, i) { return d*14.3})
		.on("mouseover", tip2.show)
		.on("mouseout", tip2.hide)

	// y-axis SCALE
	var yScale = d3.scale.linear()  
		.domain([0, 35])  
		.range([svgHeight, 0]) 

	// y-axis FORMAT
	d3.select("#myGraph")
	  .append("g")
	  .attr("class", "axis")
	  .attr("transform", "translate(" + (offsetX-4) + ", " + ((svgHeight-500)-offsetY) + ")")
	  .call(
			d3.svg.axis()
			.scale(yScale)
			.orient("left")
			.ticks(10)
			.tickFormat(function(d) {return d + "%"; })
		)

	// y-axis LABEL
	d3.select("#myGraph")
	  .append("text")
	  .attr("class", "axis")
	  .call(yScale)
	  	.text("Social Expenditure")
	  	.attr("transform", "rotate(-90)")
	  	.attr("x", -16)
	  	.attr("y", 53)
	  	.attr("dy", ".5em")
	  	.style("text-anchor", "end")
	  	.style("font", "13px 'Helvetica Neue'");

   // x-axis SCALE
   var xScale = d3.scale.ordinal()
      .domain(["Australia","Austria","Belgium","Canada","Czech Republic","Denmark","Estonia","Finland","France","Germany","Greece","Hungary","Iceland" ,"Ireland" ,"Italy","Korea" ,"Luxembourg" ,"Netherlands" ,"Norway" ,"Poland" ,"Portugal" ,"Slovak Republic" ,"Slovenia", "Spain" ,"Sweden","Switzerland","United Kingdom","United States","OECD - Total"])
      .rangeRoundBands([-1, (svgWidth-95.6)], 0);

   // x-axis FORMAT
   var xAxis = d3.svg.axis()
         .scale(xScale)
         .orient("bottom")
         .ticks(29)
         .tickSize(6,6,0)
         .tickPadding(8)

   d3.select("#myGraph").append("g")
         .attr("class", "axis")
         .attr("transform", "translate(" + (offsetX-5) + ", " + (svgHeight - offsetY) + ")")
         .call(xAxis)
        .selectAll("text")
         .style("text-anchor", "ends")
         .attr("dx", "-2.6em")
         .attr("dy", "-.1em")
         .attr("transform", "rotate(-20)" );
	
})