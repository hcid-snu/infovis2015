var width = 800, height = 700

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

var popByName = d3.map()

queue()
    .defer(d3.json, "map/seoul_municipalities_topo_simple.json")
    .defer(d3.csv, "data/bikepopulation.csv", function(d) { popByName.set(d.name, +d.value) })
    .await(ready)

function ready(error, data) {
	// console.log(popByName)
  var features = topojson.feature(data, data.objects.seoul_municipalities_geo).features
	
	var colorScale = d3.scale.quantize()
			.domain([0, 200000])
			.range(d3.range(9).map(function(i) { return "p" + i }))

  seoul.selectAll("path")
      .data(features)
    	.enter().append("path")
      .attr("class", function(d) {
				return "municipality " + colorScale(popByName.get(d.properties.name)) 
			})
      .attr("d", path)
      .attr("id", function(d) { return d.properties.name })
			
	seoul.selectAll("text")
			.data(features)
			.enter()
			.append("text")
			.attr("class", "municipality-label")
			.attr("transform", function(d) { return "translate(" + path.centroid(d) + ")" })
			.attr("dy", ".35em")
			.text(function(d) { return d.properties.name })
}

d3.csv("data/bikeplace.csv", function(error, data) {
		places.selectAll("circle")
				.data(data)
				.enter()
				.append("circle")
				.attr("cx", function(d) { return projection([d.lon, d.lat])[0] })
				.attr("cy", function(d) { return projection([d.lon, d.lat])[1] })
				.attr("r", 1)
		
		places.selectAll("text")
	      .data(data)
	    	.enter()
				.append("text")
	      .attr("x", function(d) { return projection([d.lon, d.lat])[0] })
	      .attr("y", function(d) { return projection([d.lon, d.lat])[1] + 8 })
				.attr("dx", "2pt")
				.attr("dy", "-.40em")
	      .text(function(d) { return d.name })
})
