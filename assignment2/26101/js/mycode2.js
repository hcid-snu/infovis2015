d3.csv("/data/bar_chart_Assign1.csv" function(error,data){
	var dataSet = [];
	var dataLabel = [];
	for(var i=0 ; i < data.length; i++) {
		dataSet.push(data[i].country);
		dataLabel.push(data[i].value);
	}
	var svgEle=document.getElementById("myGraph");
	var svgWidth=window.getComputedstyle(svgEle, null).getPropertyValue("width");
	var svgHeight = window.getComputedstyle(svgEle,null).getPropertyValue("height");
	svgWidth = parseFloat(svgWidth);
	svgHeight = parseFloat(svgHeight);

	var offsetX = 30;
	var offsetY = 20;
	var barElements;
	var dataMax = 300;
	var barWidth = 20;
	var barMargin = 5;

	barElements = d3.select("#myGraph")
	.selectAll("rect")
	.data(dataSet)
	barElements.enter()
	.append("rect")
	.attr("class", "bar")
	.attr("height", 0)
	.attr("width", barWidth)
	.attr("x", function(d,i) {
		return i * (barWidth + barMargin) + offsetX;
	})
	.attr("y", svgHeight-offsetY)
	.on("mouseover", function() {
		d3.select(this)
			.style("fill", "pink")
	})
	.on("mouseover", function() {
		d3.select(this)
			.style("fill", "gold")
	})
	.transition()
	.duration(1000)
	.delay(function(d,i){
		return i*500;
	})
	.attr("y", function(d,i) {
		return svgHeight-d-offsetY;
	})
	.attr("height", function(d,i){
		return d;
	})
	barElements.enter()
	.append("text")
	.attr("class", "barNum")
	.attr("x", function(d,i) {
		return i * (barWidth+barMargin)+10+offsetX;
	})
	.attr("y", svgHeight - 5 - offsetY)
	.text(function(d,i) {
		return d;
	})
	var yScale = d3.scale.linear()
	.domain([0,dataMax])
	.range([dataMax, 0])
	d3.select("#myGraph")
	.append("g")
	.attr("class", "axis")
	.attr("transform","translate("+offsetX+","+((svgHeight-300)-offsetY)+")")
	.call(
		d3.svg.axis()
		.scale(yScale)
		.orient("left")
	)
	d3.select("#myGraph")
	.append("rect")
	.attr("class","axis_x")
	.attr("width",svgWidth)
	.attr("height","1")
	.attr("transform", "translate("+offsetX+", "+(svgHeight-offsetY)+")")
	barElements.enter()
	.append("text")
	.attr("class","barName")
	.attr("x", function(d,i) {
		return i*25 + 10 + offsetX;
	})
	.attr("y",svgHeight-offsetY+15)
	.text(function(d,i){
		return dataLabel[i];
	})
});
