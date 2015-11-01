var margin = {top: 20, right: 80, bottom: 130, left: 40},
	svgheight = 600 - margin.top - margin.bottom,
	svgwidth = 960 - margin.left - margin.right;
	
var offsetX = 50
var offsetY = 20

var x = d3.scale.ordinal()
	.rangeRoundBands([0, svgwidth], 0.3);

var y = d3.scale.linear()
	.range([svgheight, 0])

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")

var svg = d3.select("#Graph")
	.attr("width", svgwidth + margin.left + margin.right)
	.attr("height", svgheight + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + offsetX + ", " + offsetY + ")")

var tip = d3.tip()
	.attr('class', 'd3-tip')
	.offset([-10, 0])
	.html(function(d) {
		return "<strong>" + d.country + " : </strong>" + d.value
	})

svg.call(tip)

d3.csv("data/assigndata.csv", function(error, data){

	data.pop();

	var barWidth = 20
	var barGap = 9

	x.domain(data.map(function(d) { return d.country; }));
	y.domain([0, d3.max(data, function(d) { return d.value; })]);

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + svgheight + ")")
		.call(xAxis)  
			.selectAll("text")
		    .attr("y", 0)
		    .attr("x", 9)
		    .attr("dy", ".35em")
		    .attr("transform", "rotate(90)")
		    .style("text-anchor", "start");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
			.append("text")
			.attr("y", 3)
			.attr("transform", "rotate(90)")
			.attr("dy", "2.5em")
			.style("text-anchor", "start")
			.text("Value");

	svg.selectAll("rect")
			.data(data)
		.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return x(d.country); }) //function(d, i) {return i * (barWidth + barGap) })
			.attr("y", function(d, i) {return svgheight-10*d.value})
			.attr("width", x.rangeBand())
			.attr("height", function(d, i) {return 10*d.value})
			.on("mouseover",tip.show)
			.on("mouseout",tip.hide)
			
})

