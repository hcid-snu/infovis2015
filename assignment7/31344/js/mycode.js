/* 	sohyun's InfoVis assignment 
	  map visualization
*/
var width = 960,
    height = 600,
    centered;

var projection = d3.geo.albersUsa()
    .scale(1280)
    .translate([width / 2, height / 2]);

var rateById = d3.map();
var countyById = d3.map();
var stateById = d3.map();

var quantize = d3.scale.quantize()
    .domain([0.0, 50.0])
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

queue()
    .defer(d3.json, "http://bl.ocks.org/mbostock/raw/4090846/us.json")
    .defer(d3.csv, "data/poverty.csv", function(d) {
      if (d.id % 1000 != 0) {
        rateById.set(d.id, +d.poverty);
      }
      rateById.set(d.id, d.poverty);
      stateById.set(d.id, d.state);
      countyById.set(d.id, d.county);
    })
    .await(ready);

tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .direction("n")
      .html(function(d) {
        return countyById.get(d.id, d.county) + ", " + stateById.get(d.id, d.state) + ": " + rateById.get(d.id, d.poverty) + "%"
      });

svg.call(tip);

var legend = d3.select("#map-legend").
  append("svg:svg").
  attr("width", 160).
  attr("height", 10)
for (var i = 0; i <= 7; i++) {
  legend.append("svg:rect").
  attr("x", i*20).
  attr("height", 10).
  attr("width", 20).
  attr("class", "q" + i + "-9 ");//color
};

function ready(error, us) {
  if (error) throw error;

  svg.append("g")
      .attr("class", "counties")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .attr("class", function(d) { return quantize(rateById.get(d.id)); })
      .attr("id", function(d) { return d.id; })
      .attr("d", path)
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);
}

d3.select(self.frameElement).style("height", height + "px");


