showTitle("GangNam");
drawPie("data/pie_casualties_GangNam.csv");
drawLine("data/line_casualties_GangNam.csv")

d3.select("#borough").on("change", function () { 
	d3.select("#myGraph").selectAll("*").remove();
	
	showTitle(this.value);
	drawPie("data/pie_casualties_" + this.value + ".csv");
	drawLine("data/line_casualties_" + this.value + ".csv")
})

function showTitle(title) {
	// Load the size of svg area from css
	var svgElement = document.getElementById("myGraph");
	var svgWidth = window.getComputedStyle(svgElement, null).getPropertyValue("width");
	svgWidth = parseFloat(svgWidth);
	
	d3.select("#myGraph")
		.append("text")
		.attr("class", "titleBorough")
		.attr("x", svgWidth / 2)
		.attr("y", 30)
		.text(title + "-gu");
}

function drawPie(filename) {
	d3.csv(filename, function (error, data) {
		// Load the size of svg area from css
		var svgElement = document.getElementById("myGraph");
		var svgWidth = window.getComputedStyle(svgElement, null).getPropertyValue("width");
		var svgHeight = window.getComputedStyle(svgElement, null).getPropertyValue("height");
		svgWidth = parseFloat(svgWidth);
		svgHeight = parseFloat(svgHeight);
		
		// Center coordinate of pie chart
		var centerX = svgWidth / 4;
		var centerY = svgHeight / 2;
		
		// Load data from csv file
		var dataLabels = []
		var dataValues = []
		for (var i = 0; i < data.length; i++) {
			var num = parseInt(data[i].dead) + parseInt(data[i].injured);
			if (num > 0) {
				dataLabels.push(data[i].age);
				dataValues.push(num);
			}
		}
		
		// Set layout as Pie
		var pie = d3.layout.pie().sort(null);
		
		// Set pie size
		var arc = d3.svg.arc()
			.innerRadius(100)
			.outerRadius(200)
		
		var pieElements = d3.select("#myGraph")
			.append("g")
			.attr("class", "pieChart")
			.selectAll("g")
			.data(pie(dataValues))
			.enter()
			.append("g")
			.attr("transform", "translate(" + centerX + ", " + centerY + ")");
			
		// Pre-defined colorset
		var color = d3.scale.category10();
		
		// Plot data
		pieElements.append("path")
			.attr("class", "pie")
			// Do animation
			.transition()
			.duration(300)
			.delay(function (d, i) {
				return i * 300;
			})
			.attrTween("d", function (d, i) {
				var interpolate = d3.interpolate({
					startAngle: d.startAngle,
					endAngle: d.startAngle
				}, {
					startAngle: d.startAngle,
					endAngle: d.endAngle
				})
				return function (t) {
					return arc(interpolate(t));
				}
			})
			// Coloring
			.style("fill", function (d, i) {
				return color(i)
			})
			
		// Show title of pie chart
		d3.select("#myGraph")
			.select(".pieChart")
			.append("text")
			.attr("class", "titleChart")
			.attr("x", centerX)
			.attr("y", svgHeight - 20)
			.text("# of casualties by age in 2014");
		
		// Delay time to show texts
		var delayTime = (data.length - 1) * 300
		
		// Show each value
		pieElements.append("text")
			.attr("class", "pieNum")
			.attr("transform", function (d, i) {
				return "translate(" + arc.centroid(d) + ")";
			})
			.style("opacity", 0)
			.transition()
			.delay(delayTime)
			.duration(3000)
			.style("opacity", 100)
			.text(function (d, i) {
				return dataLabels[i];
			})
			
		// Show total
		var textElements = d3.select("#myGraph")
			.select(".pieChart")
			.append("text")
			.attr("class", "total")
			.attr("transform", "translate(" + centerX + ", " + centerY + ")")
			.style("opacity", 0)
			.transition()
			.delay(delayTime)
			.duration(3000)
			.style("opacity", 100)
			.text("Total: " + d3.sum(dataValues));
	})
}

function drawLine(filename) {
	// Load the size of svg area from css
	var svgElement = document.getElementById("myGraph");
	var svgWidth = window.getComputedStyle(svgElement, null).getPropertyValue("width");
	var svgHeight = window.getComputedStyle(svgElement, null).getPropertyValue("height");
	svgWidth = parseFloat(svgWidth);
	svgHeight = parseFloat(svgHeight);
	
	// Set size of line graph
	var margin = { top: 80, right: 80, bottom: 80, left: 80 }
	var width = svgWidth / 2 - margin.left - margin.right;
	var height = svgHeight - margin.top - margin.bottom;
	
	// Set x and y axis
	var x = d3.scale.linear().range([0, width])
	var y = d3.scale.linear().range([height, 0])
	var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.format("d"));
	var yAxis = d3.svg.axis().scale(y).orient("left")
	
	// Line graph elements
	var lineElements = d3.select("#myGraph")
		.append("g")
		.attr("class", "lineGraph")
		.attr("width", svgWidth / 2)
		.attr("height", svgHeight)
		.append("g")
		.attr("transform", "translate(" + (svgWidth / 2 + margin.left) + ", " + margin.top + ")");
	
	d3.csv(filename, function (error, data) {
		// Load data from csv file
		var dataLabels = []		// Labels (year)
		var nDead = []			// # of dead people per year
		var nInjured = []		// # of injured people per year
		var nTotal = []			// Total number of casualties
		for (var i = 0; i < data.length; i++) {
			dataLabels.push(data[i].year);
			nDead.push(data[i].dead);
			nInjured.push(data[i].injured);
			nTotal.push(parseInt(data[i].dead) + parseInt(data[i].injured));
		}
		
		x.domain(d3.extent(data, function (d, i) {
			return d.year;
		}))
		y.domain(d3.extent(data, function (d, i) {
			return nTotal[i];
		}))
		
		// Add axes
		lineElements.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0, " + height + ")")
			.call(xAxis);
		lineElements.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("(# of casualties)")
		
		// Plot lines
		var line = d3.svg.line()
			.x(function (d, i) {
				return x(dataLabels[i]);
			})
			.y(function (d, i) {
				return y(nTotal[i]);
			})
		
		lineElements.append("path")
			.datum(nTotal)
			.attr("class", "line")
			.attr("d", line)
	})
	
	// Show title of pie chart
	d3.select("#myGraph")
		.select(".lineGraph")
		.append("text")
		.attr("class", "titleChart")
		.attr("x", svgWidth * 3 / 4)
		.attr("y", svgHeight - 20)
		.text("Annual changes of the past 10 years");
}
