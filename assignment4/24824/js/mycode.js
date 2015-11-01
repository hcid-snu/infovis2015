drawPie("data/mydata2010.csv")

d3.select("#year").on("change", function() { 
	d3.select("#myGraph").selectAll("*").remove()
	drawPie("data/mydata" + this.value + ".csv", this.value)
})

function drawPie(filename) {
	
	d3.csv(filename, function(error, data){
	
		// svg 요소의 크기를 구한다
		var svgEle = document.getElementById("myGraph")
		var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
		var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
		svgWidth = parseFloat(svgWidth) // remove px
		svgHeight = parseFloat(svgHeight) // remove px
	
		// 데이터 로딩
		var dataSet = []  // empty array to store data
		var dataLabel = []  // empty array to store label
		for(var i = 0; i < data.length; i++) {
			dataSet.push(data[i].share)
			dataLabel.push(data[i].carrier)
		}
	
		console.log(dataSet)
	
		var color = d3.scale.category10()
	
		// pie chart layout 설정
		var pie = d3.layout.pie().sort(null)
	
		// pie chart 크기 설정
		var arc = d3.svg.arc().innerRadius(50).outerRadius(150)
	
		// pie chart 그리기 준비
		var pieElements = d3.select("#myGraph")
			.selectAll("g")
			.data(pie(dataSet))
			.enter()
			.append("g")
			.attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")") // g 의 중심을 원의 가운데로 이동
		
		// 데이터 추가
		pieElements
			.append("path")
			.attr("class", "pie")
			.style("fill", function(d, i) { return color(i) })
			.transition()
			.duration(100)
			.delay(function(d, i) { return i * 100 })
			.ease("linear")
			.attrTween("d", function(d, i) {
				var interpolate = d3.interpolate(
					// 각 부분의 시작 각도
					{ startAngle: d.startAngle, endAngle: d.startAngle },
					// 각 부분의 종료 각도
					{ startAngle: d.startAngle, endAngle: d.endAngle }
				)
				return function(t) { return arc(interpolate(t) )}
			})
		
		// 파이 데이터의 총 합을 표시
		var textElements = d3.select("#myGraph")
			.append("text")
			.attr("class", "total")
			.attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")")
			.text("나이 범위"+ "(사망자 수)")



		var legenddata = [{age: 'under 14 (age)', color: color(0)},
		{age: '15-20 (age)', color: color(1)},
		{age: '21-30 (age)', color: color(2)},
		{age: '31-40 (age)', color: color(3)},
		{age: '41-50 (age)', color: color(4)},
		{age: '51-60 (age)', color: color(5)},
		{age: '61-64 (age)', color: color(6)},
		{age: '65-70 (age)', color: color(7)},
		{age: 'over 70 (age)', color: color(8)}]
	
		var legend = d3.select("#myGraph")
			.selectAll(".legend")
			.data(legenddata)
    		.enter().append("g")
     	 	.attr("class", "legend")
     	 	.attr("transform", function(d, i) { return "translate(50," + (i * 20 +20) + ")"; })

		  legend.append("rect")
		      .attr("x", width-80)
		      .attr("width", 15)
		      .attr("height", 15)
		      .style("fill", function(d,i) { return color(i); })

		  legend.append("text")
		      .attr("x", width)
		      .attr("y", 9)
		      .attr("dy", ".35em")
		      .style("text-anchor", "end")
		      .text(function(d) { return d.age; })   
	
		// 파이 데이터 개별 값을 표시
		pieElements
		  .append("text")	// 데이터 수만큼 text 요소가 추가됨
		  .attr("class", "pieNum")	// CSS 클래스 설정
		  .attr("transform", function(d, i){
				return "translate(" + arc.centroid(d) + ")"    // 부채꼴의 중심으로 함(무게 중심 계산)
			})
		  .text(function(d, i){
				return d.value	// 값 표시
			})
	})
	
}

// 전체 그래프의 사이즈 지정
var margin = { top: 20, right: 20, bottom: 30, left: 50 }
var width = 600 - margin.left - margin.right
var height = 400 - margin.top - margin.bottom

// 데이터의 텍스트 날짜 포맷 (day-month-year)을 날짜 오브젝트 포맷으로 변환
var parseDate = d3.time.format("%Y").parse

var padding = 20
// x, y 축을 위한 range 설정 (x: time scale, y: linear)
var x = d3.time.scale().range([padding, width-padding])
var y = d3.scale.linear().range([height, 0])

// x, y 축 스케일과 위치 설정
var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5)
var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5)

//var y = d3.scale.linear().domain([0, d3.max(data, function(d) { return d[1]; })]).range([h, 0]);

var color = d3.scale.category10();


// 그려질 line 설정 (x: date, y: close)
var line = d3.svg.line()
    .x(function(d) { return x(d.date) })
    .y(function(d) { return y(d.close) })
    .interpolate("cardinal").tension(0.8);


// svg 설정하고 추가
var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	
var focus = svg.append("g")                                // **********
    .style("display", "none");  	

d3.csv("data/mydiedata.csv", function(error, data) {

	data.forEach(function(d) {
		d.date = parseDate(d.date)
		d.close = +d.close
		// console.log(d.date)
	})
	
	x.domain(d3.extent(data, function(d) { return d.date }))
	y.domain([300,500])
	
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
	
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(360)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("사망자 수")
		
	svg.append("path")
		.datum(data)
		.attr("class", "line")
		.attr("d", line)


})


