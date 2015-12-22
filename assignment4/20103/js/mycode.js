

// 전체 그래프의 사이즈 지정
var margin = { top: 20, right: 20, bottom: 30, left: 50 }
var width = 960 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom

// 데이터의 텍스트 날짜 포맷 (day-month-year)을 날짜 오브젝트 포맷으로 변환
var parseDate = d3.time.format("%Y-%m-%d").parse
	bisectDate = d3.bisector(function(d) { return d.date; }).left,
    formatValue = d3.format(","),
    formatCurrency = function(d) { return "₩" + formatValue(d); };

// x, y 축을 위한 range 설정 (x: time scale, y: linear)
var x = d3.time.scale().range([0, width])
var y = d3.scale.linear().range([height, 0])


// color
var color = d3.scale.category10();


// x, y 축 스케일과 위치 설정
var xAxis = d3.svg.axis().scale(x).orient("bottom")
var yAxis = d3.svg.axis().scale(y).orient("left")

// 그려질 line 설정 (x: date, y: close)
var line = d3.svg.line()
	.interpolate("basis")
    .x(function(d) { return x(d.date) })
    .y(function(d) { return y(d.close) })

// svg 설정하고 추가
var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	

d3.csv("data/mydata.csv", function(error, data) {
	// ?
	if (error) throw error;

	// ?
	color.domain(d3.keys(data[0]).filter(function(key){return key !== "date";}));

	data.forEach(function(d) {
		d.date = parseDate(d.date)
//		d.close = +d.close
		// console.log(d.date)
	})

	var companies = color.domain().map(function(name) {
    	return {
	      name: name,
	      values: data.map(function(d) {
	        return {date: d.date, close: +d[name]};
     	})
   	 };
 	});

	
	x.domain(d3.extent(data, function(d) { return d.date }))
	y.domain([
	    d3.min(companies, function(c) { return d3.min(c.values, function(v) { return v.close - 1500; }); }),
	    d3.max(companies, function(c) { return d3.max(c.values, function(v) { return v.close; }); })
	  ]);
	
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
		.text("Price (won)")


	// svg.append("path")
	// 	.datum(data)
	// 	.attr("class", "line")
	// 	.attr("d", line)

	var company = svg.selectAll(".company")
	      .data(companies)
	    .enter().append("g")
	      .attr("class", "company");

	  company.append("path")
	      .attr("class", "line")
	      .attr("d", function(d) { return line(d.values); })
	      .style("stroke", function(d) { return color(d.name); });

	  company.append("text")
	      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
	      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.close) + ")"; })
	      .attr("x", 3)
	      .attr("dy", ".35em")
	      .text(function(d) { return d.name; });


	// var focus = svg.append("g")
	//       .attr("class", "focus")
	//       .style("display", "none");

	// var circles = focus.selectAll('circle')
	//     .data(companies) 
	//     .enter()
	//     .append('circle')
	//     .attr('class', 'circle')
	//     .attr('r', 4.5)
	//     .attr('stroke', function (d) {return color(d.name);});

	//   // focus.append("circle")
	//   //     .attr("r", 4.5);

	//   focus.append("text")
	//       .attr("x", 9)
	//       .attr("dy", ".35em");

	//   svg.append("rect")
	//       .attr("class", "overlay")
	//       .attr("width", width)
	//       .attr("height", height)
	//       .on("mouseover", function() { focus.style("display", null); })
	//       .on("mouseout", function() { focus.style("display", "none"); })
	//       .on("mousemove", mousemove);

	//   function mousemove() {
	//     var x0 = x.invert(d3.mouse(this)[0]),
	//         i = bisectDate(data, x0, 1),
	//         d0 = data[i - 1],
	//         d1 = data[i],
	//         d = x0 - d0.date > d1.date - x0 ? d1 : d0;
	//     focus.attr("transform", "translate(" + 
	//     	x(d.date) + "," + 
	//     	y(d.values) + ")");
	//     focus.select("text").text(formatCurrency(d.values));
	//   }








})