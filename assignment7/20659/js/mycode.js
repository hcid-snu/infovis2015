var map = new google.maps.Map(
	d3.select("#map").node(), {
		zoom: 19, 
		center: new google.maps.LatLng(37.479094, 126.954285),
		mapTypeId: google.maps.MapTypeId.ROADMAP // MapTypeId.TERRAIN, MapTypeId.HYBRID, MapTypeId.SATELLITE
	}
)

d3.json("data/store.json", function(data) {
  var overlay = new google.maps.OverlayView()

  overlay.onAdd = function() {
    var layer = d3.select(this.getPanes().overlayLayer).append("div")
        .attr("class", "stores")

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
          .attr("r", 6)
          .attr("cx", padding)
          .attr("cy", padding)

      marker.append("text")
          .attr("x", padding + 12)
          .attr("y", padding)
          .attr("dy", ".31em")
          .text(function(d) { return d.key })


          // 우리가 원하는 모든 data가 좌표로 변환되는 것
      function transform(d) {
        d = new google.maps.LatLng(d.value[1], d.value[0])
        d = projection.fromLatLngToDivPixel(d) //convert 하는 것
        return d3.select(this)
            .style("left", (d.x - padding) + "px")
            .style("top", (d.y - padding) + "px")

            //padding 부분 : css에서 공간만들어주는 기능(여유공간)
            // 하는 이유 - 그려질 공간을 확보하기 위해서 
      }
    }
  }

  // Bind our overlay to the map…
  overlay.setMap(map)
})