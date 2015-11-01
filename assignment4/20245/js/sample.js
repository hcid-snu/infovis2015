var svgWidth = 900;	
var svgHeight = 440;
var offsetX = 30;	
var offsetY = 20;
var scale = 2.0;
var dataSet = [
	{ year : 2004, item1 : 98.8, item2 : 163.2, item3 : 95.4, item4 : 49, item5 : 91.3, item6 : 91.2, item7 : 79.5, item8 : 68.3, item9 : 93.9, item10 : 55.4},
	{ year : 2005, item1 : 153.4, item2 : 171.9, item3 : 106.3, item4 : 50.1, item5 : 93.4, item6 : 75.6, item7 : 90.8, item8 : 87.5, item9 : 96.9, item10 : 73.2},
	{ year : 2006, item1 : 119.4, item2 : 195, item3 : 115, item4 : 52.9, item5 : 86.4, item6 : 78.1, item7 : 87.2, item8 : 63.2, item9 : 111.9, item10 : 67.3},
	{ year : 2007, item1 : 115.1, item2 : 165.7, item3 : 119, item4 : 55.8, item5 : 89.7, item6 : 72.2, item7 : 71.7, item8 : 83.5, item9 : 97.9, item10 : 80.6},
	{ year : 2008, item1 : 64.7, item2 : 59.7, item3 : 64.7, item4 : 77.4, item5 : 79.8, item6 : 82.9, item7 : 76.5, item8 : 79.7, item9 : 77.1, item10 : 80.6},
	{ year : 2009, item1 : 68.9, item2 : 54.3, item3 : 68, item4 : 79.7, item5 : 77.5, item6 : 84.8, item7 : 80.2, item8 : 80.4, item9 : 73.5, item10 : 82.8},
	{ year : 2010, item1 : 65.0, item2 : 67.0, item3 : 71.7, item4 : 85.9, item5 : 78.9, item6 : 83.6, item7 : 85.7, item8 : 81.1, item9 : 77.3, item10 : 83},
	{ year : 2011, item1 : 66.6, item2 : 55.9, item3 : 77.1, item4 : 81.9, item5 : 75.7, item6 : 84.8, item7 : 81, item8 : 80.6, item9 : 74.2, item10 : 84},
	{ year : 2012, item1 : 67.3, item2 : 58.9, item3 : 73.9, item4 : 80.1, item5 : 76.9, item6 : 80.7, item7 : 78.9, item8 : 79.8, item9 : 73.6, item10 : 79.7},
	{ year : 2013, item1 : 66.4, item2 : 58.5, item3 : 73.2, item4 : 83.6, item5 : 74.1, item6 : 79.1, item7 : 79.5, item8 : 77.2, item9 : 73.1, item10 : 83.5}
];
var margin = svgWidth /(dataSet.length - 1);
drawGraph(dataSet, "item1", "itemA", "linear");	
drawGraph(dataSet, "item2", "itemB", "linear");	
drawGraph(dataSet, "item3", "itemC", "linear");
drawGraph(dataSet, "item4", "itemD", "linear");
drawGraph(dataSet, "item5", "itemE", "linear");
drawGraph(dataSet, "item6", "itemF", "linear");
drawGraph(dataSet, "item7", "itemG", "linear");
drawGraph(dataSet, "item8", "itemH", "linear");
drawGraph(dataSet, "item9", "itemI", "linear");
drawGraph(dataSet, "item10", "itemJ", "linear");

drawScale();	

function drawGraph(dataSet, itemName, cssClassName, type){
	
	var line = d3.svg.line()	
	  .x(function(d, i){
			return offsetX + i * margin;
		})
	  .y(function(d, i){
			return svgHeight - (d[itemName] * scale) - offsetY;	
		})
	  .interpolate(type)
	
	var lineElements = d3.select("#myGraph2")
	  .append("path")	
	  .attr("class", "line "+cssClassName)	
	  .attr("d", line(dataSet))	
}

function drawScale(){
	
	var yScale = d3.scale.linear() 
	  .domain([0, 200])  
	  .range([scale*200, 0]) 
	
	d3.select("#myGraph2")
		  .append("g")	
		  .attr("class", "axis")
		  .attr("transform", "translate("+offsetX+", "+offsetY+")")
		  .call(
				d3.svg.axis()
			  .scale(yScale) 
			  .orient("left")
			)
	
	var xScale = d3.scale.linear() 
	  .domain([2004, 2013])
	  .range([0, svgWidth])
	
	d3.select("#myGraph2")
		  .append("g")
		  .attr("class", "axis")
		  .attr("transform", "translate("+offsetX+", "+(svgHeight - offsetY)+")")
		  .call(
				d3.svg.axis()
			  .scale(xScale)
			  .orient("bottom")
			  .tickFormat(d3.format("0f"))
			)
}