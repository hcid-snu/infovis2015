var margin = {top: 40, right: 30, bottom: 97, left: 40},
    width = 950 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// x axis scale
var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .15);

// y axis scale
	var y0 = d3.scale.linear()
		  		.domain([0, 30])
		  		.range([height, 0]),
	    y1 = d3.scale.linear().
		  		domain([0, 30])
		  		.range([height, 0]);

//create xAxis
	var xAxis = d3.svg.axis()
    					.scale(x)
    					.orient("bottom");

// create left yAxis
	var yAxisLeft = d3.svg.axis()
							.scale(y0)
							.ticks(10)
							.orient("left");
// create right yAxis
	var yAxisRight = d3.svg.axis()
							.scale(y0)
							.ticks(10)
							.orient("right");

// create svg
var svg = d3.select("body")
			.append("svg")
    		  .attr("width", width + margin.left + margin.right)
    		  .attr("height", height + margin.top + margin.bottom)
    		.append("g")
    		  .attr("class", "graph")
    		  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			;

//call csv data
d3.csv("data/mydata.csv", type, function(error, data) {
  				x.domain(data.map(function(d) { return d.country; }));
  			  	y0.domain([0, d3.max(data, function(d) { return d.value1; })]);
 
//draw x axis and axis label(countries)
	svg.append("g")
         .attr("class", "x axis")
     	 .attr("transform", "translate(0," + height + ")")
	     .call(xAxis)
	   .selectAll("text")
   	     .style("text-anchor", "end")
   	     .attr("dx", "-.8em")
   	     .attr("dy", "-.55em")
   	     .attr("transform", "rotate(-90)" );
		
//draw left yaxis and axis label (Ratio(%))
	  svg.append("g")
           .attr("class", "y axis axisLeft")
           .call(yAxisLeft)
         .append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 6)
           .attr("dy", ".71em")
           .style("text-anchor", "end")
           .text("Ratio (%)");	  
//draw left yaxis and axis label (2014)	
	  svg.append("g")
	       .attr("class", "y axis axisLeft")
	       .attr("transform", "translate(0,0)")
 		  //.attr("transform", "translate(" + margin.left + ", " + ((height - 300) - margin.top) + ")")
	       .call(yAxisLeft)
	     .append("text")
	       .attr("y", 5)
	       .attr("dy", "-1em")
	       .attr("dx", "1em")
	       .style("text-anchor", "end")
	       .style("text-anchor", "end")
	       .text("2014")
          ;

//draw right yaxis and axis label (Ratio(%))
	  svg.append("g")
           .attr("class", "y axis axisRight")
		   .attr("transform", "translate(" + (width) + ",0)")
           .call(yAxisRight)
         .append("text")
           .attr("transform", "rotate(-90)")
	       .attr("y", 5)
	       .attr("dy", "-1em")
	       .attr("dx", "-.2em")
	       .style("text-anchor", "end")
           .text("Ratio (%)");	
//draw right yaxis and axis label (1984)
	  svg.append("g")
	 	   .attr("class", "y axis axisRight")
	  	   .attr("transform", "translate(" + (width) + ",0)")
	  	   .call(yAxisRight)
		 .append("text")
	  	   .attr("y", 6)
	  	   .attr("dy", "-1em")
	  	   .attr("dx", "1em")
	  	   .style("text-anchor", "end")
	  	   .text("1984");
	  
	  
//bring data to draw bars
    bars = svg.selectAll(".bar").data(data).enter();

//bring value1(2014 data) and draw bars
 	bars.append("rect")
      	  .attr("class", "bar1")
      	  .attr("x", function(d) { return x(d.country); })
      	  .attr("width", x.rangeBand())
      	  .attr("y", function(d) { return y0(d.value1); })
	  	  .attr("height", function(d,i,j) { return height - y0(d.value1); })
	  	.on("mouseover", function() { 
		  		d3.select(this)
					.style("fill", "#008080")
	 	 			.transition()
	  				.delay(function(d, i) { return i * 500 })
	  				.duration(1000)
      				.attr("y", function(d) { return y0(d.value2); })
	 	 			.attr("height", function(d,i,j) { return height - y0(d.value2); })
				 
	  								})
	    .on("mouseout", function() { 
		  		d3.select(this)
					.transition()
					.duration(500)
					.style("fill", "#800000")
      	  			.attr("y", function(d) { return y0(d.value1); })
	  	  			.attr("height", function(d,i,j) { return height - y0(d.value1); })
	  								})
		; 
		
//bring value1(1984 data) and draw bars  
 /* bars.append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x(d.country) + x.rangeBand()/2; })
      .attr("width", x.rangeBand() / 2)
      .attr("y", function(d) { return y1(d.value2); })
	  .attr("height", function(d,i,j) { return height - y1(d.value2); }); 
  */

//Write text   
  bars.append("text")
	    .attr("class","barNum")
        .attr("y", function(d,i,j) { return y0(d.value1 + .3 ); })
        .attr("x", function(d,i,j ) { return x(d.country); })
        .text(function(d,i,j) { return Math.round(d.value1)+"%" })//Math.round(y0(d.value1)); })
	    .attr("dx", "1.17em")	
		;
	 // .text(function(d){return y0(d.value1)});
				    bars.append("text")
	    			.attr("class","barNum1")
        			.attr("y", 250)//function(d,i,j) { return y0(d.value1 + - 5); })
      	  			.attr("x", function(d,i,j ) { return x(d.country); })
        			.text(function(d,i,j) { return Math.round(d.value2) + "%"})
	   	 			.attr("dx", "1.17em")	 
		//.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		//.attr("y", function(d, i) { return svgHeight - d * 7.5- 5 })
	  
});
function type(d) {
  d.value1 = +d.value1;
  return d;

}










