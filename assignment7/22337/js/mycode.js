var width = 960,
    height = 500;
	
var projection = d3.geo.mercator()
    .center([0, 5])
    .scale(150)
    .rotate([-150,0]);

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);
	
	
var filter = svg.append("defs")
    .append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "110%");
  filter.append("feGaussianBlur")
  .attr("in", "SourceAlpha")
  .attr("stdDeviation", 1)
  .attr("result", "blur");

   filter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 1)
      .attr("dy", 1)
      .attr("result", "offsetBlur");

var feMerge = filter.append("feMerge");

  feMerge.append("feMergeNode")
      .attr("in", "offsetBlur")
  feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");
    
var gradient = svg.append("svg:defs")
    .append("svg:linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

  gradient.append("svg:stop")
      .attr("offset", "0%")
      .attr("stop-color", "#0F3871")
      .attr("stop-opacity", 1);

  gradient.append("svg:stop")
      .attr("offset", "100%")
      .attr("stop-color", "#175BA8")
      .attr("stop-opacity", 1);

var path = d3.geo.path()
    .projection(projection);

var g = svg.append("g").attr("pointer-event","none");
var h = svg.append("g");

var idbyname = {};

d3.csv("data/countrynames.csv",function(names){
	console.log(names);
	names.forEach(function(d){
		idbyname[d.id] = "<strong>" + d.name + "</strong><br>"+ d.org + "" + " " + d.city + "<br>" 
		+ d.quant + ""+ "" + " " + d.ratio;	
	});
});

d3.json("data/world-110m2.json", function(error, topology) {
    h.selectAll("path")
      .data(topojson.object(topology, topology.objects.countries)
          .geometries)
    .enter()
      .append("path")
      .attr("d", path)
	
	.on("mouseover",function(d,i){
	      	console.log(d.id);
	      	d3.select(this).style('fill','#EB9A28');
	      	document.getElementById("info").innerHTML = idbyname[d.id];
	      	var xPosition = parseFloat(d3.event.pageX) + 15 ;
					var yPosition = parseFloat(d3.event.pageY) - 15 ;
	      	d3.select("#info")
						.style("left", xPosition + "px")
						.style("top", yPosition + "px")	
						.text( Math.round(p[measure]*1000)/1000)
						;
					
					d3.select("#info").classed("hidden",false);
				
	      })
	      .on("mouseout",function(d,i){
	      	d3.select(this).style('fill','none');
	      	d3.select("#info").classed("hidden",true);
	      })
	      .on("mousemove",function(d,i){
	      	var xPosition = parseFloat(d3.event.pageX) + 15 ;
					var yPosition = parseFloat(d3.event.pageY) - 15 ;
					d3.select("#info")
						.style("left", xPosition + "px")
						.style("top", yPosition + "px")	
						;
					
					d3.select("#info").classed("hidden",false);
	      })
	      .attr("class",function(d,i){
	      	return "country_" + d.id;
	      })
	      .style("fill","none")
	      .style("pointer-events","all")
	      .attr('cursor','pointer')
	      ;
      
	    g.insert("path")
	      .datum(topojson.object(topology, topology.objects.land))
	      .attr("class", "land")
	      .attr("d", path)
	      .attr("pointer-events","none")
	      .style("filter", "url(#drop-shadow)")
	      .style("fill", "url(#gradient)")
	      ;
      
	    g.insert("path")
	      .datum(topojson.mesh(topology, topology.objects.countries, function(a, b) { return a !== b; }))
	      .attr("class", "boundary")
	      .attr("d", path)
	      .style("fill","none")
	      .attr("pointer-events","none")
	
	
d3.csv("data/cities.csv", function(error, data) {
        g.selectAll("circle")
           .data(data)
           .enter()
           .append("circle")
           .attr("cx", function(d) {
                   return projection([d.lon, d.lat])[0];
           })
           .attr("cy", function(d) {
                   return projection([d.lon, d.lat])[1];
           })
           .attr("r", 5)
           .style("fill", "red");

		   
		   
			     //
	     //         g.selectAll("text")
	     //   .data(data)
	     //   .enter()
	     // .append("text")
	     //   .attr("x", function(d) {
	     //           return projection([d.lon, d.lat])[0];
	     //   })
	     //   .attr("y", function(d) {
	     //           return projection([d.lon, d.lat])[1];
	     //   })
	     //   .attr("dy", -7)
	     //  .style("fill", "black")
	     //  .attr("text-anchor", "middle")
	     //  .text(function(d) {return d.city + "," + d.country;});

});
});


