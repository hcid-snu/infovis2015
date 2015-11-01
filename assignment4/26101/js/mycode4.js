var margin = {top:20, right:20, bottom: 30, left:50}
var width = 960 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom

var parseData = d3.time.format("%d-%b-%y").parse

var x = d3.time.scale().range([0, width])
var y = d3.scale.linear().range([height, 0])

var xAxis = d3.svg.axis().scale(x).orient("bottom")
var yAxis = d3.svg.axis().scale(y).orient("left")

var line = d3.svg.line()
	.x(function(d) { return x(d.date) })
	.y(function(d) { return y(d.close )})
	.interpolate("linear")

var svg	= d3.select("#myGraph2").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top+margin.bottom)
	.append("g")		
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

drawLine("practice1.tsv");
d3.select("#age").on("change",function(){
	d3.select("#myGraph2").selectAll("*").remove();
	drawLine("practice"+this.value+".tsv", this.value);
});

function drawLine(filename){
	d3.tsv("practice1.tsv", function(error,data){
		data.forEach(function(d){
			d.date = parseDate(d.date)
			d.close = +d.close
			console.log(d.date)
		})

		x.domain(d3.extent(data, function(d) {return d.date }))
		y.domain(d3.extent(data, function(d) {return d.close}))

		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)

		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("사망자수(명)")

		svg.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("d", line)
	});
}	