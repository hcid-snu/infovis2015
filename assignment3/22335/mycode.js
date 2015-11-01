d3.csv("mydata.csv", function(error, data) {

	var dataSet = [];
	var dataLabel = [];
	for(var i = 0; i < data.length; i++) {
	dataSet.push(data[i].value);
	dataLabel.push(data[i].country);
	}
	
	var svgEle = document.getElementById("myGraph");
	var svgWidth = window.getComputedStyle(svgEle, null).
		getPropertyValue("width");
	var svgHeight = window.getComputedStyle(svgEle, null).
		getPropertyValue("height");
	svgWidth = parseFloat(svgWidth);
	svgHeight = parseFloat(svgHeight);
	
	var offsetX = 30;
	var offsetY = 5;

	var dataMax = 150;
	var barWidth = 30;
	var barGap = 9;

	var barElements;

	barElements = d3.select("#myGraph")
			.selectAll("rect")
			.data(dataSet)

	barElements.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("width", barWidth)
			.attr("x", function(d, i) {
				return i * (barWidth + barGap) + offsetX + 10;
				})
			.attr("y", svgHeight - offsetY - 10)
			.attr("height", 0)
			.on("mouseover", function(){
				d3.select(this)
				.style("fill", "#BD2B70")
				})
			.on("mouseout", function() {
				d3.select(this)
				.style("fill", "gray")
				})
			.transition()
			.duration(3000)
			.delay(function(d, i) {
				return i * 150;
				})
			.attr("y", function(d, i) {
				return svgHeight - d - offsetY - 10;
				})
			.attr("height", function(d, i) {
				return d;
				})

	barElements.enter()
		.append("text")
		.attr("class", "barNum")
		.attr("x", function(d, i) {
				return i * (barWidth + barGap) + offsetX + 25;
				})
		.attr("y", svgHeight - 50)
		.text(function(d, i) {
				return d;
				})
	
	var yScale = d3.scale.linear()
				.domain([0, dataMax])
				.range([dataMax, 0])

	d3.select("#myGraph").append("g")
			.attr("class", "axis")
			.attr("transform", "translate(" + offsetX +" , " + ((svgHeight - 150) - offsetY) + ")")
			.call(
				d3.svg.axis()
				.scale(yScale)
				.orient("left")
				.ticks(10)
				.tickValues([10, 20, 30, 40, 60, 80, 100, 120, 140])
			)

	d3.select("#myGraph")
		.append("rect")
		.attr("class", "axis-x")
		.attr("width", svgWidth)
		.attr("height", 1)
		.attr("transform", "translate(" + offsetX +" , " + (svgHeight - offsetY - 10) + ")")

	barElements.enter()
		.append("text")
		.attr("class", "barName")
		.attr("x", function(d, i) {
		return i * (barWidth + barGap) + offsetX + 25;
		})
		.attr("y", svgHeight - offsetY + 3)
		.text(function(d, i) {
		return ["AUS", "AUT", "BEL", "CAN", "CZE", "DEN", "FIN", "FRA", "GER", "GRE", "HUN", "ICE", "IRL", "ITA", "KOR", "LUX", "NED", "NOR", "POL", "POR", "SVK", "ESP", "SWE", "SUI", "GBR", "USA", "EST", "SLO", "TOTAL"][i];
		})

		
		})