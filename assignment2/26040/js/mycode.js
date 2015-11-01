d3.select("#mytemplet")
	.append("rect")
	.attr("x", 10)
	.attr("y", 40)
	.attr("height", 500)
	.attr("width", 500)
	.attr("fill" , "black")
	.append("rect")
	.attr("x", 10)
	.attr("y", 40)
	.attr("height", 500)
	.attr("width", 500)
	.attr("fill", "black")
	.transition()
	.duration(3000)
	.attr("x", 10)
	.attr("y", 500)


var lineData1 = [ { "x": 260,  "y": 90},
				 { "x": 130,  "y": 290},
				 { "x": 180,  "y": 360},
				 { "x": 260,  "y": 390},
				 { "x": 340,  "y": 360},
                 { "x": 390,  "y": 290} ] 

var lineData2 = [ { "x": 220,  "y": 250},
			   	  { "x": 260,  "y": 350},
                  { "x": 300,  "y": 250} ] 


var lineFunction_BC = d3.svg.line()
                         .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .interpolate("basis-closed");

var lineFunction_BO = d3.svg.line()
                         .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .interpolate("basis");


d3.select("#mytemplet")
	.append("path")
	.attr("d", lineFunction_BC(lineData1))
	.attr("stroke" , "white")
	.attr("stroke-width" , 3)


d3.select("#mytemplet")
	.append("circle")
	.attr("cx" , 230)
	.attr("cy" , 230)
	.attr("r" , 5)
	.attr("fill" , "white")


d3.select("#mytemplet")
	.append("circle")
	.attr("cx" , 290)
	.attr("cy" , 230)
	.attr("r" , 5)
	.attr("fill" , "white")


d3.select("#mytemplet")
	.append("path")
	.attr("d", lineFunction_BO(lineData2))
	.attr("stroke" , "white")
	.attr("stroke-width" , 3)


d3.select("#mytemplet")
	.append("rect")
	.attr("x", 10)
	.attr("y", 40)
	.attr("height", 500)
	.attr("width", 500)
	.attr("fill", "white")
	.transition()
	.duration(5000)
	.attr("x", 10)
	.attr("y", 500)









