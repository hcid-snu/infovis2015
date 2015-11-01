var selected_year = 2005;
var selected_location = [];

d3.select("#year")
	.on("change", function(){
		selected_year = this.value;

	/***** remove previous pie *****/
		if(document.getElementById("outerpie") != null){
			var element = document.getElementById("outerpie");
			element.parentNode.removeChild(document.getElementById("outerpie"));
		}

		if(document.getElementById("innerpie") != null){
			var element = document.getElementById("innerpie");
			element.parentNode.removeChild(document.getElementById("innerpie"));
		}
	/***** reset location Array *****/	
		selected_location = [];

	/****** uncheck checkbox *****/
		var checkboxform = document.forms.myForm;
		
		for (var i = 0 ; i < checkboxform.length ; i++){
			if (checkboxform[i].type == 'checkbox'){
				checkboxform[i].checked = false ; 
			}
		}
	})

function Clicked(source){
	if (source.checked == true) {selected_location.push(source.value);}
	else {
		var i = selected_location.indexOf(source.value)
		if (i != -1) {selected_location.splice(i, 1);}
	}

	d3.csv("data.csv", function(data){

		var year_data = [];
		var yearlocation_data = [];

		var died_dataset = [];
		var injured_dataset= [];
		var died_dataset_line = [];

	/***** year classifier *****/
		for( var i = 0 ; i < data.length ; i++) {
			if (parseFloat(data[i]['year']) == selected_year ){
				year_data.push(data[i]);
			}
		}

	/***** location classifier *****/
		for ( var i = 0 ; i < year_data.length ; i++ ) {
			for (var j = 0 ; j < selected_location.length ; j ++) {
				if (year_data[i]['location'] == selected_location[j] ){
					yearlocation_data.push(year_data[i]);
				}
			}
		}

	/***** type classifier *****/	
		for ( var i = 0 ; i < yearlocation_data.length ; i++) {
			var d = new Object();

			d['location'] = yearlocation_data[i]['location'];
			d['value'] = parseFloat(yearlocation_data[i]['total'])

			if (yearlocation_data[i]["type"] == "died") { 
				died_dataset.push(d); 
			} else { 
				injured_dataset.push(d); 
			}
		 }

	/***** create pie *****/

		var svgEle = document.getElementById("myGraph");
		var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
		var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
		svgWidth = parseFloat(svgWidth);
		svgHeight = parseFloat(svgHeight);

		var pie = d3.layout.pie().sort(null).value(function(d) { return d.value; });

		var died_arc = d3.svg.arc().innerRadius(svgHeight/4).outerRadius(svgHeight/2);
		var injured_arc = d3.svg.arc().innerRadius(0).outerRadius(svgHeight/4);
		
		var color = d3.scale.category20();

	/***** remove previous pie *****/
		if(document.getElementById("outerpie") != null){
			var element = document.getElementById("outerpie");
			element.parentNode.removeChild(document.getElementById("outerpie"));
		}

		if(document.getElementById("innerpie") != null){
			var element = document.getElementById("innerpie");
			element.parentNode.removeChild(document.getElementById("innerpie"));
		}

   /***** outerpie *****/
    	var pieElement1 = d3.select("#myGraph")
    						.append("g")
    						.attr("id","outerpie")
    						.attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")");
    	
    	var g = pieElement1.selectAll(".arc")
    				.data(pie(died_dataset))
    				.enter()
    				.append("g")
    				.attr("class","arc");


    	g.append("path")
    		.attr("d",died_arc)
    		.style("fill",function(d, i) { return color(i); });

    	g.append("text")
			.attr("transform", function(d) { return "translate(" + died_arc.centroid(d) + ")"; })
			.attr("dy", ".35em")
			.style("text-anchor", "middle")
			.text(function(d,i) { return d.data.location + " : " + d.data.value; });

	/***** inner pie *****/
    	var pieElement2 = d3.select("#myGraph")
    						.append("g")
    						.attr("id", "innerpie")
    						.attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")");

    	var g = pieElement2.selectAll(".arc")
    					.data(pie(injured_dataset))
    					.enter()
    					.append("g")
    					.attr("class", "arc");

    	g.append("path")
    		.attr("d", injured_arc)
    		.style("fill", function(d, i) { return color(i); });

    	g.append("text")
			.attr("transform", function(d) { return "translate(" + injured_arc.centroid(d) + ")"; })
			.attr("dy", ".35em")
			.style("text-anchor", "middle")
			.text(function(d) { return d.data.location + " : " + d.data.value; });

	/***** line chart *****/
		if(document.getElementById("linegraph") != null){
			var element = document.getElementById("linegraph");
			element.parentNode.removeChild(document.getElementById("linegraph"));
		}

		var margin = {top : 20 , right : 20 , bottom : 30 , left : 50},
		    width = 960 - margin.left - margin.right,
		    height = 500 - margin.top - margin.bottom;

		var parseDate = d3.time.format("%Y").parse;

		var x = d3.time.scale()
		    .range([0, width]);

		var y = d3.scale.linear()
		    .range([height, 0]);

		var color = d3.scale.category10();

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom");

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left");

		var line = d3.svg.line()
		    .interpolate("basis")
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d.total); });

		var svg = d3.select("body").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
			.attr("id","linegraph")
		  	.append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		d3.csv("data2.csv", function(error, data) {
			  if (error) throw error;

			  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));

			  data.forEach(function(d) {
			    d.year = parseDate(d.year);
			  });

			  var cities = color.domain().map(function(name) {
			    return {
			      name: name,
			      values: data.map(function(d) {
			        return {year: d.year, total: +d[name]};
			      })
			    };
			  });

			  x.domain(d3.extent(data, function(d) { return d.year; }));

			  y.domain([
			    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.total; }); }),
			    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.total; }); })
			  ]);

			  svg.append("g")
			      .attr("class", "x axis")
			      .attr("transform", "translate(0," + height + ")")
			      .call(xAxis);

			  svg.append("g")
			      .attr("class", "y axis")
			      .call(yAxis)
			    .append("text")
			      .attr("transform", "rotate(-90)")
			      .attr("y", 6)
			      .attr("dy", ".71em")
			      .style("text-anchor", "end")
			      .text("총 사망자 (명)");

			  var city = svg.selectAll(".city")
			      .data(cities)
			    .enter().append("g")
			      .attr("class", "city");

			  city.append("path")
			      .attr("class", "line")
			      .attr("d", function(d) { return line(d.values); })
			      .style("stroke", function(d) { return color(d.name); });

			  city.append("text")
			      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
			      .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.total) + ")"; })
			      .attr("x", 3)
			      .attr("dy", ".35em")
			      .text(function(d) { return d.name; });
		});


	})
};