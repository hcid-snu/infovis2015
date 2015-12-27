var map = new google.maps.Map(
	d3.select("#map").node(), {
		zoom: 15, 
		center: new google.maps.LatLng(37.3724399181038, 127.122359990796),
		mapTypeId: google.maps.MapTypeId.ROADMAP // MapTypeId.TERRAIN, MapTypeId.HYBRID, MapTypeId.SATELLITE
	}
)

d3.json("data/333.json", function(data) {
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