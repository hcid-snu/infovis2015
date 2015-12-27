
drawPie("data/mydata2013.csv")

  d3.select("#year").on("change", function() {
    d3.select("#chart").selectAll("*").remove()
    drawPie("data/mydata" + this.value + ".csv", this.value)
})




function drawPie(filename) {

  d3.csv(filename, function(error,data){


  var dataOuter = [], dataMid = [], dataInner = [];
  var dataset = [
                dataOuter,
                dataMid,
                dataInner,

            ];
           	var svgEle = document.getElementById("chart")
            var width = window.getComputedStyle(svgEle, null).getPropertyValue("width")
                height = window.getComputedStyle(svgEle, null).getPropertyValue("height")
                cwidth = 50;

            width = parseFloat(width) // remove px
			height = parseFloat(height) // remove px    

    for (var i = 0; i < data.length; i++){
    dataset[0].push(+data[i].nextYear)
    dataset[1].push(+data[i].thisYear)
    dataset[2].push(+data[i].preYear)
  }

            var color = d3.scale.category10();

            var pie = d3.layout.pie()
                .sort(null);

      var arcs = [
        d3.svg.arc()
          .innerRadius(0)
          .outerRadius(50),
        d3.svg.arc()
          .innerRadius(60)
          .outerRadius(110),
        d3.svg.arc()
          .innerRadius(120)
          .outerRadius(170)];

            var svg = d3.select("#chart").append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

       // g for each pie
      var pies = svg.selectAll(".pie")
        .data(dataset)
        .enter().append("g")
        .attr("class", "pie");

      // pie up the data, add a g for each slice (arc + text)
      var slices = pies.selectAll(".slice")
        .data(function(d) {
          return pie(d);
        })
        .enter()
        .append("g")
        .attr("class","slice");
      
      // add our paths with our arcs
      slices
        .append("path")
        .attr("fill", function(d, i, j) {
          return color(i);
        })
        .attr("d", function(d, i, j) {
          return arcs[j](d);
        });
  
      // add our text
      slices
        .append("text")
        .attr("class", "pieNum")
        .attr("transform", function(d, i, j) {
          return "translate(" + arcs[j].centroid(d) + ")"
        })
        .text(function(d, i) {
          return d.value
        })


	  	})
  }




var margin = {top: 20, right: 80, bottom: 30, left: 50},
    lineWidth = 640 - margin.left - margin.right,
    lineHeight = 480 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, lineWidth]);

var y = d3.scale.linear()
    .range([lineHeight, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("linear")
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.temperature); });

var svg = d3.select("body").append("svg")
    .attr("width", lineWidth + margin.left + margin.right)
    .attr("height", lineHeight + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/mydataYear.csv", function(error, data) {
  if (error) throw error;

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));

  data.forEach(function(d) {
    d.year = parseFloat(d.year);
    d.Accidents = +d.Accidents;
    d.DeathToll = +d.DeathToll;
    d.Injuries = +d.Injuries;
  });



  var cities = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {year: d.year, temperature: +d[name]};
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.year; }));

  y.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
  ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + lineHeight + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("발생건수/부상자/사망자");

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
      .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.temperature) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

city.append('g')
.selectAll('text')
.data(data)
.enter()
.append('text')
.classed('label', true)
.attr('x', function(d, i) {
    return x(d.year);
  })
.attr('y', function(d, i) {
    return y(d.Accidents);
  })
.text(function(d, i) {
      return d.Accidents;
    })
city.append('g')
.selectAll('text')
.data(data)
.enter()
.append('text')
.classed('label', true)
.attr('x', function(d, i) {
    return x(d.year);
  })
.attr('y', function(d, i) {
    return y(d.Injuries);
  })
.text(function(d, i) {
      return d.Injuries;
    })
city.append('g')
.selectAll('text')
.data(data)
.enter()
.append('text')
.classed('label', true)
.attr('x', function(d, i) {
    return x(d.year);
  })
.attr('y', function(d, i) {
    return y(d.DeathToll);
  })
.text(function(d, i) {
      return d.DeathToll;
    })


})

