var map = new google.maps.Map(
	d3.select("#map").node(), {
		zoom: 2, 
		center: new google.maps.LatLng(20, 125),
		mapTypeId: google.maps.MapTypeId.TERRAIN
	})

d3.json("data/cities.json", function(data) {

var overlay = new google.maps.OverlayView()

    overlay.onAdd = function() {
      var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
          .attr("class", "stations")
		//google.maps.event.addDomListener(this.marker, 'mouseover', function(){ alert('mouseover') });
		
	    overlay.draw = function() {
	     	  var projection = this.getProjection(),
	          padding = 20
			
      var marker = layer.selectAll("svg")
          .data(d3.entries(data))
          .each(transform) // update existing markers
          .enter().append("svg")
          .each(transform)
          .attr("class", "marker")
			
      marker.append("circle")
		.attr("r", function(d) {return d.value[2]})//4)
          .attr("cx", padding)
          .attr("cy", padding)
			
		 //
	 //  var contentString = '<div id="content">'+
	 //        '<div id="siteNotice">'+
	 //        '</div>'+
	 //        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
	 //        '<div id="bodyContent">'+
	 //        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
	 //        '(last visited June 22, 2009).</p>'+
	 //        '</div>'+
	 //        '</div>';
	 //
	 // 		    var infowindow = new google.maps.InfoWindow({
	 // 		       content: contentString
	 // 		     });
	 // google.map.event.addListener("click",function(){ map.setZoom(8);
	 //     map.setCenter(marker.getPosition());})	
		  //       marker.append("text")
		  //           .attr("x", padding + 12)
		  //           .attr("y", padding)
		  //           .attr("dy", ".31em")
		  // .style("fill", "#F4F6F6")
		  // .style("stroke","#515A5A")
		  // .style("stroke-width", "1")
		  //           .text(function(d) { return d.key })
			
			       function transform(d) {
					  d = new google.maps.LatLng(d.value[1],d.value[0])
			        d = projection.fromLatLngToDivPixel(d)
			        return d3.select(this)
			            .style("left", (d.x - padding) + "px")
			            .style("top", (d.y - padding) + "px")
					    .style("width",150)
					    .style("height",150)
					    
				   
					   
					   
			      }
		
		}
	}
  overlay.setMap(map)

})

/*var map = new google.maps.Map(
	d3.select("#map").node(), {
		zoom: 4, 
		center: new google.maps.LatLng(25, 120),
		mapTypeId: google.maps.MapTypeId.ROADMAP // MapTypeId.TERRAIN, MapTypeId.HYBRID, MapTypeId.SATELLITE
	})

d3.json("data/cities.json", function(data) {
  	
  var overlay = new google.maps.OverlayView()

  overlay.onAdd = function() {
    var layer = d3.select(this.getPanes().overlayLayer).append("div")
        .attr("class", "stations")

    overlay.draw = function() {
			// console.log("called")
      var projection = this.getProjection(),
          padding = 20
		
		
      var marker = layer.selectAll("svg")
          .data(d3.entries(data))
          .each(transform) // update existing markers
          .enter().append("svg")
          .each(transform)
          .attr("class", "marker")

      marker.append("circle")
		.attr("r", function(d) {return d.value[2]})//4)
          .attr("cx", padding)
          .attr("cy", padding)
		/*.on("mouseover", function(d){
		           current_position = d3.mouse(this); 
		           var tooltipDiv = document.getElementById('tooltip');
		           tooltipDiv.innerHTML = d.key;
		           tooltipDiv.style.top = current_position[1]+'px';
		           tooltipDiv.style.left = current_position[0]+'px';
		           tooltipDiv.style.display = "block";

		           d3.select(this).style("fill", "red");
		       })*/


		    // marker.addListener("click", function() {
		    //    infowindow.open(map, marker);
// 		    //  });
//
// google.maps.event.addListener(marker,"click",function(){infowindow.open(map, marker);})
// /*
//       marker.append("text")
//           .attr("x", padding + 12)
//           .attr("y", padding)
//           .attr("dy", ".31em")
// 		  .style("fill", "#F4F6F6")
// 		  .style("stroke","#515A5A")
// 		  .style("stroke-width", "1")
//           .text(function(d) { return d.key })
//
// 	*/
//
//       function transform(d) {
// 		  d = new google.maps.LatLng(d.value[1],d.value[0])
//         d = projection.fromLatLngToDivPixel(d)
//         return d3.select(this)
//             .style("left", (d.x - padding) + "px")
//             .style("top", (d.y - padding) + "px")
// 		    .style("width",150)
// 		    .style("height",150)
//
//
//       }
//     }
//   }
//
//   // Bind our overlay to the map…
//   overlay.setMap(map)
// })
//
