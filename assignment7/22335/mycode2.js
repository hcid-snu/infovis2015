var width = 1000, height = 700, centered

var svg = d3.select("#map2").append("svg")
	.attr("width", width)
	.attr("height", height)

var seoul = svg.append("g").attr("id", "seoul")
var places = svg.append("g").attr("id", "places")

var projection = d3.geo.mercator()
	.center([126.9895, 37.5651])
	.scale(100000)
	.translate([width/2, height/2])

var path = d3.geo.path().projection(projection)

d3.json("seoul_2.json", function(error, data) {
	
	if (error) { return console.error(error) }
	
	var features = topojson.feature(data, data.objects.seoul_municipalities_geo).features
	
	seoul.selectAll("path")
		.data(features)
		.enter()
		.append("path")
		.attr("class", function(d) {
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
			
	d3.csv("seoul_places.csv", function(error, data) {
		places.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function(d) { return projection([d.lon, d.lat])[0] })
		.attr("cy", function(d) { return projection([d.lon, d.lat])[1] })
		.attr("r", 1.5)
		
		places.selectAll("text")
	    .data(data)
	    .enter()
		.append("text")
	    .attr("x", function(d) { return projection([d.lon, d.lat])[0] - 10})
	    .attr("y", function(d) { return projection([d.lon, d.lat])[1] + 10 })
		.attr("dx", "2pt")
		.attr("dy", "-.40em")
		.style("font-family", "Nanum Gothic")
    	.style("font-size", "5px")
    	.style("font-weight", "bold")
    	.text(function(d) { return d.name })
	})
	
	function clicked(d) {
	var x, y, k
	if (d && centered != d) {
	var centroid = path.centroid(d)
	x = centroid[0]
	y = centroid[1]
	k = 3
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
	.classed("show", centered && k == 3)
		
	places.selectAll("text")
	.classed("show", centered && k == 3)
	}
})
		
