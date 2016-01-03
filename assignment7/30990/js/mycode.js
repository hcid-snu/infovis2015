var width = 800, height = 700

var svg = d3.select("#map").append("svg")
		.attr("width", width)
		.attr("height", height)

var seoul = svg.append("g").attr("id", "seoul")

var projection = d3.geo.mercator()
		.center([126.9895, 37.5651])
		.scale(100000)
		.translate([width/2, height/2])

var path = d3.geo.path().projection(projection)

var popByName = d3.map()

var tip = d3.tip()
		  .attr('class', 'd3-tip')
		  .offset([50, 0])
		  .html(function(d) {
    		return '<span style="color:blue, font:sans-serif">'+ popByName.get(d.properties.name)+ '</span>';
 		});

queue()
    .defer(d3.json, "map/seoul_municipalities_topo_simple.json")
    .defer(d3.csv, "data/turnout.csv", function(d) { popByName.set(d.name, +d.value) })
    .await(ready)

function ready(error, data) {
	// console.log(popByName)
  var features = topojson.feature(data, data.objects.seoul_municipalities_geo).features
	
	var colorScale = d3.scale.quantize()
			.domain([70, 80])
			.range(d3.range(9).map(function(i) { return "p" + i }))

	svg.call(tip);

  seoul.selectAll("path")
      .data(features)
    	.enter().append("path")	 
      .attr("class", function(d) {
				return "municipality " + colorScale(popByName.get(d.properties.name)) 
			})
      .attr("d", path)
         	.on('mouseover', function(d){
         	tip.show.apply(this, arguments);
		})
		.on('mouseout', function(){
			tip.hide.apply(this, arguments);
		})
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




