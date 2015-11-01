d3.csv("data/bar_chart_Assign1.csv", function(error, data) {
	// Load the size of svg area from css
	var svgElement = document.getElementById("myGraph")
	var svgWidth = window.getComputedStyle(svgElement, null).getPropertyValue("width")
	var svgHeight = window.getComputedStyle(svgElement, null).getPropertyValue("height")
	svgWidth = parseFloat(svgWidth)
	svgHeight = parseFloat(svgHeight)

	// Load data from csv file
	var dataLabels = []
	var dataValues = []
	for (var i = 0; i < data.length; i++) {
		dataLabels.push(data[i].country)
		dataValues.push(data[i].value)
	}
	var maxValue = Math.max.apply(Math, dataValues)

	// Graph configuration
	var offsetX = 50
	var offsetY = 120
	var barWidth = (svgWidth - 2 * offsetX) / data.length * 0.8
	var barGap = (svgWidth - 2 * offsetX) / data.length * 0.2

	// Add graph elements
	var barElements = d3.select("#myGraph")
		.append("g")
		.attr("transform", "translate(" + offsetX + ", " + -offsetY + ")")
		.selectAll("rect")
		.data(dataValues)

	// Draw bars
	barElements.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("width", barWidth)
		.attr("height", 0)
		.attr("x", function(d, i) {
			return i * (barWidth + barGap)
		})
		.attr("y", svgHeight)
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
		.transition()
		.delay(function(d, i) {
			return i * 100
		})
		.duration(1000)
		.attr("y", function(d, i) {
			d = d * 10
			return svgHeight - d
		})
		.attr("height", function(d, i) {
			d = d * 10
			return d
		})

	// Add text labels
	barElements.enter()
		.append("text")
		.attr("class", "barNum")
		.attr("x", function(d, i) {
			return i * (barWidth + barGap) + (barWidth / 2)
		})
		.attr("y", function(d, i) {
			d = d * 10
			return svgHeight - d - 5
		})
		.text(function(d, i) {
			return d
		})

	// Draw y-axis
	var upperbound = maxValue * 10
	var yScale = d3.scale.linear()
		.domain([0, upperbound / 10])
		.range([upperbound, 0])
	d3.select("#myGraph").append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + offsetX + ", " + ((svgHeight - upperbound) - offsetY) + ")")
		.call(
			d3.svg.axis()
			.scale(yScale)
			.orient("left")
		)

	// Draw x-axis
	d3.select("#myGraph")
		.append("rect")
		.attr("class", "axis_x")
		.attr("width", svgWidth - 2 * offsetX)
		.attr("height", 1)
		.attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")
	barElements.enter()
		.append("text")
		.attr("class", "country")
		.attr("transform", function(d, i) {
			return "translate(" + (i * (barWidth + barGap) + barWidth / 2 + 3) + ", " + (svgHeight + 5) + ") rotate(-90)"
		})
		.text(function(d, i) {
			return dataLabels[i]
		})
})
