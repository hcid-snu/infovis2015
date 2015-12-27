var myStyle = [
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [
    { visibility: "off" }
   ]
  },{
     featureType: "poi",
     elementType: "labels",
     stylers: [
     { visibility: "on" }
   ]
  },{
     featureType: "water",
     elementType: "labels",
     stylers: [
     { visibility: "off" }
   ]
  },{
     featureType: "road",
     elementType: "labels",
     stylers: [
     { visibility: "off" }
   ]
    }
       ];

   var map = new google.maps.Map(document.getElementById('map'), {
    mapTypeControlOptions: {
      mapTypeIds: ['mystyle', google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.TERRAIN]
    },
    center: new google.maps.LatLng(42.318491, -72.630877),
    zoom: 17,
    mapTypeId: 'mystyle'
   });

  map.mapTypes.set('mystyle', new google.maps.StyledMapType(myStyle, { name: 'My Style' }));

d3.json("data/restaurants.json", function(data) {
  var overlay = new google.maps.OverlayView()

  overlay.onAdd = function() {
    var layer = d3.select(this.getPanes().overlayLayer).append("div")
        .attr("class", "stations")

    overlay.draw = function() {
      var projection = this.getProjection(),
          padding = 10

      var marker = layer.selectAll("svg")
          .data(d3.entries(data))
          .each(transform) 
          .enter().append("svg")
          .each(transform)
          .attr("class", "marker")

      marker.append("circle")
          .attr("r", 5)
          .attr("cx", padding)  
          .attr("cy", padding)

      marker.append("text")
          .attr("x", padding + 10)
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

  overlay.setMap(map)
})