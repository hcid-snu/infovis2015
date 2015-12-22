d3.csv("data/oecd_welfare.csv", function(error, data){

	var svgEle = document.getElementById("myGraph");
	var svgWidth=window.getComputedStyle(svgEle, null).getPropertyValue("width");
	var svgHegiht=window.getComputedStyle(svgEle, null).getPropertyValue("hegiht");

	svgHegiht = parseFloat(svgHeight);
	svgWidth = parseFloat(svgWdith);

	var offsetX = 30;
	var offsetY = 20;

	var barElements;

	var dataSet = [];
	var dataLabel = [];
	for(var i = 0; i < data.length; i++) {
		dataSet.push(data[i].value)
		dataLabel.push(data[i].country)
	}


barElements = d3.select("#myGraph")
	.selectAll("rect")
	.data(dataSet)
	.enter()
	.append("rect")
	.attr("class", "bar")
	.attr("height", 300) 
	.attr("width", 500) 
	.attr("x", function(d, i) {  
		return i * (barWidth + barMargin) }) 
	.attr("y", svgHeight) 