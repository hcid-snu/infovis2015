var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 860 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.기간); })
    .y(function(d) { return y(d.합계); });

var svg = d3.select("#lineChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data3.tsv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.기간 = parseDate(d.기간);
    d.합계 = +d.합계;
  });

  x.domain(d3.extent(data, function(d) { return d.기간; }));
  y.domain([360, d3.max(data, function(d) { return 500; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("인원(명)");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
});