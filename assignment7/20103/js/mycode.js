var map = new google.maps.Map(
	d3.select("#map").node(), {
		zoom: 3, 
		center: new google.maps.LatLng(0, 0),
		mapTypeId: google.maps.MapTypeId.ROADMAP// MapTypeId.TERRAIN, MapTypeId.HYBRID, MapTypeId.SATELLITE
	}
)

d3.csv("data/finlist_latlng.csv", function(data) {

  var overlay = new google.maps.OverlayView()

  overlay.onAdd = function() {
    var layer = d3.select(this.getPanes().overlayLayer).append("div")
        .attr("class", "stations")

    overlay.draw = function() {
			// console.log("called")
      var projection = this.getProjection(),
          padding = 10  //패팅을 통해서 공간을 확보함 

      var marker = layer.selectAll("svg")
          .data(data) //(d3.entries(data))
          .each(transform) // update existing markers
          .enter().append("svg")
          .each(transform)
          .attr("class", "marker")

      marker.append("circle")
          .attr("r", function(d) { return 2 + Math.sqrt(+d.Round); })
          .attr("cx", padding)
          .attr("cy", padding)
          .style("width",1000)
          .style("height",1000)

      marker.append("text")
          .attr("x", padding + 12)
          .attr("y", padding)
          .attr("dy", ".31em")
          .text(function(d) { return d.Name })

      function transform(d) {
        d = new google.maps.LatLng(d.lat, d.lng)
        d = projection.fromLatLngToDivPixel(d)
        return d3.select(this)
            .style("left", (d.x - padding) + "px")
            .style("top", (d.y - padding) + "px")
            .style("width",1000)
            .style("height",1000)
      }
    }
  }

  // Bind our overlay to the map…
  overlay.setMap(map)
})