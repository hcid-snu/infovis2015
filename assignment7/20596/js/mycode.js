var width = 1200, 
	height = 900;

var rateByID = d3.map();
var cafeList = [];
var foodList = [];
var visitList = [];

var quantize = d3.scale.quantize()
	.domain([0, 1118])
	.range(d3.range(9).map(function(i) { return "p" + i }))

var projection = d3.geo.mercator()
	.center([126.9895, 37.5651])
	.scale(150000)
	.translate([width/2, height/2]);

var path = d3.geo.path()
	.projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var seoul = svg.append("g").attr("id", "seoul")
var cafe = svg.append("g").attr("id", "cafe")
var food = svg.append("g").attr("id", "food")
var visit = svg.append("g").attr("id", "visit")

queue()
    .defer(d3.json, "map/seoul_municipalities_topo_simple.json")
    .defer(d3.csv, "data/bdate.csv", function(d) {rateByID.set(d.name, +d.value) })
    .defer(d3.csv, "data/food.csv", function(d) {foodList.push(d) })
    .defer(d3.csv, "data/visit.csv", function(d) {visitList.push(d) })
    .await(ready)

function ready(error, data) {
	if (error) throw error;

    seoul.selectAll("path")
     	.data(topojson.feature(data, data.objects.seoul_municipalities_geo).features)
    	.enter()
    	.append("path")
     	.attr("class", function(d) { 
     		return "municipality " + quantize(rateByID.get(d.properties.name)); 
     	})
     	.attr("d", path)
     	.attr("id", function(d) { return d.properties.name })
     	;		

    seoul.selectAll("text")
		.data(topojson.feature(data, data.objects.seoul_municipalities_geo).features)
		.enter()
		.append("text")
		.attr("class", "municipality-label")
		.attr("transform", function(d) { return "translate(" + path.centroid(d) + ")" })
		.attr("dy", ".35em")
		.text(function(d) { return d.properties.name })
		;

	food.selectAll("circle") 
		.data(foodList)
		.enter()
		.append("circle")
		.attr("cx", function(d) { return projection([d.lon, d.lat])[0] })
		.attr("cy", function(d) { return projection([d.lon, d.lat])[1] })
		.attr("r", 3)
		.style("fill", "red")
		;

	food.selectAll("text")
      	.data(foodList)
    	.enter()
		.append("text")
		.attr("class", "food-label")
      	.attr("x", function(d) { return projection([d.lon, d.lat])[0] })
      	.attr("y", function(d) { return projection([d.lon, d.lat])[1] + 10})
		.attr("dx", "5pt")
		.attr("dy", "-.40em")
      	.text(function(d) { return d.name })
      	;

	visit.selectAll("circle") 
		.data(visitList)
		.enter()
		.append("circle")
		.attr("cx", function(d) { return projection([d.lon, d.lat])[0] })
		.attr("cy", function(d) { return projection([d.lon, d.lat])[1] })
		.attr("r", 3)
		.style("fill", "blue")
		;

	visit.selectAll("text")
      	.data(visitList)
    	.enter()
		.append("text")
		.attr("class", "visit-label")
      	.attr("x", function(d) { return projection([d.lon, d.lat])[0] + 10})
      	.attr("y", function(d) { return projection([d.lon, d.lat])[1] + 15})
		.attr("dx", "5pt")
		.attr("dy", "-.40em")
      	.text(function(d) { return d.name })
      	;
    }

