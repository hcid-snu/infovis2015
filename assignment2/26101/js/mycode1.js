
var margin = {top: 20, right:20, bottom:30, left:40},
	width = 600-margin.left - margin.right,
	height = 700-margin.top - margin.bottom;
var formatPercetn = d3.format(".0%");
var x= d3.scale.ordinal()
	.rangeRoundBands([0,width], .1, 1);
var y= d3.scale.linear()
	.range([height, 0]);
var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");
var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.tickFormat(d3.format(".2f"));
var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
 .append("g")
 	.attr("transform", "translate(" + margin.left + ", " +margin.top + ")");
 	
d3.csv("data/bar_chart_Assign1.csv" function(error,data) {
	data.forEach(function(d) {
		d.value = +d.value;
	});
	
	x.domain(data.map(function(d) {return d.country; }));
	y.domain(0, d3.max(data, function(d) {return d.value; }));
	
	svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);
	svg.selectAll(".bar")
			.data(data)
		.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) {return x(d.country); })
			.attr("width", x.rangeBand())
			.attr("y", function(d) {return y(d.value); })
			.attr("height", function(d) {return height - y(d.value); });
	
	d3.select("input").on("change", change);
	var sortTimeout = setTimeout(function() {
	  d3.select("input").property("checked", true).each(change);
	}, 2000);
	
	function change() {
		clearTimeout(sortTimeout);
		
		var x0 = x.domain(data.sort(this.checked
			? function(a,b) {return b.value - a.value; }
			: function(a,b) {return d3.ascending(a.country, b.country); })
			.map(function(d) {return d.country; }))
			.copy();
		svg.selectAll(".bar")
			.sort(function(a,b) {return x0(a.country) - x0(b.country); });
		var transition = svg.transition().duration(750),
			delay = function(d, i) {return i*50;};
		transition.selectAll(".bar")
			.delay(delay)
			.attr("x", function(d) {return x0(d.country); });
		transition.select(".x.axis")
			.call(xAxis)
		  .selectAll("g")
		  	.delay(delay);
	}
})
	