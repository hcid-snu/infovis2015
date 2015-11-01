	d3.csv("data/mydata2.csv", function(error, data){	
		var svgEle = document.getElementById("myGraph2")
		var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
		var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
		svgWidth = parseFloat(svgWidth) 
		svgHeight = parseFloat(svgHeight) 
	
		var dataSet = []  
		var dataLabel = []  
		for(var i = 0; i < data.length; i++) {
			dataLabel.push(data[i].accident)
			dataSet.push(data[i].year)
		}
	
		console.log(dataSet)
	
		var color = d3.scale.category10()
	
		var pie = d3.layout.pie().sort(null)
	
		var arc = d3.svg.arc().innerRadius(50).outerRadius(180)
	
		var pieElements = d3.select("#myGraph2")
			.selectAll("g")
			.data(pie(dataSet))
			.enter()
			.append("g")
			.attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")") 
		
		pieElements
			.append("path")
			.attr("class", "pie")
			.style("fill", function(d, i) { return color(i) })
			.transition()
			.duration(1000)
			.delay(function(d, i) { return i * 40 })
			.ease("linear")
			.attrTween("d", function(d, i) {
				var interpolate = d3.interpolate(
					{ startAngle: d.startAngle, endAngle: d.startAngle },
					{ startAngle: d.startAngle, endAngle: d.endAngle }
				)
				return function(t) { return arc(interpolate(t) )}
			})
		
		var textElements = d3.select("#myGraph2")
			.append("text")
			.attr("class", "total")
			.attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")")
			.text("Total: " + d3.sum(dataLabel))
	
		pieElements
		  .append("text")	
		  .attr("class", "pieNum")	
		  .attr("transform", function(d, i){
				return "translate(" + arc.centroid(d) + ")"    
			})
		  .text(function(d, i){
				return dataLabel[i]	
			})

		 		pieElements
		  .append("text")	
		  .attr("class", "pieNum2")	
		  .attr("transform", function(d, i){
     		   var c = arc.centroid(d);
     		   return "translate(" + c[0]*1.8 +"," + c[1]*1.8 + ")";
			})
		  .text(function(d, i){
				return dataSet[i]	
			})
	})