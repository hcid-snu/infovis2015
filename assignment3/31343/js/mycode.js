	var margin = {top: 50, right: 50, bottom: 30, left: 40},
    	width = 960 - margin.left - margin.right,
    	height = 500 - margin.top - margin.bottom;

	var formatPercent = d3.format(".0%");

	var x = d3.scale.ordinal()
    	.rangeRoundBands([0, width], .1, 1);

	var y = d3.scale.linear()
    	.range([height, 0]);

	var xAxis = d3.svg.axis()
    	.scale(x)
    	.orient("bottom");

	var yAxis = d3.svg.axis()
    	.scale(y)
    	.orient("left")

	var svgEle = document.getElementById("myGraph")

	var dataSet = []  // empty array to store data
	var dataLabel = []  // empty array to store dataLabel

	var myGraph = d3.select("#myGraph")
					.append("g")
					.attr("transform", "translate(50,30)")

	d3.csv("data/soc_data.csv", function(error, data){
		for(var i = 0; i < data.length; i++) {
			data[i]['2014'] = parseFloat(data[i]['2014'])
			dataSet.push(data[i]['2014'])
			dataLabel.push(data[i].Country)
		}

		x.domain(dataLabel.map(function(d) { return d; }))
	 	y.domain([0, d3.max(dataSet, function(d) { return d; })]);
	
		myGraph.append("g")
	    	.attr("class", "x axis")
	    	.attr("transform", "translate(0," + height + ")")
	    	.call(xAxis)
	    	.selectAll("text")
		    .style("text-anchor", "end")
	        .attr("dx", "-.8em")
        	.attr("dy", ".15em")
        	.attr("transform", "rotate(-65)")

		myGraph.append("g")
		    .attr("class", "y axis")
		    .call(yAxis)
		    .append("text")
		    .attr("transform", "rotate(-90)")
		    .attr("y", 5)
		    .attr("dy", ".71em")
		    .style("text-anchor", "end")
		    .text("Social Expenditure(%)");

		myGraph.selectAll(".bar")
	      .data(data)
	      .enter().append("rect")
	      .attr("class", "bar")
	      .attr("x", function(d) { return x(d.Country); })
	      .attr("width", x.rangeBand())
	      .attr("y", function(d) { return y(d['2014']); })
	      .attr("height", function(d) { return height - y(d['2014']); });

		d3.select("input").on("change", change);

		var sortTimeout = setTimeout(function() {
			d3.select("input").property("checked", true).each(change);}, 500);

		function change() {
			clearTimeout(sortTimeout);

		    var x0 = x.domain(data.sort(this.checked
	        	? function(a, b) { return b['2014'] - a['2014']; }
	        	: function(a, b) { return d3.ascending(a.Country, b.Country); })
	        	.map(function(d) { return d.Country; }))
	        	.copy();

	        myGraph.selectAll(".bar")
	    	    .sort(function(a, b) { return x0(a.Country) - x0(b.Country); });

		    var transition = myGraph.transition().duration(400),
	    	    delay = function(d, i) { return i * 50; };

		    transition.selectAll(".bar")
	    	    .delay(delay)
	        	.attr("x", function(d) { return x0(d.Country); });

		    transition.select(".x.axis")
	    	    .call(xAxis)
	      		.selectAll("g")
	    	    .delay(delay)

	    	myGraph.select(".x.axis")    
		    	.selectAll("text")
			    .style("text-anchor", "end")
		        .attr("dx", "-.8em")
	        	.attr("dy", ".15em")
	        	.attr("transform", "rotate(-65)")

	  	}

	  	myGraph.selectAll(".bar")
 			.on("mouseover", function() { 
				d3.select(this)
					.style("fill", "orange")
			})
			.on("mouseout", function() { 
				d3.select(this)
					.transition()
					.duration(500)
					.style("fill", "#ccc")
			})

		
})

