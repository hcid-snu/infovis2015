
getVal('1980');

function getVal(value) {
	d3.csv("data.csv", function(data){

			var dataset = [];
			for(var i = 0 ; i < data.length-1 ; i ++){
				if (data[i][value]!=".." && data[i][value]!="0"){
					var tmp = [];
					tmp.push(data[i]["country"])
					tmp.push(data[i][value])
					dataset.push(tmp)
				}
			}

			var extract_val = function(data){
				var value = [];

				for(var i = 0 ; i < data.length ; i++){
					value.push(parseFloat(data[i][1]));
				}
				return value;
			}

			var w = 800;
			var h = 400;

			console.log(extract_val(dataset))

			var xScale = d3.scale.ordinal()
							.domain(d3.range(dataset.length))
							.rangeRoundBands([0, w], 0.05);

			var yScale = d3.scale.linear()
							.domain([0, d3.max(extract_val(dataset))])
							.range([0, h]);



			var svg = d3.select("svg")
						.attr("width", w)
						.attr("height", h);

			svg.selectAll("rect").remove();

			var tooltip = function(d) {
								var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
								var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

								d3.select("#tooltip")
									.style("left", xPosition + "px")
									.style("top", yPosition + "px")			
									.select("#value")
									.text(d);
						   
								d3.select("#tooltip").classed("hidden", false);
						   }

			var untooltip = function() {
								d3.select("#tooltip").classed("hidden", true);
						   }


			svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) { return xScale(i);})
			   .attr("y", function(d, i) { return h - yScale(dataset[i][1]);})
			   .attr("width", xScale.rangeBand() )
			   .attr("height", function(d, i) { return yScale(dataset[i][1]); })
			   .attr("fill", function(d, i) { return "rgb(" + (dataset[i][1] * 10) + ", 0, " + (dataset[i][1] * 10) + ")"; })
			   .on("mouseover", tooltip )
			   .on("mouseout", untooltip )
			   .on("click", function() { sortBars(); }) ;



			var sortOrder = false;

			var sortBars = function() {

			   	sortOrder = !sortOrder;

				svg.selectAll("rect")
				   .sort(function(a, b) {
				   		if (sortOrder) {
					   		return d3.ascending(parseFloat(a[1]), parseFloat(b[1]));
				   		} else {
					   		return d3.descending(parseFloat(a[1]), parseFloat(b[1]));
				   		}
				   	})
				   .transition()
				   .delay(function(d, i) {
					   return i * 50;
				   })
				   .duration(1000)
				   .attr("x", function(d, i) {
				   		return xScale(i);
			});

		}
	})
};



	