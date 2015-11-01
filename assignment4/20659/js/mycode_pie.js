drawPie("data/data_pie.csv", "2005")

d3.select("#year").on("change", function() { 
	d3.select("#myGraphPie").selectAll("*").remove()
	drawPie("data/data_pie.csv", this.value)
});

function drawPie(filename, year) {
	
	d3.csv(filename, function(error, data){	
		var svgEle = document.getElementById("myGraphPie")
		var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
		var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
		svgWidth = parseFloat(svgWidth) 
		svgHeight = parseFloat(svgHeight) 
	
		var dataSet = []  
		var dataLabel = []  
		for(var i = 0; i < data.length; i++) {
			dataLabel.push(data[i]["type"])
			dataSet.push(data[i]["accident_" + year])
		}
	
		console.log(dataSet)
	
		var color = d3.scale.ordinal()
			.domain(["차대사람", "차대차", "차량단독"])
			.range(["#98abc5", "#8a89a6", "#7b6888"])
	
		var pie = d3.layout.pie().sort(null)

		var radius = 100;
	
		var arc = d3.svg.arc().innerRadius(70).outerRadius(180)
	
var outerArc = d3.svg.arc()
	.innerRadius(radius * 0.9)
	.outerRadius(radius * 0.9);

		var pieElements = d3.select("#myGraphPie")
			.selectAll("g")
			.data(pie(dataSet))
			.enter()
			.append("g")
			.attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")") 
	
		pieElements.append("g")
			.attr("class", "labels");
		pieElements.append("g")
			.attr("class", "lines");


		pieElements
			.append("path")
			.attr("class", "pie")
			.style("fill", function(d, i) { return color(i) })
			.transition()
			.duration(400)
			.delay(function(d, i) { return i * 40 })
			.ease("linear")
			.attrTween("d", function(d, i) {
				var interpolate = d3.interpolate(
					{ startAngle: d.startAngle, endAngle: d.startAngle },
					{ startAngle: d.startAngle, endAngle: d.endAngle }
				)
				return function(t) { return arc(interpolate(t) )}
			})
			
		var textElements = d3.select("#myGraphPie")
			.append("text")
			.attr("class", "total")
			.attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")")
			.text("Total: " + d3.sum(dataSet))
	
		pieElements
		  .append("text")	
		  .attr("class", "pieNum")	
		  .attr("transform", function(d, i){
				return "translate(" + arc.centroid(d) + ")"    
			})
		  .text(function(d, i){
				return dataSet[i]	
			})

		pieElements
		  .append("text")	
		  .attr("class", "pieAcc")	
		  .attr("transform", function(d, i){
				var c = arc.centroid(d);
        		return "translate(" + c[0]*1.5 +"," + c[1]*1.5 + ")";   
			})
		  .text(function(d, i){
				return dataLabel[i]	
			})



	})
	
}
