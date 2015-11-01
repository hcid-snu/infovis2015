//시계열 그래프 만들기
var margin = {top: 20, right:80, bottom: 30, left: 50}, 
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(5)
    .tickFormat(d3.time.format("%Y"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.year) })
    .y(function(d) { return y(d.casualties)})

var svg = d3.select("#line-chart-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

d3.csv("data/mydata.csv", function(error, data) {
    if (error) throw error;

    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "기간"; }));


    data.forEach(function(d) {
        if (d["기간"] !== "") {
            d.year = parseDate(d["기간"]);
        }
    });
    
    var cities = color.domain().map(function(name) {
        return {
            name: name,
            values: data.map(function (d) {
                return { year: d.year, casualties: +d[name] };
            })
        };
    });

    x.domain(d3.extent(data, function(d) { console.log(d.year); return d.year; }));
    y.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.casualties; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.casualties; }); })
  ]);

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
      .text("people");

  var city = svg.selectAll(".city")
      .data(cities)
    .enter().append("g")
      .attr("class", "city");

  city.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); });

  city.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.casualties) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });
});

var pie_width = 960,
    pie_height = 500,
    radius = Math.min(pie_width, pie_height) / 2;

var pie_color = d3.scale.category10();

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(80);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.casualties; });

drawPie("data/casualties_age_2010.csv")

function drawPie(filename) {
    var svg_pie = d3.select("#pie-chart-container").append("svg")
        .attr("width", pie_width)
        .attr("height", pie_height)
        .attr("id", "pie-chart")
        .append("g")
        .attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");

    d3.csv(filename, function(error, data) {
        if (error) throw error;

        data.forEach(function(d) {
            d.casualties = +d.casualties;
        });

        var g = svg_pie.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return color(d.data.age); });

        g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(function(d) { return d.data.age; });

    });};

d3.select("#year").on("change", function() {   
    console.log("#year changed");
    d3.select("#pie-chart").remove()  
    drawPie("data/casualties_age_" + this.value + ".csv",  this.value)  
})
