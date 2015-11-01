var dispatch = d3.dispatch("load", "statechange");

var groups = [
"14세 이하",
"15~20세",
"21~30세",
"31~40세",
"41~50세",
"51~60세",
"61-64세",
"65~70세",
"71세이상"
];

d3.tsv("data.tsv", type, function(error, states) {
  if (error) throw error;
  var stateById = d3.map();
  states.forEach(function(d) { stateById.set(d.지역, d); });
  dispatch.load(stateById);
  dispatch.statechange(stateById.get("종로구"));
});

// A drop-down menu for selecting a state; uses the "menu" namespace.
dispatch.on("load.menu", function(stateById) {
  var select = d3.select("#pieChart")
  .append("div")
  .append("select")
  .on("change", function() { dispatch.statechange(stateById.get(this.value)); });

  select.selectAll("option")
  .data(stateById.values())
  .enter().append("option")
  .attr("value", function(d) { return d.지역; })
  .text(function(d) { return d.지역; });

  dispatch.on("statechange.menu", function(state) {
    select.property("value", state.지역);
  });
});

// A bar chart to show total population; uses the "bar" namespace.
dispatch.on("load.bar", function(stateById) {
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = 80 - margin.left - margin.right,
  height = 460 - margin.top - margin.bottom;

  var y = d3.scale.linear()
  .domain([0, d3.max(stateById.values(), function(d) { return d.total; })])
  .rangeRound([height, 0])
  .nice();

  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickFormat(d3.format(".2s"));

  // var svg = d3.select("body").append("svg")
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //   .append("g")
  //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // svg.append("g")
  //     .attr("class", "y axis")
  //     .call(yAxis);

  // var rect = svg.append("rect")
  //     .attr("x", 4)
  //     .attr("width", width - 4)
  //     .attr("y", height)
  //     .attr("height", 0)
  //     .style("fill", "#aaa");

  // dispatch.on("statechange.bar", function(d) {
  //   rect.transition()
  //       .attr("y", y(d.total))
  //       .attr("height", y(0) - y(d.total));
  // });
});

// A pie chart to show population by age group; uses the "pie" namespace.
dispatch.on("load.pie", function(stateById) {
  var width = 880,
  height = 460,
  radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
  .domain(groups)
  .range(["#00a99d", "#09929b", "#0e849a", "#1c6097", "#2e3192", "#572e76", "#892b54", "#9d2a46", "#c1272d"]);

  var arc = d3.svg.arc()
  .outerRadius(radius - 10)
  .innerRadius(radius - 70);

  var pie = d3.layout.pie()
  .sort(null);

  var svg = d3.select("#pieChart").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var path = svg.selectAll("path")
  .data(groups)
  .enter().append("path")
  .style("fill", color)
  .each(function() { this._current = {startAngle: 0, endAngle: 0}; });

  dispatch.on("statechange.pie", function(d) {
    path.data(pie.value(function(g) { return d[g]; })(groups)).transition()
    .attrTween("d", function(d) {
      var interpolate = d3.interpolate(this._current, d);
      this._current = interpolate(0);
      return function(t) {
        return arc(interpolate(t));
      };
    });
  });
});

// Coerce population counts to numbers and compute total per state.
function type(d) {
  d.total = d3.sum(groups, function(k) { return d[k] = +d[k]; });
  return d;
}




// Line graph

// var svg = dimple.newSvg("#lineChart", 590, 400);
//     d3.tsv("data.tsv", function (data) {
//       data = dimple.filterData(data, "구분", ["사망자수", "부상자수"])
//       var myChart = new dimple.chart(svg, data);
//       myChart.setBounds(60, 30, 505, 305);
//       var x = myChart.addCategoryAxis("x", "지역");
//       x.addOrderRule("지역");
//       myChart.addMeasureAxis("y", "인원");
//       var s = myChart.addSeries("구분1", dimple.plot.line);
//       s.interpolation = "cardinal";
//       myChart.addLegend(60, 10, 500, 20, "right");
//       myChart.draw();
//     });