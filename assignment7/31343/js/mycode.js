var map = new google.maps.Map(
  d3.select("#map").node(), {
    zoom: 15,
    center: new google.maps.LatLng(37.463842, 126.949335),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
);

var species = ["이팝나무", "소나무", "은단풍나무", "메타세쿼이아", "회화나무", "복자기나무", "감나무", "버즘나무", "왕벚나무", "은단풍", "느티나무", "은행나무", "양버즘나무","벚나무"];
var c20 = d3.scale.category20c().range();
d3.csv("data/data.csv", function(error, data) {

  var overlay = new google.maps.OverlayView();

  overlay.onAdd = function() {
    var layer = d3.select(this.getPanes().overlayLayer).append("div")
      .attr("class", "trees");

    overlay.draw = function() {
      var projection = this.getProjection(),
          padding = 10;

      var marker = layer.selectAll("svg")
        .data(data)
        .each(transform)
        .enter().append("svg")
        .each(transform)
        .attr("class", "marker");

      marker.append("circle")
        .attr("r", 4)
        .attr("cx", padding)
        .attr("cy", padding)
        .style("fill", function(d) {return c20[species.indexOf(d.species)];});

      function transform(d) {
        var name = d.species;
        d = new google.maps.LatLng(parseFloat(d.lat), parseFloat(d.lng));
        d = projection.fromLatLngToDivPixel(d);
        return d3.select(this)
                  .style("left", (d.x - padding) + "px")
                  .style("top", (d.y - padding) + "px");
      };
    }
  };

  overlay.setMap(map);

  var legend = d3.select("#legend")
    .selectAll("svg")
    .data(species)
  .enter()
    .append("svg")
    .attr("x", 0)
    .attr("y", function(d, i) { return i * 25; })
    .attr("width", "100%")
    .attr("height", "25px");

  legend.append("circle")
    .attr("r", 8)
    .attr("cx", 10)
    .attr("cy", 10)
    .style("fill", function(d, i) {return c20[i];});

  legend.append("text")
    .text(function(d) { return d; })
    .attr("x", 24)
    .attr("y", 15)
});