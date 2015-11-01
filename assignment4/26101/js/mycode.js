d3.csv("data/acc_total.csv", function(error, data) {
	var dataSet=[];
	var labelName = [];
	for(var i = 0; i < data.length; i++) {
		dataSet.push(data[i].death);
		labelName.push(data[i].year);
	}
	var svgEle = document.getElementById("myGraph");
	var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
	var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
	svgWidth = parseFloat(svgWidth);
	svgHeight = parseFloat(svgHeight);
	svgEle.style.width = dataSet.length * (barWidth + barMargin) + offsetX;

	var offsetX = 30;
	var offsetY = 20;
	var barElements;
	var dataMax = 600;
	var barWidth = 20;
	var barMargin = 20;

	barElements = d3.select("#myGraph")
		.selectAll("rect")
		.data(dataSet)
	barElements.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("height", 0)
		.attr("width", barWidth)
		.attr("x", function(d,i) {return i * (barWidth+barMargin) + offsetX;
		})
		.attr("y", svgHeight - offsetY)
		.transition()
		.duration(2000)
		.delay(function(d,i) {
			return i * 200;
		})
		.attr("y", function(d,i){
			return svgHeight - d/3 - offsetY;
		})
		.attr("height", function(d,i) {
			return d/3 ;
		})
	var yScale = d3.scale.linear()
		.domain([0, dataMax])
		.range([dataMax, 0])
	d3.select("#myGraph")
	  .append("g")
	  .attr("class", "axis")
	  .attr("transform", "translate(" + offsetX + ", "+((svgHeight-300)-offsetY)+")")
	  .call(
	  d3.svg.axis()
	  	.scale(yScale)
	  	.orient("left")
	  )
	d3.select("#myGraph")
	  .append("rect")
	  .attr("class", "axis_x")
	  .attr("width", svgWidth)
	  .attr("height", 1)
	  .attr("transform", "translate(" +offsetX+", "+(svgHeight-offsetY)+")")
	barElements.enter()
		.append("text")
		.attr("class", "barName")
		.attr("x", function(d,i){
			return i * (barWidth+barMargin) + 10 +offsetX;
		})
		.attr("y", svgHeight-offsetY+15)
		.text(function(d,i){
			return labelName[i];
		})

})

