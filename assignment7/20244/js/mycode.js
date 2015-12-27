var width = 1150, height = 1000

var svg = d3.select("#map").append("svg")
		.attr("width", width)
		.attr("height", height)

var seoul = svg.append("g").attr("id", "seoul")

var projection = d3.geo.mercator()
		.center([126.9895, 37.5651])
		.scale(150000)
		.translate([width/2, height/2])

var path = d3.geo.path().projection(projection)

var colorScale = d3.scale.quantize()
			.domain([0, 500])
			.range(d3.range(9).map(function(i) { return "p" + i }))
			
var quantized = d3.scale.quantize()
			.domain([-0.5, 5])
			.range(d3.range(9).map(function(i) { return "p" + i }))			

var popByName = d3.map()

var legend = svg.append("g")
    .attr("class", "legend")
    .selectAll("circle");
    
var legendTag = svg.append("g")
    .attr("class", "legendTag")
    .selectAll("text");   
    
queue()
    .defer(d3.json, "map/seoul_submunicipalities_topo_simple.json")
    .defer(d3.csv, "data/basic_pop.csv", function(d) { popByName.set(d.name, +(d.value/d.population*100)) })
    .await(ready)
    
var tagName = ["0% ~ 0.10%","0.11% ~ 0.70%","0.71% ~ 1.32%","1.33% ~ 1.94%", "1.95% ~ 2.55%", "2.56% ~ 3.10%", "3.01% ~ 3.72%", "3.73% ~ 4.30%", "4.31% 초과"]


function ready(error, data) {
	 console.log(popByName)
	 
  var features = topojson.feature(data, data.objects.seoul_submunicipalities_geo).features
  
	features.forEach(function(d) {
        d.properties.value = popByName.get(d.properties.name);
        // d.properties.density = d.properties.value / d.properties.population; 
        d.properties.quantized = quantized(d.properties.value);
      });

 seoul.selectAll("path")
      .data(features)
    	.enter()
    	.append("path")
      .attr("class", function(d) {return "submunicipality " + d.properties.quantized; })
      .attr("d", path)
      .attr("id", function(d) { return d.properties.name })
			
	seoul.selectAll("text")
			.data(features)
			.enter()
			.append("text")
			.attr("class", "submunicipality-label")
			.attr("transform", function(d) { return "translate(" + path.centroid(d) + ")" })
			.attr("dy", ".35em")
			.text(function(d) { return d.properties.name })
			
	legend = legend.data(features)
      	.enter()
      	.append("circle")
  		.attr("class", function(d, i) {
  			if (i < 10) {
  			return "submunicipality p" + i; 
  			} else {
  			return "submunicipality p9"
  			}
  			})
  		.attr("r", 9)
  		.style("opacity", "0.75")
  		.attr("transform", function (d, i) { return "translate(10," + (i * 30 + 30) + ")";})

  	  legendTag = legendTag.data(features)
  	  	.enter().append("text")
  	  	.attr("x", 20)
  		.attr("dy", "2.22em")
  		.attr("class", function(d, i) {
  			if (i < 10) {
  			return "submunicipality p" + i; 
  			} else {
  			return "submunicipality p9"
  			}
  			})
  		.style("opacity", "0.75")
  		.text(function(d, i) { return tagName[i];})
  		.attr("transform", function (d, i) { return "translate(10," + i * 30 + ")";})
}

