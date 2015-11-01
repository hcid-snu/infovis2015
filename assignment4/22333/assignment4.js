
var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var x = d3.time.scale()
var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(5)

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(18)

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.hunumber); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("assignment4.tsv", function(error, data) {
  if (error) throw error;

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

data.forEach(function(d) {
    d.date
  });

  var cities = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, hunumber: +d[name]};
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));

  y.domain([
  40,
  //  d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.hunumber; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.hunumber; }); })+10
  ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
	  .call(xAxis)
     .append("text")
      .attr("class","xdatalabel")
      .attr("fill", "blue")
      .text("구 이름 클릭하여 통계 자료 확인(새창)")
      .attr('x', 725)
      .attr('y',-480)
      .attr('fill',"blue");




  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("class","ydatalabel")
      .attr("y", -40)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .attr("fill", "blue")
      .text("단위 : 명");

  var city = svg.selectAll(".city")
      .data(cities)
    .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
    .transition()
		.duration(1000)
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); })


  city.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.hunumber) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; })
      .on("click", function() {
          window.open("http://115.84.165.91/jsp/WWS7/WWSDS7100.jsp?re_stc_cd=10754&amp;re_lang=kor")})
});

var yAxisGrid = d3.svg.axis().scale(y)
  .ticks(100) 
  .tickSize(width, 0)
  .tickFormat("")
  .orient("right");

svg.append("g")
  .classed('y', true)
  .classed('axis', true)
  .attr("class", "ygrid")
  .call(yAxisGrid);