/* Define margin of the svg and window */
var margin = {
	top: 40,
	right: 20,
	bottom: 40,
	left: 40
}, 
	width = 960 - margin.left - margin.right,
	height = 540 - margin.top - margin.bottom;

/* Define x and y */
var x = d3.scale.ordinal()
		.rangeRoundBands([0, width], .1, .5);

var y = d3.scale.linear()
		.range([height, 0]);

/* Define x Axis and y Axis */ 
var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")

var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");

/* Create a tooltip for barchart */
var tip = d3.tip()
			.attr("class", "d3-tip")
			.offset([-10, 0])
			.html(function(d) {
				return "<strong>" + d.country + "</strong>: <span style='color:red'>" + d.value + "</span>";
			})
/* Create an svg object */
var svg = d3.select("body").append("svg")
			.attr("width", width+margin.left+margin.right)
			.attr("height", height+margin.top+margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left+ "," + margin.top + ")");

svg.call(tip);

/* Call data */ 
d3.csv("data/oecd.csv", function(error, data) {
	data.forEach(function(d) {
		d.frequency = +d.frequency;
	});

	/* Assign x and y */
	x.domain(data.map(function(d) {return d.country;}));
	y.domain([0, d3.max(data, function(d) { return d.value;})]);

	/* Assign x and y Axes*/ 
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "-0.8em")
			.attr("dy", "-0.15em")
			.attr("transform", "rotate(-18)");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("% GDP (2014)")

	/* Assign bars */
	svg.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) { return x(d.country);})
		.attr("width", x.rangeBand())
		.attr("y", function(d) { return y(d.value);})
		.attr("height", function(d) { return height - y(d.value);})
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide)
	
	d3.select("input").on("change", change);

	var sortTimeout = setTimeout(function() {
		d3.select("input").property("checked", true).each(change);
	}, 2000);

	function change() {
		clearTimeout(sortTimeout);
	
		var x0 = x.domain(data.sort(this.checked
			? function(a, b) { return b.value - a.value; }
			: function(a, b) { return d3.ascending(a.country, b.country); })
			.map(function(d) { return d.country;}))
			.copy();

		svg.selectAll(".bar")
			.sort(function(a, b) { return x0(a.country) - x0(b.country);});

		var transition = svg.transition().duration(750),
			delay = function(d, i) { return i * 50; };

		transition.selectAll(".bar")
			.delay(delay)
			.attr("x", function(d) { return x0(d.country); });

		transition.select(".x.axis")
			.call(xAxis)
			.selectAll("g")
			.delay(delay);
	}
});