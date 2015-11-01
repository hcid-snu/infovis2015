d3.json("mydata.json", function(error, data) {
	
	var dataSet = [ ];
	
	var svgEle = document.getElementById("myGraph2");
	var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
	var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
		svgWidth = parseFloat(svgWidth) - 60;
		svgHeight = parseFloat(svgHeight) - 60;
	
	var offsetX = 30;
	var offsetY = 20;
	var scale = 2.0;
	
	var rangeYear = 6;
	var year = d3.extent(data, function(d) {
		return d.year;
		});
	var startYear = year[0];
	var currentYear = 2009;
	var margin = svgWidth / (rangeYear - 1);

	pickupData(data, currentYear - startYear);
	drawGraph(dataSet, "Seocho", "areaA", "linear");	
	drawGraph(dataSet, "Gangnam", "areaB", "linear");	
	drawGraph(dataSet, "Songpa", "areaC", "linear");	
	drawScale();
	
	function drawGraph(dataSet, itemName, cssClassName, type) {
	
	var line = d3.svg.line()	
	.x(function(d, i) {
		return offsetX + i * margin;	
		})
	.y(function(d, i) {
		return svgHeight - (d[itemName] * scale) - offsetY;
		})
	.interpolate(type)
		
	var lineElements = d3.select("#myGraph2")
	.append("path")	
	.attr("class", "line")	
	.attr("d", line(dataSet))
	}
	
	function drawScale() {
	
	var yScale = d3.scale.linear()  
	.domain([0, 160])   
	.range([scale*160, 0]) 
		
	d3.select("#myGraph2")	
	.append("g")	
	.attr("class", "axis")	
	.attr("transform", "translate("+offsetX+", "+((210-(scale-1)*80)+offsetY)+")")	
	.call(
		d3.svg.axis()
		.scale(yScale)  
		.orient("left") 
		)
		
	var xScale = d3.time.scale()  
	.domain([new Date(currentYear + "/1/1"), new Date((currentYear + rangeYear - 1) + "/1/1")])
	.range([0, svgWidth]) 
		
	d3.select("#myGraph2")	
	.append("g")	
	.attr("class", "axis")	
	.attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")
	.call(
		d3.svg.axis()
		.scale(xScale)  
		.orient("bottom") 
		.ticks(10)	
		.tickFormat(function(d, i) {
		var fmtFunc = d3.time.format("%Y년");	
			return fmtFunc(d);	
			})
			)

	.selectAll("text")	
	.attr("transform", "rotate(0)")	
	.attr("dx", "-1.5em")	
	.attr("dy", "1.5em")	
	.style("text-anchor", "start")	
	}
	
	function pickupData(data, start) {
	 dataSet = [ ];	
	 for(var i=0; i<rangeYear; i++) {	
	 dataSet[i] = data[start + i];
	 }
	 d3.select("#myGraph2").selectAll("*").remove(); }
	 });