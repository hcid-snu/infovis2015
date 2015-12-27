var svgWidth = 1000;
var svgHeight = 700;
var degree = 0;
var earthSize = 250;

var earth = d3.geo.orthographic()
	.translate([svgWidth/2, svgHeight/2])
	.clipAngle(90)
	.scale(earthSize)
	.rotate([degree, 23.5])
var path = d3.geo.path()
	.projection(earth)

d3.json("mydata.json", function(error, world) {
	d3.select("#myGraph")
		.append("circle")
		.attr("cx", svgWidth/2)
		.attr("cy", svgHeight/2)
		.attr("r", earthSize)
		.style("fill", "url(#grad)")
	var earthPath = d3.select("#myGraph")
		.selectAll("path")
		.data(world.features)
		.enter()
		.append("path")	
		.attr("d", path)
		.style("fill", function(d, i) {
			if (d.properties.name == "Antarctica") {
			return "white";
			}
			if (d.properties.name == "Korea") {
			return "#C97CA3";
			}
			if (d.properties.name == "Japan") {
			return "#C97CA3";
			}
			if (d.properties.name == "China") {
			return "#C97CA3"
			}
			if (d.properties.name == "Taiwan") {
			return "#C97CA3"
			}
			if (d.properties.name == "Malaysia") {
			return "#C97CA3"
			}
			if (d.properties.name == "New Zealand") {
			return "#C97CA3"
			}
			if (d.properties.name == "Cambodia") {
			return "#EDC7E8"
			}
			if (d.properties.name == "Cuba") {
			return "#EDC7E8"
			}
			if (d.properties.name == "Canada") {
			return "#EDC7E8"
			}
			if (d.properties.name == "Greece") {
			return "#EDC7E8"
			}
			if (d.properties.name == "United Kingdom") {
			return "#EDC7E8"
			}
			if (d.properties.name == "France") {
			return "#EDC7E8"
			}
			if (d.properties.name == "Germany") {
			return "#EDC7E8"
			}
			if (d.properties.name == "Iceland") {
			return "#EDC7E8"
			}
			return "white";
			})
	d3.timer(function() {
		earth.rotate([degree, 23.5]);
		degree = degree + 0.7;
		earthPath.attr("d", path)
	});
})
