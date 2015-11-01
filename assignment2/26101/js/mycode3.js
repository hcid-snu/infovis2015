//too much errors occured in reading csv, so I put data in this sheet.

var svgWidth= 800;
var svgHeight = 200;
var offsetX = 45;
var offsetY = 10;
var barElements;
var dataSet = [18.982, 28.414, 30.685, 16.964, 20.575, 30.14, 31.036, 31.879, 25.795, 24.003, 22.127, 16.506, 20.99, 28.64, 10.408, 23.537, 24.736, 2.203, 20.614, 25.21, 18.359, 26.767, 28.112, 19.39, 21.738, 19.225, 16.26, 23.717, 21.638]
var dataMax = 100; 
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
.attr("x", function(d,i){
	return i * (barWidth+barMargin)+offsetX;
})
.attr("y", svgHeight - offsetX)
.on("mouseover", function() {
	d3.select(this)
	.style("fill","gold")
})
.on("mouseout", function(){
	d3.select(this)
	.style("fill", "red")
})
.transition()
.duration(1000)
.delay(function(d,i){
	return i*100;
})
.attr("y", function(d,i) {
	return svgHeight -d -offsetY;
})
.attr("height", function(d,i) {
	return d;
})
barElements.enter()
.append("text")
.attr("class", "barNum")
.attr("x", function(d,i) {
	return i * (barWidth + barMargin) +10+offsetX;
})
.attr("y", svgHeight -5 - offsetY)
.text(function(d,i) {
	return d;
})
var yScale = d3.scale.linear()
.domain([0,dataMax])
.range([dataMax, 0])
d3.select("#myGraph")
.append("g")
.attr("class", "axis")
.attr("transform", "translate(" + offsetX + "," + ((svgHeight-100)-offsetY) +")")
.call(
	d3.svg.axis()
	.scale(yScale)
	.orient("left")
	.ticks(1)
	.tickValues([1,2,3,5,10,20,30])
	.tickFormat(d3.format(".2f"))
)
d3.select("#myGraph")
.append("rect")
	.attr("class", "axis_x")
	.attr("width", "320")
	.attr("height", "1")
	.attr("transform", "translate(" + offsetX + ", " + (svgHeight-offsetY)+")")
barElements.enter()
	.append("text")
.attr("class", "barName")
.attr("x", function(d,i) {
	return i*25 +10+offsetX;
})
.attr("y", svgHeight-offsetY+15)
.text(function(d,i) {
	return ["Austrailia", "Austria", "Belgium", "Canada", "Czech Republic", "Denmark", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Korea", "Luxembourg", "Netherlands", "Norway", "Poland", "Portugal", "Slovak Republic", "Spain", "Sweden", "Switzerland", "United Kingdom", "United States", "Estonia", "Slovenia", "OECD Total"]
})
