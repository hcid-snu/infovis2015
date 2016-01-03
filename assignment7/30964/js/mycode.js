var width = 1000, height = 800

var svg = d3.select("#map").append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "background")

var seoul = svg.append("g").attr("id", "seoul")

var projection = d3.geo.mercator()
		.center([127.9029, 36.7639])
		.scale(7000)
		.translate([width/2, height/3])

var path = d3.geo.path().projection(projection)

var popByName = d3.map()

queue()
    .defer(d3.json, "map/skorea_provinces_topo_simple.json")
    .defer(d3.csv, "data/crime2014.csv", function(d) { popByName.set(d.name_eng, +d.value) })
    .await(ready)

function ready(error, data) {
	console.log(popByName)
  var features = topojson.feature(data, data.objects.skorea_provinces_geo).features
	
	var colorScale = d3.scale.quantize()
			.domain([10, 60])
			.range(d3.range(10).map(function(i) { return "p" + i }))

  seoul.selectAll("path")
      .data(features)
    	.enter().append("path")
      .attr("class", function(d) {
				return "municipality " + colorScale(popByName.get(d.properties.name_eng)) 
			})
      .attr("d", path)
      .attr("id", function(d) { return d.properties.name_eng })
			
	seoul.selectAll("text")
			.data(features)
			.enter()
			.append("text")
			.attr("class", "municipality-label")
			.attr("transform", function(d, i) { return "translate(" + path.centroid(d) + ")" })
			.attr("dy", ".35em")
			.text(function(d) { return d.properties.name })
}

