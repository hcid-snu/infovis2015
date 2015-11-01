(function () { 

var margin = { top: 20, right: 20, bottom: 30, left: 50 }
var width = 810 - margin.left - margin.right
var height = 450 - margin.top - margin.bottom

var parseDate = d3.time.format("%d-%b-%y").parse

var x = d3.time.scale().range([0, width])
var y = d3.scale.linear().range([height, 0])

var xAxis = d3.svg.axis().scale(x).orient("bottom")
var yAxis = d3.svg.axis().scale(y).orient("left")

var line = d3.svg.line()
	.x(function(d) { return x(d.year) })
	.y(function(d) { return y(d.deathtoll)})
	.interpolate("linear")

var tip = d3.tip()
	.attr("class", "d3-tip")
	.offset([100, 20])
	.html(function(d, i) {
		return "<strong>" + "Total:" + d.deathtoll + "<br>" + "Car vs. Car:" + d.cvc + "<br>" + "Car vs. Pedestrian:" + d.cvp + "<br>" + "Single Vehicle:" + d.cal + "<br>" ;
	})

var svg = d3.select("#lineGraph")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

d3.csv("data/deathtolldata.csv", function(error, data) {

	data.forEach(function(d) {
		d.year = parseDate(d.year)
		d.deathtoll = +d.deathtoll
		d.cvp = +d.cvp
		d.cvc = +d.cvc
		d.cal = +d.cal
	})

	x.domain(d3.extent(data, function(d) { return d.year }))
	y.domain([350, d3.max(data, function(d) { return d.deathtoll })])

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0, " + height + ")")
		.call(xAxis)
		.append("text")
		.attr("transform", "rotate(0)")
		.attr("x", 380)
		.attr("dx", "-1em")
		.attr("dy", "2.5em")
		.style("text-anchor", "middle")
		.text("Year")

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Fatalities")

	svg.append("path")
		.datum(data)
		.attr("class", "line")
		.attr("d", line)

	svg.selectAll(".dot")
		.data(data)
	  .enter().append("circle")
		.attr("class", "datapoint")
		.attr("cx", function(d) { return x(d.year) })
		.attr("cy", function(d) { return y(d.deathtoll) })
		.attr("r", 3)
		.attr("fill", "white")
		.attr("stroke", "steelblue")
		.attr("stroke-width", 3)
		.call(tip)
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide)


	})  

}) ();

(function () {
	drawPie("data/mydata2005.csv")

d3.select("#year").on("change", function() { 
	d3.select("#pieGraph").selectAll("*").remove() 
	drawPie("data/mydata" + this.value + ".csv", this.value) 
})

function drawPie(filename) {
	
	d3.csv(filename, function(error, data){
	
		var margin = { top: -30, right: 0, bottom: -50, left: -500 }
		var	svgWidth = 250 - margin.left - margin.right
		var svgHeight = 400 - margin.top - margin.bottom
		var radius = Math.min(svgWidth, svgHeight) / 2;

		var color = d3.scale.category20()
	
		var pie = d3.layout.pie().sort(null)
	
		var arc = d3.svg.arc().innerRadius(100).outerRadius(200)

		var dataSet = []  
		var dataLabel = []  
		for(var i = 0; i < data.length; i++) {
			dataSet.push(data[i].percentage)
			dataLabel.push(data[i].age)
		}
	
		console.log(dataSet)

		var pieElements = d3.select("#pieGraph").append("svg")
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
			.delay(function(d, i) { return i * 1000 })
			.ease("linear")
			.attrTween("d", function(d, i) {
				var interpolate = d3.interpolate(
					{ startAngle: d.startAngle, endAngle: d.startAngle },
					{ startAngle: d.startAngle, endAngle: d.endAngle }
				)
				return function(t) { return arc(interpolate(t) )}
			})

		pieElements
		  .append("text")	
		  .attr("class", "pieNum")	
		  .attr("transform", function(d, i){
				return "translate(" + arc.centroid(d) + ")"   
			})
		  .text(function(d, i){
				return d.value + "%" 
				})	
		  .fontcolor("red")
	
	})
	
}

}) ();