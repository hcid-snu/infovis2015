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

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-15, 0])
  .html(function(d, i) {
    return "<span style='color:white'>여성인구: " + d.properties.population[1] + "<br>남성인구: "+ d.properties.population[0] +"</span>";
  });

svg.call(tip);

d3.json("map/map.json", function(error, data) {
	
	if (error) { return console.error(error) }
	var features = topojson.feature(data, data.objects.seoul_municipalities_geo).features
	
	seoul.selectAll("path")
			.data(features)
			.enter()
			.append("path")
			.attr("class", function(d) {
				// console.log(d.properties.code)
				return "municipality c" + d.properties.code
			})
			.attr("d", path)
			
	seoul.selectAll("text")
			.data(features)
			.enter()
			.append("text")
			.attr("class", "municipality-label")
			.attr("transform", function(d) { return "translate(" + path.centroid(d) + ")" })
			.attr("dy", ".35em")
			.text(function(d) { return d.properties.name })

	var bars = seoul.selectAll(".bar")
                        .data(features)
                        .enter()
			.append("g")
			.on("mouseover", tip.show)
			.on("mouseout", tip.hide)
	bars.append("rect")
                        .attr("class", "pop_women")
                        .attr("transform", function(d) { return "translate(" + (+path.centroid(d)[0]-20) + ',' + (+path.centroid(d)[1]-d.properties.population[1]/10000-10) + ")" })
                        .attr("width", 20)
			.attr("height", function(d) { return d.properties.population[1]/10000 })
			.style("fill", "red")
	bars.append("rect")
                        .attr("class", "pop_men")
                        .attr("transform", function(d) { return "translate(" + (+path.centroid(d)[0]) + ',' + (+path.centroid(d)[1]-d.properties.population[0]/10000-10) + ")" })
                        .attr("width", 20)
                        .attr("height", function(d) { return d.properties.population[0]/10000 })
                        .style("fill", "blue")	

})
		

