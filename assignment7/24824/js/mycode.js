var width = 800, height = 700, centered

var svg = d3.select("#map").append("svg")
		.attr("width", width)
		.attr("height", height)

var seoul = svg.append("g").attr("id", "seoul")
var places = svg.append("g").attr("id", "places")

var projection = d3.geo.mercator()
		.center([126.9895, 37.5651])
		.scale(100000)
		.translate([width/2, height/2])

var path = d3.geo.path().projection(projection)

var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("z-index", "10")
	.style("visibility", "hidden")
	.text("a simple tooltip");

d3.json("map/seoul_municipalities_topo_simple.json", function(error, data) {
	
	if (error) { return console.error(error) }
	// console.log(data)
	var features = topojson.feature(data, data.objects.seoul_municipalities_geo).features
	// var features = topojson.feature(data, data.objects["seoul_municipalities_geo"]).features
	// console.log(features)

	seoul.selectAll("path")
			.data(features)
			.enter()
			.append("path")
			.attr("class", function(d) {
				// console.log(d.properties.code)
				return "municipality c" + d.properties.code
			})
			.attr("d", path)
			.on("click", clicked)
			
	seoul.selectAll("text")
			.data(features)
			.enter()
			.append("text")
			.attr("class", "municipality-label")
			.attr("transform", function(d) { return "translate(" + path.centroid(d) + ")" })
			.attr("dy", ".35em")
			.text(function(d) { return d.properties.name })

	    		
	d3.csv("data/coffeedata.csv", function(error, data) {
		places.selectAll("circle")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) { return projection([d.lon, d.lat])[0] })
				.attr("cy", function(d) { return projection([d.lon, d.lat])[1] })
				.attr("r", 3)
				.attr("class", function(d) { return d.name; })

		places.selectAll("text")
			    .data(data)
			   	.enter()
				.append("text")
			    .attr("x", function(d) { return projection([d.lon, d.lat])[0] })
			    .attr("y", function(d) { return projection([d.lon, d.lat])[1] + 8 })
				.attr("dx", "2pt")
				.attr("dy", "-.40em")

	})
	


	function clicked(d) {
	  var x, y, k
	  if (d && centered != d) {
	    var centroid = path.centroid(d)
	    x = centroid[0]
	    y = centroid[1]
	    k = 4
	    centered = d
	  } else {
	    x = width / 2
	    y = height / 2
	    k = 1
	    centered = null
	  }

	  seoul.selectAll("path")
	      .classed("active", centered && function(d) { return d == centered })

	  seoul.transition()
	      .duration(750)
	      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
			
	  places.transition()
	      .duration(750)
	      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
		
		places.selectAll("circle")
				.classed("show", centered && k == 4)
		
		places.selectAll("text")
				.classed("show", centered && k == 4)
	}

})
		

