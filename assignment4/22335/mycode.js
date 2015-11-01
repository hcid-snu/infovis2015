drawPie("mydata2009.csv")

d3.select("#year").on("change", function() {
	d3.select("#myGraph").selectAll("*").remove()
	drawPie("mydata" + this.value + ".csv", this.value)
	})

function drawPie(filename) {

	d3.csv(filename, function(error, data) {

	var svgEle = document.getElementById("myGraph")
	var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
	var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
	svgWidth = parseFloat(svgWidth)
	svgHeight = parseFloat(svgHeight)

	var dataSet = [];
	var dataLabel = [];
	for(var i = 0; i < data.length; i++) {
		dataSet.push(data[i].cases)
		dataLabel.push(data[i].region)
		}

	var pie = d3.layout.pie().sort(null)

	var arc = d3.svg.arc().innerRadius(75).outerRadius(200);

	var pieElements = d3.select("#myGraph")
		.selectAll("g")
		.data(pie(dataSet))
		.enter()
		.append("g")
		.attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")")

	pieElements
		.append("path")
		.attr("class", "pie")
		.style("fill", function(d, i) {
		return ["E69083", "DB4C64", "84755F"][i] })
		.transition()
		.duration(500)
		.delay(function(d, i) { return i * 500})
		.ease("linear-out")
		.attrTween("d", function(d, i) {
		var interpolate = d3.interpolate(
		{ startAngle : d.startAngle, endAngle: d.startAngle },
		{ startAngle : d.startAngle, endAngle: d.endAngle })
		return function(t) { return arc(interpolate(t) )}
		})

	var textElements = d3.select("#myGraph")
		.append("text")
		.attr("class", "total")
		.attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")")
		.text("TOTAL " + d3.sum(dataSet) + " Cases")

pieElements
	.append("text")
	.attr("class", "pieNum")
	.attr("transform", function(d, i) {
	return "translate(" + arc.centroid(d) + ")" })
	.text(function(d, i) {
	return dataLabel[i] + ": "+ d.value
	})
		



})
}