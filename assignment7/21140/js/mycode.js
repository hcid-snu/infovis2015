var width = 600,
    height = 700;

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);

var projection = d3.geo.mercator()
    .center([128, 36])
    .scale(5000)
    .translate([width/2, height/2]);

var path = d3.geo.path()
    .projection(projection);

var quantize = d3.scale.quantize()
    .domain([0, 1000])
    .range(d3.range(9).map(function(i) { return "p" + i; }));

var popByName = d3.map();

queue()
    .defer(d3.json, "map/municipalities-topo-simple.json")
    .defer(d3.csv, "data/population.csv", function(d) { popByName.set(d.name, +d.population); })
    .await(ready);

function ready(error, data) {
  var features = topojson.feature(data, data.objects["municipalities-geo"]).features;

  svg.selectAll("path")
      .data(features)
    .enter().append("path")
      .attr("class", function(d) { return "municipality " + quantize(popByName.get(d.properties.name)/path.area(d)); })
      .attr("d", path)
      .attr("id", function(d) { return d.properties.name; });
}

/*
var map = new google.maps.Map(
	d3.select("#map").node(), {
		zoom: 15, 
		center: new google.maps.LatLng(37.463842, 126.949335),
		mapTypeId: google.maps.MapTypeId.ROADMAP // MapTypeId.TERRAIN, MapTypeId.HYBRID, MapTypeId.SATELLITE
	}
)

d3.json("data/stations.json", function(data) {
  var overlay = new google.maps.OverlayView()

  overlay.onAdd = function() {
    var layer = d3.select(this.getPanes().overlayLayer).append("div")
        .attr("class", "stations")

    overlay.draw = function() {
			// console.log("called")
      var projection = this.getProjection(),
          padding = 10

      var marker = layer.selectAll("svg")
          .data(d3.entries(data))
          .each(transform) // update existing markers
          .enter().append("svg")
          .each(transform)
          .attr("class", "marker")

      marker.append("circle")
          .attr("r", 8)
          .attr("cx", padding)
          .attr("cy", padding)

      marker.append("text")
          .attr("x", padding + 12)
          .attr("y", padding)
          .attr("dy", ".31em")
          .text(function(d) { return d.key })

      function transform(d) {
        d = new google.maps.LatLng(d.value[1], d.value[0])
        d = projection.fromLatLngToDivPixel(d)
        return d3.select(this)
            .style("left", (d.x - padding) + "px")
            .style("top", (d.y - padding) + "px")
      }
    }
  }

  // Bind our overlay to the map…
  overlay.setMap(map)
})
*/