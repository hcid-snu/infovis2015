

var margin = { top: 50, right: 0, bottom: 100, left: 50 },
    width = 1200 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    gridSize = Math.floor(width / 38),
    legendElementWidth = gridSize*2,
    buckets = 9,
    colors = ["#B03A2E","#CB4335","#F1C40F","#F4D03F","#28B463", "#229954"],
    days = ["12-13", "13-14", "14-15", "15-16"],
    times = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", 
			 "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38"];
    datasets = ["data/data1.tsv"]

var svg = d3.select("#allmatches").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
         
var dayLabels = svg.selectAll(".dayLabel")
    .data(days)
    .enter().append("text")
    .text(function (d) { return d })
    .attr("x", 0)
    .attr("y", function (d, i) { return i * gridSize*1.5 +2 })
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
    .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis") })
         
var timeLabels = svg.selectAll(".timeLabel")
    .data(times)
    .enter().append("text")
    .text(function(d) { return d; })
    .attr("x", function(d, i) { return i * gridSize; })
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + gridSize / 2 + ", -6)")
    .attr("class", function(d, i) { return ((i >= 19 && i <= 38) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis") })
 

			         
var heatmapChart = function(tsvFile) {
  d3.tsv(tsvFile, function(d) {
    			return {
      			  		season: +d.season,
      			  		match: +d.match,
      			  		value: +d.value,			 
						venue: d.venue, 			 
						opponent: d.opponent, 			 
						score: d.score, 			
		 		   		result: d.result
    					}
 				   },  
			     function(error, data) {
			     		var colorScale = d3.scale.quantile()
			   		 							.domain([-2,3])
			        	 						.range(colors)
		 		
		 			 	var cards = svg.selectAll(".hour")
			         					.data(data, function(d) { return d.season+':'+d.match })
			
			     cards.append("title")
         
			     cards.enter().append("rect")
			         .attr("x", function(d) { return (d.match - 1) * gridSize })
			         .attr("y", function(d) { return (d.season - 1) * gridSize *1.5})
			         .attr("rx", 4)
			         .attr("ry", 4)
			         .attr("class", "hour bordered")
			         .attr("width", gridSize)
			         .attr("height", gridSize*1.5)
			         .style("fill", colors[0])
		 		     .on("mouseover", function(d) {
		 		     			d3.select(this)
		 		       				.style("stroke","#424949")
		 		       				.attr("stroke-width",3)
		 					 	this.parentNode.appendChild(this); 
		 				 svg.append("text")
		 				     .attr("id","tooltip")
		 				     .attr("x",35)
		 				     .attr("y",220)
							 .attr("class",d.result == "W" ? "result_text_1" : ((d.result =="D") ? "result_text_2" : "result_text_3"))
		 				     .attr("text-anchor", "middle")
		 				     .attr("font-family", "sans-serif")
		 				     .attr("font-size", "12px")
		 				     .text(d.result)
		 				 svg.append("text")
		 				     .attr("id","tooltip")
		 				     .attr("x",35)
		 				     .attr("y",250)
		 				     .attr("class","venue_text")
		 				     .attr("text-anchor", "middle")
		 				     .attr("font-family", "sans-serif")
		 				     .attr("font-size", "12px")
		 				     .text(d.venue)
		 				 svg.append("text")
		 				     .attr("id","tooltip")
		 				     .attr("x",10)
		 				     .attr("y",300)
						     .attr("class","score_text")
		 				     .attr("text-anchor", "start")
		 				     .attr("font-family", "sans-serif")
		 				     .attr("font-size", "12px")
		 				     .text(d.opponent+" "+" " + d.score);
		 		   }) 
				   .on("mouseout", function() {
		 			       d3.select("#tooltip").remove();
		 				   d3.select("#tooltip").remove();
		 				   d3.select("#tooltip").remove();
		 			       
		 				   d3.select(this)
		 		       				.style("stroke","#E6E6E6")
		 		       				.attr("stroke-width",2)
		 			   })
					   
		  		/*******************************************************************************/
				/*********************************CHANGE START**********************************/
				/*******************************************************************************/   
				/*	   
		  			 d3.select("#matches").on("change",function(){
					   
		  			 d3.select(this)
						 
		  				 if (this.value == "HOME MATCHES ONLY")				 
		  				 {	 
						     d3.tsv("data/data1.tsv", function(error,data) {
						     	var venue = data.forEach(function(d) { return d.venue = d.venue;})
								
								 
						
							 if (venue == "HOME")
								 {
									 console.log(venue)
									 var homecolor = function(d) { return colorScale(d.value)}
								 }
								 else 
								 {
									 console.log(venue)
									 var homecolor = "#E6E6E6"
								  }
							  
							 
							  console.log(homecolor)  
					     cards.style("fill",homecolor)
								    console.log(function(d){return (d.venue)})
							  
							  })
						  }
		  					 else if (this.value == "AWAY MATCHES ONLY")
		  				{		 

					     d3.tsv("data/data1.tsv", function(error,data) {
					     	var venue = data.forEach(function(d) { return d.venue = d.venue;})
							
							 
					
						 if (venue == "AWAY")
							 {
								 console.log(venue)
								 var awaycolor = function(d) { return colorScale(d.value)}
							 }
							 else 
							 {
								 console.log(venue)
								 var awaycolor = "#E6E6E6"
							  }
						  
						 
						  console.log(awaycolor)  
				     cards.style("fill",awaycolor)
							    console.log(function(d){return (d.venue)})
						  
						  })
		  				}
						else if (this.value == "ALL MATCHES")
							 cards.style("fill",function(d) { return colorScale(d.value) })
				   
					
			});
					   */
		  		/*******************************************************************************/
				/**********************************CHANGE END***********************************/
				/*******************************************************************************/           
              
			     cards.transition().duration(500)
					   .style("fill", function(d) { return colorScale(d.value) })
         
			     cards.select("title").text(function(d) { return d.value })
         
			     cards.exit().remove()
         
		  		/*******************************************************************************/
				/*********************************LEGEND START**********************************/
				/*******************************************************************************/
			
			     var legend = svg.selectAll(".legend")
			         .data([0].concat(colorScale.quantiles()), function(d) { return d })
         
			     legend.enter().append("g")
			         .attr("class", "legend")
         
			     legend.append("rect")
			       .attr("x", function(d, i) { return legendElementWidth * i })
			       .attr("y", height)
			       .attr("width", legendElementWidth)
			       .attr("height", gridSize / 2)
			       .style("fill", function(d, i) { return colors[i] })
         
		 		/**********************************LEGEND TEXT START***********************************/

			     svg.append("text")
				    .attr("class","mono2")
					.text("'HOME LOSE'")// + " "  + " 'AWAY LOSE'" + " " + "'HOME DRAW'" + " " + "'HOME LOSE'" + " " + "'HOME WIN'" + "  " + "'AWAY WIN'")
			        .attr("x", function(d, i) { return (legendElementWidth+20) * (i) })
			        .attr("y", height + gridSize)
				    .attr("text-anchor", "start")	   
					
			     svg.append("text")
				    .attr("class","mono2")
					.text("'AWAY LOSE'")// + " " + "'HOME DRAW'" + " " + "'HOME LOSE'" + " " + "'HOME WIN'" + "  " + "'AWAY WIN'")
			        .attr("x", function(d, i) { return (legendElementWidth+20) * (i) + 62 })
			        .attr("y", height + gridSize)
				    .attr("text-anchor", "start")		
			     
				 svg.append("text")
				    .attr("class","mono2")
					.text("'HOME DRAW'")//+ " " + "'HOME LOSE'" + " " + "'HOME WIN'" + "  " + "'AWAY WIN'")
			        .attr("x", function(d, i) { return (legendElementWidth+20) * (i) + 121 })
			        .attr("y", height + gridSize)
				    .attr("text-anchor", "start")	
				    .attr("text-anchor", "start")		
			     
				 svg.append("text")
				    .attr("class","mono2")
					.text("'HOME LOSE'")// + " " + "'HOME WIN'" + "  " + "'AWAY WIN'")
			        .attr("x", function(d, i) { return (legendElementWidth+20) * (i) + 184 })
			        .attr("y", height + gridSize)
				    .attr("text-anchor", "start")		
			     
				 svg.append("text")
				    .attr("class","mono2")
					.text("'HOME WIN'")// + "  " + "'AWAY WIN'")
			        .attr("x", function(d, i) { return (legendElementWidth+20) * (i) + 247 })
			        .attr("y", height + gridSize)
				    .attr("text-anchor", "start")		    
			     
				 svg.append("text")
				    .attr("class","mono2")
					.text("'AWAY WIN'")
			        .attr("x", function(d, i) { return (legendElementWidth+20) * (i) + 308 })
			        .attr("y", height + gridSize)
				    .attr("text-anchor", "start")		
			
		 		/**********************************LEGEND TEXT END***********************************/
			
			
				 legend.exit().remove()
			
         
		  		/*******************************************************************************/
				/**********************************LEGEND END***********************************/
				/*******************************************************************************/
         
			   })
		 	 }
         
			 heatmapChart(datasets[0])
			 
			 ;
		