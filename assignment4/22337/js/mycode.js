drawPie("data/mydata2007.csv")

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
		var arc = d3.svg.arc().innerRadius(50).outerRadius(100)
	
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
			.duration(150)
			.delay(function(d, i) { return i * 150 })
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
			.text("주요 도시 별")
	
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
//



var margin = { top: 20, right: 30, bottom: 50, left: 70 }
var width = 560 - margin.left - margin.right
var height = 410 - margin.top - margin.bottom;

var formatYear = d3.format("d");
var formatKorea = d3.format(",");
//
var bisectYear = d3.bisector(function(d) { return d.year; }).left;

var x = d3.scale.linear()
	.range([0, width]);
	
var y = d3.scale.linear()
	.range([height, 0]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.tickFormat(formatYear);
	
var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

var xAxisGrid = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(20)
    .tickSize(-height, 0, 0)
    .tickFormat("");

var yAxisGrid = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10)
    .tickSize(-width, 0, 0)
    .tickFormat("");

var line = d3.svg.line()
	// .interpolate("basis")
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.korea); });

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	

d3.tsv("data/mydata.tsv", function(error, data) {	
	data.forEach(function(d) {
		d.year = +d.year;
		d.korea = +d.korea;
});

	x.domain(d3.extent(data, function(d) { return d.year }))
	y.domain(d3.extent(data, function(d) { return d.korea }));
//
svg.append("g")
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisGrid);

svg.append("g")
    .attr("class", "grid")
    .call(yAxisGrid);

svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("x", width / 2 )
      .attr("y", margin.bottom / 2)
      .style("text-anchor", "middle")
      .style("font-size", "100%")
      .text("년도");
	
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
      	.attr("y", - margin.left / 2)
     	 .attr("x", - height / 2)
     	 .style("text-anchor", "middle")
    	  .style("font-size", "100%")
	  .text(" 음주운전 사고 사망자 수 (명)");

	svg.append("path")
		.datum(data)
		.attr("class", "line")
	  	.attr("d", line);


var focus = svg.append("g")
    .attr("class", "focus")
    .style("display", "none");

  focus.append("circle")
      .attr("r", 5.5);
  focus.append("circle")
      .attr("r", 2);

  focus.append("text")
      .attr("class", "koreaLabel")
      .attr("x", 10)
      .attr("dy", "-.35em");

  svg.append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove);

  function mousemove() {
    var x0 = x.invert(d3.mouse(this)[0]),
        i = bisectYear(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    focus.attr("transform", "translate(" + x(d.year) + "," + y(d.korea) + ")");
    focus.select(".yearLabel").text("Year: " + formatYear(d.year));
    focus.select(".koreaLabel").text("Korea_Total: " + formatKorea(d.korea));
  }
});