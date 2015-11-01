(function() {
// Set the dimensions of the canvas / graph
var margin = {top: 50, right: 150, bottom: 80, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom
   

var color = d3.scale.category20();

var maketip = function (d) {			               
			  var tip = '<p class="tip2">'+ d.year +'년'+
			  '</p> <p class="tip2">' + d.name+ '구' + '의' + 
			  '</p> <p class = "tip3">' + '교통사고 사망자'  + 
			  '<p class="tip1">' + d.value + '명' + '</p> <br>';
      		   return tip;}
    		   
// Adds the svg canvas
var svg = d3.select("#graphic")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
//make a rectangle so there is something to click on              
svg.append("svg:rect")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "plot");

var clip = svg.append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height);   
    
var menu = d3.select("#menu select")
    .on("change", change);  

    
    
d3.csv("data/death1.csv", function (data) {
    // for object constancy we will need to set "keys", one for each type of data (column name) exclude all others.
	var labelVar = 'year'
	var gooNames = d3.keys(data[0]).filter(function (key) {return key !== labelVar})
	
	color.domain(gooNames);

	var linedata = color.domain().map(function(name) {
    				return {name: name,
					        values: data.map(function(d) {
							return {name: name, year: d["year"], value: +d[name]};
      						})
    				};
  	});
  	
  	console.log(linedata)
  	//make an empty variable to stash the last values into so i can sort the legend
var lastvalues=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]; 


// Set the ranges
var x = d3.scale.linear()
		.domain([
	    2004.9,
	    2014.1
		])
		.range([0, width]);

var y = d3.scale.linear()
	    .domain([0,
	    d3.max(linedata, function(c) { return d3.max(c.values, function(v) { return v.value; })+5; })
	    ])
	    .range([height, 0])

var line = d3.svg.line()
    	.x(function(d) { return x(d.year); })
	    .y(function(d) { return y(d.value); });


//define the zoom
// var zoom = d3.behavior.zoom()
    	// .x(x)
	    // .y(y)
	    // .scaleExtent([1,8])
    	// .on("zoom", zoomed);

// //call the zoom on the SVG
// svg.call(zoom);

//create and draw the x axis
	var xAxis = d3.svg.axis()
    			.scale(x)
	    		.orient("bottom")
    			.tickPadding(8)
	    		.ticks(10)
	    		.tickFormat(d3.format("d"))
    
    svg.append("svg:g")
	    .attr("class", "x axis");

	//create and draw the y axis                  
	var yAxis = d3.svg.axis()
    	.scale(y)
	    .orient("left")
    	.tickSize(0-width)
	    .tickPadding(8);
    
    svg.append("svg:g")
    	.attr("class", "y axis");

	//bind the data
	var thegraph = svg.selectAll(".thegraph")
    	.data(linedata)
    	
  	//append a g tag for each line and set of tooltip circles and give it a unique ID based on the column name of the data     
	var thegraphEnter=thegraph.enter().append("g")
  		.attr("clip-path", "url(#clip)")
	    .attr("class", "thegraph")
      	.attr('id',function(d){ return d.name+"-line"; })
	  	.style("stroke-width",2.5)
	  	.on("mouseover", function (d) {                                  
      		d3.select(this)                          //on mouseover of each line, give it a nice thick stroke
        	.style("stroke-width",'6px');
        	
        	var selectthegraphs = $('.thegraph').not(this);     //select all the rest of the lines, except the one you are hovering on and drop their opacity
        	d3.selectAll(selectthegraphs)
        		.style("opacity",0.2);
        	
        	var getname = document.getElementById(d.name);    //use get element cause the ID names have spaces in them
        	var selectlegend = $('.legend').not(getname);    //grab all the legend items that match the line you are on, except the one you are hovering on

        	d3.selectAll(selectlegend)    // drop opacity on other legend names
        		.style("opacity",1);

        	d3.select(getname)
        		.attr("class", "legend-select");  //change the class on the legend name that corresponds to hovered line to be bolder        	
    	})
    		.on("mouseout",	function(d) {        //undo everything on the mouseout
      		d3.select(this)
        		.style("stroke-width",'2.5px');
        	
        	var selectthegraphs = $('.thegraph').not(this);
        	d3.selectAll(selectthegraphs)
        		.style("opacity",1);
        	
        	var getname = document.getElementById(d.name);
        	var getname2= $('.legend[fakeclass="fakelegend"]')
        	var selectlegend = $('.legend').not(getname2).not(getname);

        	d3.selectAll(selectlegend)
        		.style("opacity",1);
        	
        	d3.select(getname)
        		.attr("class", "legend");        	
    	});

	//actually append the line to the graph
	thegraphEnter.append("path")
    	.attr("class", "line")
      	.style("stroke", function(d) { return color(d.name); })
      	.attr("d", function(d) { return line(d.values[0]); })
      	.transition()
      	.duration(500)
      	.attrTween('d',function (d){
			var interpolate = d3.scale.quantile()
				.domain([0,1])
				.range(d3.range(1, d.values.length+1));
			return function(t){
				return line(d.values.slice(0, interpolate(t)));
			};
		});
  
	//then append some circles at each data point  
	thegraph.selectAll("circle")
		.data( function(d) {return(d.values);} )
		.enter()
		.append("circle")
			.attr("class","tipcircle")
			.attr("cx", function(d,i){return x(d.year)})
			.attr("cy", function(d,i){return y(d.value)})
			.attr("r",2.5)
			.style("fill", "white")
			.style("stroke", function(d) { 
          	return color(d.name)})
          	.style("stroke-width", "0.5px")
			.style('opacity', 1)
			.attr ("title", maketip)
			// .on("mouseover", function() {
		    // // d3.select("tipcircle").style("opacity", 1)
		    // div.transition()
        	// .duration(500)
        	// .style("opacity", 0.7);
        	// })
		    // .on("mouseout", function() {
		    // div.transition()
      		// .duration(500)
      		// .style("opacity", 1e-6);
		    // })
		    // .on("mousemove", function() {
		    // div
      		// .style("left", (d3.event.pageX - 34) + "px")
      		// .style("top", (d3.event.pageY - 12) + "px")
//       		
//         	
		    // })
	

	

	//append the legend
    var legend = svg.selectAll('.legend')
        .data(linedata);

    var legendEnter=legend
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('id',function(d){ return d.name; })
        .on('click', function (d) {                           //onclick function to toggle off the lines        	
        	if($(this).css("opacity") == 1){				  //uses the opacity of the item clicked on to determine whether to turn the line on or off        	

	        	var elemented = document.getElementById(this.id +"-line");   //grab the line that has the same ID as this point along w/ "-line"  use get element cause ID has spaces
	        	d3.select(elemented)
	        		.transition()
	        		.duration(1000)
	        		.style("opacity",0)
	       			.style("display",'none');
        	
	        	d3.select(this)
	        		.attr('fakeclass', 'fakelegend')
	     			.transition()
	        		.duration(1000)
	      			.style ("opacity", 0.2);
      		} else {
      		
	      		var elemented = document.getElementById(this.id +"-line");
	        	d3.select(elemented)
		        	.style("display", "block")
		        	.transition()
	    	    	.duration(1000)
	        		.style("opacity",1);
        	
	        	d3.select(this)
	        		.attr('fakeclass','legend')
	      			.transition()
	        		.duration(1000)
	      			.style ("opacity", 1);}
		});

	//create a scale to pass the legend items through
	var legendscale = d3.scale.ordinal()
				.domain(1)
				.rangeRoundPoints([0, 300]);

	//actually add the circles to the created legend container
    legendEnter.append('circle')
        .attr('cx', width +20)
        .attr('cy', function(d, i) { return i*20})
        .attr('r', 7)
        .style('fill', function(d) { 
          	return color(d.name);
        });
        	        	
	//add the legend text
    legendEnter.append('text')
        .attr('x', width+35)
        .attr('y', function(d, i) { return i*20})
        .text(function(d){ return d.name; });

 	// set variable for updating visualization
    var thegraphUpdate = d3.transition(thegraph);
    
    // change values of path and then the circles to those of the new series
    thegraphUpdate.select("path")
    	.attr("d", function(d, i) {       
      
      		//must be a better place to put this, but this works for now
      		lastvalues[i]=d.values[d.values.length-1].value;         
        	lastvalues.sort(function (a,b){return b-a});
      		legendscale.domain(lastvalues);
      	
      		return line(d.values); });
      
    thegraphUpdate.selectAll("circle")
	  	.attr ("title", maketip)
	  	.attr("cy",function(d,i){return y(d.value)})
	  	.attr("cx", function(d,i){return x(d.year)});


	  // and now for legend items
	  var legendUpdate=d3.transition(legend);
	  
	legendUpdate.select("circle")
		.attr('cy', function(d, i){  
			return i*25});

	legendUpdate.select("text")
		.attr('y',  function (d,i)
		{ return i*25;});


 	 // update the axes,   
    d3.transition(svg).select(".y.axis")
    	.call(yAxis);   
          
    d3.transition(svg).select(".x.axis")
    	.attr("transform", "translate(0," + height + ")")
        .call(xAxis);

	//make my tooltips work
	$('circle').tipsy({opacity:.9, gravity:'n', html:true});


	//define the zoom function
	// function zoomed() {
//  
    	// svg.select(".x.axis").call(xAxis);
    	// svg.select(".y.axis").call(yAxis);
// 
		// svg.selectAll(".tipcircle")
			// .attr("cx", function(d,i){return x(d.year)})
			// .attr("cy",function(d,i){return y(d.value)});
// 			
		// svg.selectAll(".line")
    		// .attr("class","line")
        	// .attr("d", function (d) { return line(d.values)});
	// }

      	
	
});

d3.select(window)
    .on("keydown", function() { altKey = d3.event.altKey; })
    .on("keyup", function() { altKey = false; });
var altKey;

// set terms of transition that will take place
// when a new economic indicator is chosen   
function change() {
  d3.transition()
      .duration(altKey ? 7500 : 1500)
      .each(redraw);
}

svg.append("svg:text")
.attr("text-anchor", "start")
	.attr ("x", 0-margin.left)
	.attr("y", height+margin.bottom-10)
	.attr ("class","source"); 
})();

(function() {
var width = 200
	height = 200
	radius = Math.min(width, height) / 2;
	
var color = d3.scale.category20();

var arc = d3.svg.arc()
			.outerRadius(radius)
			.innerRadius(radius-50);
			
var outerArc = d3.svg.arc()
	.innerRadius(radius * 0.6)
	.outerRadius(radius * 0.6);			
			
var pie = d3.layout.pie()
			.value(function(d) { return d.death; })
			
		
			
d3.csv("data/death1.csv", function(error, data) {
	if (error) throw error;
	
	color.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));
	
	data.forEach(function(d) {
    d.goos = color.domain().map(function(name) {
      return {name: name, death: +d[name]};
  	  });
  	});
  	
  	var svg = d3.select("#pieGraphic")
  	.append("svg")
  	.attr("width", 1200)
  	.attr("height", 600)
  	.append("g")
  	
  	var pies = svg.selectAll(".pie")
  		.data(data)
  		console.log(data)
	
  	var pieEnter = pies.enter().append("g")
 			.attr("class", "pie")
  			.attr("width", radius*2)
  			.attr("height", radius * 2 + 20)
  			.attr('id', function(d) { return d.year+"-pie"})
  			.attr("transform", function (d, i) {
  				if (i > 4) {
  				return "translate(" + (210*(i-1)-740) + "," + 310 + ")"}
  				else {
  				return "translate(" + (210*(i-1)+310) + "," + 100 + ")"
  				}
  				});
  	
  	pies.selectAll(".arc")
      .data(function(d) { return pie(d.goos); })
    .enter().append("path")
      .attr("class", "arc")
      // .attr("d", arc)
      .transition()
		.duration(2500)
		.delay(function(d, i) {
			return i * 0
		})
		.ease("bounce")
	  .attrTween("d", function(d, i) {
	  		var interpolate = d3.interpolate(
 				{ startAngle: d.startAngle,
 				endAngle: d.startAngle },
 				{ startAngle: d.startAngle,
 				endAngle: d.endAngle }
 				)
 				 return function(t) {
 					return arc(interpolate(t) )}
 				})			 
      .style("fill", function(d) { return color(d.data.name); });

  	pies.append("text")
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .html(function(d) { return d.year + "년"; });
    
    function midAngle(d){
		return d.startAngle + (d.endAngle - d.startAngle)/2;
	}
    
	var text = pies.selectAll(".text")
      .data(function(d) { return pie(d.goos); })
      
    text.enter().append("text")
      .attr("d", "text")
      .attr("dy", ".35em")
      .transition().duration(2000)
      .attr("transform", function(d) { 
      	d.innerRadius = height/2
      	d.outerRadius = height/2
      	return "translate(" + arc.centroid(d)+ ")";})
      	.attr("text-anchor", "middle")
      	.style("fill", "white")
      	.text(function (d) {
      		return d.data.death
      		})
      	
      	
   var legend = svg.append("svg")
  		.attr("class", "legend")
  		.attr("width", 120)
  		.attr("height", 300)
  		.attr("transform", "translate(1080," + 50 + ")")
  	.selectAll("g")
  		.data(color.domain().slice())
  	.enter().append("g")
  		.attr("transform", function (d, i) { return "translate(0," + i * 20 + ")";});
  		
  	legend.append("rect")
  		.attr("width", 10)
  		.attr("height", 10)
  		.style("fill", color);
  	
  	legend.append("text")
  		.attr("x", 18)
  		.attr("y", 5)
  		.attr("dy", ".35em")
  		.text(function(d) { return d; });   	
     // text.transition().duration(1000)
		// .attrTween("transform", function(d) {
			// this._current = this._current || d;
			// var interpolate = d3.interpolate(this._current, d);
			// this._current = interpolate(0);
			// return function(t) {
				// var d2 = interpolate(t);
				// var pos = outerArc.centroid(d2);
				// pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
				// return "translate("+ pos +")";
			// };
		// })
		// .styleTween("text-anchor", function(d){
			// this._current = this._current || d;
			// var interpolate = d3.interpolate(this._current, d);
			// this._current = interpolate(0);
			// return function(t) {
				// var d2 = interpolate(t);
				// return midAngle(d2) < Math.PI ? "start":"end";
			// };
		// });
// 		
		// text.exit()
			// .remove();
	
      	
      });         

			
	
// var div = d3.select("body").append("div")
	// .attr("class", "tooltip")
    // .attr("id", "pie-tip")
    // .style("opacity", 1e-6);   
//     
// var donutWidth = 75;
// var arc = d3.svg.arc()
			// .innerRadius(radius - donutWidth)
			// .outerRadius(radius)
// 			
// 
// 			
			// var pieSvg = d3.select("#pie-tip")
			// .append("svg")
      		// .attr("width", 300)
      		// .attr("height", 300)
      		// .append("g")
      		// .attr("transform", "translate(" + 300 / 2 + "," + height / 2 + ")")
//       		
//       			    
// var pie = d3.layout.pie()
			// .sort(null)
			// .value(function (d) { return d.value })
			// console.log(pie)	    
  	// var piedata = color.domain().map(function(name) {
    				// return {name: name,
					        // values: data.map(function(d) {
							// return {name: name, year: d["year"], value: +d[name]};
      						// })
    				// };
  	// });
//   	
  		// var g = pieSvg.selectAll(".arc")
      		// .data(pie(linedata)) 
//       		
//       		
      		// var gEnter = g.enter().append("g")
      		// .attr("class", "arc")
      		// .attr('id',function(d){ return d.name+"-pie"; })
//       		
      		// gEnter.append("path")
      		// .attr("class", "pie")
      		// .style("stroke", function(d) { return color(d.name); })
      		// .attr("d", function(d) { return d.value; })
      		// .style("fill", function(d) { 
          	// return color(d.name);
        	// })
        })();


