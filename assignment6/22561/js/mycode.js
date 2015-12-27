drawHeatMap("data/18560669.history");
document.getElementById("fileinput").addEventListener("change", handleFileSelect, false);

function handleFileSelect(event) {
	var files = event.target.files;
	d3.select("#chart").selectAll("*").remove();
	drawHeatMap("data/" + files[0].name);
}

var margin = { top: 75, right: 50, bottom: 130, left: 80 },
	width = 700 - margin.left - margin.right,
	gridWidth = Math.floor(width / 12),
	legendElementWidth = gridWidth,	
	nLegendElements = 9,
	colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"];

function drawHeatMap(tsvFile) {
	d3.tsv(tsvFile, function(d) {
		return {
			year: +d.year,
			month: +d.month,
			count: +d.count
		}
	}, function(error, data) {
		// Show labels
		var years = [];
		for (var i = 0; i < data.length; i++) {
			if (years.indexOf(data[i].year) < 0)
				years.push(data[i].year);
		}
		years.sort();
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		// Adjust height depending on data domain
		var height = gridWidth * years.length;
		
		var svg = d3.select("#chart")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
		
		d3.select("#chart")
			.select("svg")
			.append("text")
			.attr("class", "graphinfo title")
			.attr("transform", "translate(" + ((width + margin.left + margin.right) / 2) + ", " + 30 + ")")
			.style("opacity", 0)
			.transition()
			.duration(5000)
			.style("opacity", 100)
			.style("text-anchor", "middle")
			.style("dominant-baseline", "middle")
			.text("User #" + tsvFile.replace(/^.*[\\\/]/, '').slice(0, -8));
		
		var yearLabels = svg.selectAll(".yearLabel")
			.data(years)
			.enter()
			.append("text")
			.text(function(d) { return d; })
			.attr("x", 0)
			.attr("y", function(d, i) { return i * gridWidth; })
			.style("text-anchor", "end")
			.style("dominant-baseline", "middle")
			.attr("transform", "translate(-10, " + gridWidth / 2 + ")")
			.attr("class", "yearLabel mono");
		
		var monthLabels = svg.selectAll(".monthLabel")
			.data(months)
			.enter()
			.append("text")
			.text(function(d) { return d; })
			.attr("x", function(d, i) { return i * gridWidth; })
			.attr("y", 0)
			.style("text-anchor", "middle")
			.style("dominant-baseline", "middle")
			.attr("transform", "translate(" + gridWidth / 2 + ", -10)")
			.attr("class", "monthLabel mono");
		
		var colorScale = d3.scale.quantile()
			.domain([0, nLegendElements - 1, d3.max(data, function(d) { return d.count; })])
			.range(colors);
		
		var cards = svg.selectAll(".count")
			.data(data, function(d) { return years.indexOf(d.year) + ": " + d.month; });
		cards.enter().append("rect")
			.attr("x", function(d) { return (d.month - 1) * gridWidth; })
			.attr("y", function(d) { return years.indexOf(d.year) * gridWidth; })
			.attr("rx", 4)
			.attr("ry", 4)
			.attr("class", "count bordered")
			.attr("width", gridWidth)
			.attr("height", gridWidth)
			.style("fill", colors[0]);
		cards.transition()
			.duration(1000)
			.style("fill", function(d) { return colorScale(d.count); })
		cards.exit().remove();
		
		var legend = svg.selectAll(".legend")
			.data([0].concat(colorScale.quantiles()), function(d) { return d; });
		legend.enter().append("g")
			.attr("class", "legend");
		var posY = height + gridWidth;
		legend.append("rect")
			.attr("x", function(d, i) { return legendElementWidth * i; })
			.attr("y", posY)
			.attr("width", legendElementWidth)
			.attr("height", gridWidth / 2)
			.style("fill", function(d, i) { return colors[i]; });
		legend.append("text")
			.attr("class", "mono")
			.text(function(d) { return "≥ " + Math.round(d); })
			.attr("x", function(d, i) { return legendElementWidth * i; })
			.attr("y", posY + gridWidth);
		legend.exit().remove();
	})
}
