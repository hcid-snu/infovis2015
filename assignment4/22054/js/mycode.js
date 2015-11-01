// 전체 그래프의 사이즈 지정
var margin = { top: 20, right: 20, bottom: 30, left: 50 }
var width = 960 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom
var datasets = {
// 데이터의 텍스트 날짜 포맷 (day-month-year)을 날짜 오브젝트 포맷으로 변환
var parseDate = d3.time.format("%d-%b-%y").parse

// x, y 축을 위한 range 설정 (x: time scale, y: linear)
var x = d3.time.scale().range([0, width])
var y = d3.scale.linear().range([height, 0])

// x, y 축 스케일과 위치 설정
var xAxis = d3.svg.axis().scale(x).orient("bottom")
var yAxis = d3.svg.axis().scale(y).orient("left")

// 그려질 line 설정 (x: date, y: close)
var line = d3.svg.line()
    .x(function(d) { return x(d.year) })
    .y(function(d) { return y(d.toll) })
    .interpolate("linear")
// svg 설정하고 추가
var svg = d3.select("#linegraph")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	

d3.csv("data/mydata.csv", function(error, data) {

	data.forEach(function(d) {
		d.year = parseDate(d.year)
		d.부상인수= +d.부상인수
		// console.log(d.year)
	})
	
	x.domain(d3.extent(data, function(d) { return d.year}))
	y.domain(d3.extent(data, function(d) { return d.부상인수}))
	
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
	
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("부상인수(명)")
		
	svg.append("path")
		.datum(data)
		.attr("class", "line")
		.attr("d", line)

})
svg.selectAll(".dot")
		.data(data)
		.enter().append("circle")
		.attr("class", "datapoint")
		.attr("cx", function(d) { return x(d.year) })
		.attr("cy", function(d) { return y(d.부상인수) })
		.attr("r", 3)
		.attr("fill", "white")
		.attr("stroke", "steelblue")
		.attr("stroke-width", 3)
		// .on("mouseover", mouseover)
		// .on("mouseout", mouseout)
	}) 
}) ();
(function () {

var width = 300 
height = 300 
radius = Math.min(width, height) / 2 

var color = d3.scale.ordinal()
.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])

var arc = d3.svg.arc()
.outerRadius(radius - 10)
.innerRadius(10)

var pie = d3.layout.pie()
.sort(null)
.value(function(d) { return d.})

var svg = d3.select("#piegraph")
// })