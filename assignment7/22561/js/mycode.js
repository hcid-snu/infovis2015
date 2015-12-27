// Canvas size
var width = window.innerWidth - 2;
var height = window.innerHeight - 92, centered;

var svg = d3.select("#map").append("svg")
	.attr("width", width)
	.attr("height", height);

var seoul = svg.append("g").attr("id", "seoul")
var places = svg.append("g").attr("id", "places")

var projection = d3.geo.mercator()
	.center([126.9895, 37.5651])
	.scale(100000)
	.translate([width/2, height/2])

var path = d3.geo.path().projection(projection)
var popByName = d3.map()

queue().defer(d3.json, "map/seoul_municipalities_topo_simple.json")
	.defer(d3.csv, "data/dead.csv", function(d) { popByName.set(d.name, +d.value) })
	.await(ready)

function ready(error, data) {
	var features = topojson.feature(data, data.objects.seoul_municipalities_geo).features
	var colorScale = d3.scale.quantize()
		.domain([0, 500])
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
		.text(function(d) {
			return d.properties.name + "(" + popByName.get(d.properties.name) + ")"
		})
}