// 전체 그래프의 사이즈 지정
var margin = { top: 20, right: 20, bottom: 30, left: 50 }
var width = 960 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom

// 데이터의 텍스트 날짜 포맷 (day-month-year)을 날짜 오브젝트 포맷으로 변환
var parseDate = d3.time.format("%d-%b-%y").parse

// x, y 축을 위한 range 설정 (x: time scale, y: linear)
var x = d3.time.scale().range([0, width])
var y = d3.scale.linear().range([height, 0])

// x, y 축 스케일과 위치 설정
var xAxis = d3.svg.axis().scale(x).orient("bottom")
var yAxis = d3.svg.axis().scale(y).orient("left")

// 그려질 line 설정 (x: date, y: cases)
var line = d3.svg.line()
    .x(function(d) { return x(d.date) })
    .y(function(d) { return y(d.cases) })

// svg 설정하고 추가
var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	

d3.tsv("data/mydata.tsv", function(error, data) {

	data.forEach(function(d) {
		d.date = parseDate(d.date)
		d.cases = +d.cases
		// console.log(d.date)
	})
	
	x.domain(d3.extent(data, function(d) { return d.date }))
	y.domain(d3.extent(data, function(d) { return d.cases }))
	
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
		.text("Number of Cases")
		
	svg.append("path")
		.datum(data)
		.attr("class", "line")
		.attr("d", line)

})