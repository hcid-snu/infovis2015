/*****************************************************************************/
/****************************LINE_GRAPH***************************************/
/*****************************************************************************/

function linegraph(){	
 	var element = document.getElementById('linegraph');
	}

// 전체 그래프의 사이즈 지정
var margin = { top: 20, right: 20, bottom: 30, left: 50 }
var width = 960 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom


// 데이터의 텍스트 날짜 포맷 (day-month-year)을 날짜 오브젝트 포맷으로 변환
var parseDate = d3.time.format("%Y").parse;


// x, y 축을 위한 range 설정 (x: time scale, y: linear)
var x = d3.time.scale()
				.range([0, width])
var y = d3.scale.linear()
				.domain([0,2550])
				.range([height, 0])


// x, y 축 스케일과 위치 설정
var xAxis = d3.svg.axis().scale(x).orient("bottom")
						.innerTickSize(-height).outerTickSize(0).tickPadding(2);
var yAxis = d3.svg.axis().scale(y).ticks(10).orient("left")
						.innerTickSize(-width).outerTickSize(0).tickPadding(9);


// 그려질 line 설정 (x: year, y: accident)
var line1 = d3.svg.line()
   				  .x(function(d) { return x(d.year) })
    			  .y(function(d) { return y(d.accident) })
			      .interpolate("linear")

// 그려질 line 설정 (x: year, y: injury)
var line2 = d3.svg.line()
    			  .x(function(d) { return x(d.year) })
   				  .y(function(d) { return y(d.injury) })
				  .interpolate("linear")


// svg 설정하고 추가
var svg = d3.select("#linegraph")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	
var svgEle = document.getElementById("linegraph")
			
			
//data 불러오기
d3.csv("data/mydata.csv", function(error, data) {
		data.forEach(function(d) {
		d.year = parseDate(d.year.toString());
		d.accident = +d.accident
		d.injury = +d.injury
		})
	
	x.domain(d3.extent(data, function(d) { return d.year}))
	//y.domain(d3.extent(data, function(d) { return d.accident}))
	
	//draw x axis & label 
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		 .selectAll("text")
		 .attr("transform", "rotate(-30)")
		 .attr("dy","1.3em")
		 .attr("dx","-.5em")
      
		;
	
	//draw y axis & label
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 5)
		.attr("dy", ".71em")
		.attr("dx", "-0.2em")
		.style("text-anchor", "end")
		.text("No. of Accidents")
		;
		
	 //accident value
	  svg.append('g')
	      .classed('labels-group', true)
	      .selectAll('text')
	      .data(data)
	      .enter().append('text')
	      .classed('label', true)
	      .attr({
	      	'x': function(d, i) {
	        	return x(d.year);
	      	},
	      	'y': function(d, i) {
	       	 	return y(d.accident);
	      	}
	    	})
		   .attr("dy", "-.8em")
		   .attr("dx", "-1em")
		  .style("fill","#5C6161")
	      .text(function(d, i) {
	       return d.accident;
	     });
		 
 	//accident value
  	  svg.append('g')
      	  .classed('labels-group', true)
      	  .selectAll('text')
      	  .data(data)
          .enter().append('text')
          .classed('label', true)
          .attr({
      		  'x': function(d, i) {
        		  return x(d.year);
      		  },
      		  'y': function(d, i) {
       	 		  return y(d.injury);
      		  }
    		})
	   	 .attr("dy", "-.8em")
	   	 .attr("dx", "-1em")
	  	 .style("fill","#5C6161")
      	 .text(function(d, i) {
       	  return d.injury;

     });
	
	//no. of accident	
	svg.append("path")
		.datum(data)
		.attr("class", "line1")
		.attr("d", line1)
		;
	
	//no of injuries
	svg.append("path")
		.datum(data)
		.attr("class", "line2")
		.attr("d", line2)
	
	//line label for line 1
	svg.append("text")
		.attr("class","line1_text")
        .attr("transform", "translate")
        .attr("y", "215")
        .attr("x", "500")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .text("Number of Accidents");
	
	//line label for line 2
	svg.append("text")
		.attr("class","line2_text")
        .attr("transform", "translate")
        .attr("y", "85")
        .attr("x", "735")
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .text("Number of Injuries");
	
     svg.selectAll("dot")
         .data(data)
    	 .enter().append("circle")
         .attr("r", 5.5)
         .attr("cx", function(d) { return x(d.year) })
         .attr("cy", function(d) { return y(d.accident) })
		 .style("fill","#DC381F")
		;
		
     svg.selectAll("dot")
         .data(data)
    	 .enter().append("circle")
         .attr("r", 4.5)
         .attr("cx", function(d) { return x(d.year) })
         .attr("cy", function(d) { return y(d.injury) })
		 .style("fill","#1FC2DB")
		;
	
  svg.append("text")
	    .attr("class","lineNum")
        .attr("cy", function(d) { return y(d.injury + .3 ); })
        .attr("cx", 49)//function(d) { return x(d.year); })
        .text("heello")//function(d) { return (d.injury) })//Math.round(y0(d.value1)); })
	    .attr("dx", "1.17em")	
		;
});



/*****************************************************************************/
/*****************************PIE_GRAPH***************************************/
/*****************************************************************************/

drawPie("data/mydata2005.csv");

d3.select("#year").on("change", function() { 
	d3.select("#piegraph").selectAll("*").remove()
	drawPie("data/mydata" + this.value + ".csv", this.value)
})


function drawPie(filename) {
	
	d3.csv(filename, function(error, data){
	
		// svg 요소의 크기를 구한다
		var svgEle = document.getElementById("piegraph")
		var width = window.getComputedStyle(svgEle, null).getPropertyValue("width")
		var height = window.getComputedStyle(svgEle, null).getPropertyValue("height")
		width = parseFloat(width) // remove px
		height = parseFloat(height) // remove px
	
		// 데이터 로딩
		var dataSet = []  // empty array to store data
		var dataLabel = []  // empty array to store label
		for(var i = 0; i < data.length; i++) {
			dataSet.push(data[i].injury)
			dataLabel.push(data[i].age)
		}
	
		console.log(dataSet)
	
		var color = d3.scale.ordinal()
	    .range(["#E8A96A", "#CBF285", "#7b6888", "#50CFDB", "#E8C2B0", "#7EDBAD", "#8380F2"]);
	
		// pie chart layout 설정
		var pie = d3.layout.pie().sort(null)
	
		// pie chart 크기 설정
		var arc = d3.svg.arc().innerRadius(35).outerRadius(100)
	
		// pie chart 그리기 준비
		var pieElements = d3.select("#piegraph")
			.selectAll("g")
			.data(pie(dataSet))
			.enter()
			.append("g")
			.attr("transform", "translate(" + width/2 + ", " + height/2 + ")") // g 의 중심을 원의 가운데로 이동

		
		// 데이터 추가
		pieElements
			.append("path")
			.attr("class", "pie")
			.style("fill", function(d, i) { return color(i) })
			.transition()
			.duration(800)
			.delay(function(d, i) { return i * 700 })
			.ease("linear")
			.attrTween("d", function(d, i) {
				var interpolate = d3.interpolate(
					// 각 부분의 시작 각도
					{ startAngle: d.startAngle, endAngle: d.startAngle },
					// 각 부분의 종료 각도
					{ startAngle: d.startAngle, endAngle: d.endAngle }
				)
				return function(t) { return arc(interpolate(t) )}
			})
	
	
	   //legend 추가
	   var legend = d3.select("#piegraph").append("svg")
	      	  			.attr("class", "legend")
	       	 			.attr("width", 270 )
	     	   			.attr("height", 200)
	      	   			.selectAll("g")
	       	 			.data(color.domain().slice())
	    	  			.enter().append("g")
						.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
			;

	        legend.append("rect")
	        		.attr("width", 18)
	        		.attr("height", 18)
	      	  		.style("fill", color);

	    	legend.append("text")
	       		 	.attr("x", 24)
	    		 	.attr("y", 9)
	   			 	.attr("dy", ".35em")
		  		  .text(function(d, i){
		  				return data[i].age	// 값 표시
		  			})
		
		// 파이 데이터의 총 합을 표시
		var textElements = d3.select("#piegraph")
								.append("text")
								.attr("class", "total")
								.attr("transform", "translate(" + width/2 + ", " + height/2 + ")")
								.text("Total: " + d3.sum(dataSet))
	
	
		// 파이 데이터 개별 값을 표시
		pieElements
		  .append("text")	// 데이터 수만큼 text 요소가 추가됨
		  .attr("class", "pieNum")	// CSS 클래스 설정
		  .attr("transform", function(d, i){
				return "translate(" + arc.centroid(d) + ")"    // 부채꼴의 중심으로 함(무게 중심 계산)
			})
		//.attr("dx","-.5em")
		  .text(function(d, i){
				return d.value	// 값 표시
			})
			
	var pieLabel = d3.select("#piegraph")
					  .append("text")
					  .attr("class","pieLabel")
			  	  	  .attr("y", "195")
	       		 	  .attr("x", "885")
	        .text("Number of Injuries per year");
	})	
}
;
