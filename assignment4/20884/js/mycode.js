
var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y%m%d").parse;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category20();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature); });

var svg = d3.select("body").append("svg")
    .attr("id", "myGraph")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "lines")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/data.csv", function(error, data) {
  if (error) throw error;

  var dataPie = new Object(); 
  keys = d3.keys(data[0]);
  for(var i = 0; i < data.length; i++) {
		if (i==0) {
			for (var j=1; j<keys.length; j++) {
				dataPie[keys[j]]= +data[i][keys[j]];
			}
		} else {
			for (var j=1; j<keys.length; j++) {
                                dataPie[keys[j]]+= +data[i][keys[j]];
                        }
		}
        }

  var dataSet = [];
  var dataLabel = [];
  for (var key in dataPie) {
	dataLabel.push(key);
	dataSet.push(dataPie[key]);
  }

  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([0, 0])
  .html(function(d, i) {
    return "<strong>City:</strong> <span style='color:red'>" + dataLabel[i] + "</span><br><strong>Count:</strong><span style='color:red'>"+ dataSet[i]+"</span>";
  });

  svg.call(tip);
 
var color = d3.scale.category20()

// pie chart layout 설정
var pie = d3.layout.pie().sort(null)

// pie chart 크기 설정
var arc = d3.svg.arc().innerRadius(50).outerRadius(150)

// pie chart 그리기 준비
var pieElements = d3.select("#myGraph")
	.selectAll("g")
	.filter(function() { return !d3.select(this).classed("lines") })
	.data(pie(dataSet))
	.enter()
	.append("g")
	.attr("transform", "translate(" + (width+100) + ", " + height/2 + ")") // g 의 중심을 원의 가운데로 이동

// 데이터 추가
pieElements
	.append("path")
	.attr("class", "pie")
	.style("fill", function(d, i) { return color(i) })
	.on('mouseover', function(d, i) { 
		tip.show(d, i); 
		d3.select("path#"+dataLabel[i]).style("opacity", 1.0);
		})
        .on('mouseout', function(d, i) { 
		tip.hide(d, i);
		d3.select("path#"+dataLabel[i]).style("opacity", 0.2);
		} )
	.transition()
	.duration(1000)
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
	.attr("transform", "translate(" + (width+60) + ", " + height/2 + ")")
	.text("Total: " + d3.sum(dataSet))


  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  data.forEach(function(d) {
    d.date = +d.date;
  });

  var cities = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, temperature: +d[name]};
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));

  y.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
  ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
	.attr("x", width)
	.attr("y", 0)
	.text("age");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Count");

  var city = svg.selectAll(".city")
      .data(cities)
    .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
      .attr("id", function(d) { return d.name })
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); })

});
