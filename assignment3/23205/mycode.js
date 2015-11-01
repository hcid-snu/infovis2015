var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x2 = d3.scale.ordinal()
  .rangeBands([0, width], 0);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);
    // .ticks(10, "%");

var chart = d3.select(".myGraph")
    .attr("width", width + margin.left + margin.right+100)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d,i) {
    return "<strong>" +d.country2+ ": <span style='color:hsl(" + d.value * 360 + ", 50%, 60%)'>"+ d3.round(d.value*100,2) + "%</span></strong>";
  })
chart.call(tip);

d3.csv("mydata2.csv", type, function(error, data) {

  x.domain(data.map(function(d) { return d.country; }));
  x2.domain(data.map(function(d) { return d.country; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.country); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", x.rangeBand())
      .attr("fill", barFill)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  // chart.selectAll(".text")
  //    .data(data)
  //  .enter().append("text")
  //     .attr("y", function(d) { return x(d.country) +19 ;} )
  //     .attr("x", function(d) { return -y(d.value) -50; })
  //     .attr("text-anchor", "start")
  //     .attr("transform","rotate(-90)")
  //     .text(function(d) { return d.country2 ;}); //+ " : " + d3.round(d.value*100,2) + "%"


  d3.select("input").on("change", change);

  var sortTimeout = setTimeout(function() {
    d3.select("input").property("checked", true).each(change);
  }, 2000);


  function change() {
    clearTimeout(sortTimeout);

    // Copy-on-write since tweens are evaluated after a delay.
    var x0 = x.domain(data.sort(this.checked
        ? function(a, b) { return b.value - a.value; }
        : function(a, b) { return d3.ascending(a.country, b.country); })
        .map(function(d) { return d.country; }))
        .copy();

    chart.selectAll(".bar")
        .sort(function(a, b) { return x0(a.country) - x0(b.country); });

    var transition = chart.transition().duration(750),
        delay = function(d, i) { return i * 50; };

    transition.selectAll(".bar")
        .delay(delay)
        .attr("x", function(d) { return x0(d.country); });

    transition.select(".x.axis")
        .call(xAxis)
      .selectAll("g")
        .delay(delay);

  }

  // horizontal line


  var avg = 0.2164;

  var line =  d3.svg.line()
    .x(function(d, i) { return margin.left + x2(d.country) + i; })
    .y( y(avg)+margin.top);

  d3.select(".myGraph").append("g").append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line)
      .style("stroke-dasharray", ("4, 3"));

  d3.select(".myGraph").append("g").append("text")
        .attr("transform", "translate("+(width-20)+"," + (y(avg)+margin.top-10) + ")")
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        // .style("fill", "rgba(200, 0, 0, 0.6)")
        .text("OECD value: "+ d3.round(avg*100,2)+"%");

});

function type(d) {
  d.value = d3.round(+d.value/100,4); // coerce to number
  // d.value = +d.value; // coerce to number
  return d;
}

function barFill(d) {
  // return "rgb(0, 0, " + 255*d.value + ")";
  return "hsl(" + d.value * 360 + ", 50%, 60%)";
}


