<script>

var width = 450,
    height = 450,
	radius =  Math.min(width, height) / 2 ,
    color = d3.scale.category20();
	
var svg = d3.select("body").append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", "translate(" + radius + "," + radius + ")");

var partition = d3.layout.partition()
				.sort(null)
				.size([2 * Math.PI, radius * radius])
				.value(function(d) { return 1; });
				
var arc = d3.svg.arc()
			.startAngle(function(d) { return d.x; })
			.endAngle(function(d) { return d.x + d.dx; })
			.innerRadius(function(d) { return Math.sqrt(d.y); })
			.outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });


d3.json("city_tree.json", function(error, root) {

	if(error)
		console.log(error);
	console.log(root);

	var nodes = partition.nodes(root);
	var links = partition.links(nodes);

	console.log(nodes);

	var arcs = svg.selectAll("g")
				  .data(nodes)
				  .enter().append("g");
	
	arcs.append("path")
		.attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
		.attr("d", arc)
		.style("stroke", "#fff")
		.style("fill", function(d) { return color((d.children ? d : d.parent).name); })
		.on("mouseover",function(d){
			d3.select(this)
				.style("fill","yellow");
		})
		.on("mouseout",function(d){
			d3.select(this)
				.transition()
				.duration(200)
				.style("fill", function(d) { 
					return color((d.children ? d : d.parent).name); 
				});
		});

				  
	arcs.append("text")  
		.style("font-size", "12px")
		.style("font-family", "simsun")
		.attr("text-anchor","middle")
		.attr("transform",function(d,i){
				
				if( i == 0 )
					return "translate(" + arc.centroid(d) + ")";
				
				
				var r = 0;
				if( (d.x+d.dx/2)/Math.PI*180 < 180 )  
					r = 180 * ((d.x + d.dx / 2 - Math.PI / 2) / Math.PI);
				else  
					r = 180 * ((d.x + d.dx / 2 + Math.PI / 2) / Math.PI);
					
				
				return  "translate(" + arc.centroid(d) + ")" +
						"rotate(" + r + ")";
		}) 
		.text(function(d) { return d.name; }); 	
  
});

</script>
		
    </body>  
</html>  