
drawPie("data/Octagon2010Pie.csv")

d3.select("#year").on("change", function() { 
	d3.select("#deadPie").selectAll("*").remove()
	d3.select("#injuredPie").selectAll("*").remove()
	drawPie("data/Octagon" + this.value + ".csv", this.value)
})

function drawPie(filename){

	d3.csv(filename, function(error, data){

		var svgWidth = 600;
		var svgHeight = 400;


		var formatPercent = d3.format(".0%");

		// 데이터 로딩
		var deadData = []  
		var dataLabel = [] 
		var injuredData = [] 
		for(var i = 0; i < data.length; i++) {
			deadData.push(data[i].dead)
			dataLabel.push(data[i].class)
			injuredData.push(data[i].injured.replace(',',''))
		}
		var tip = d3.tip()
		  .attr('class', 'd3-tip')
		  .offset([0, 0])
		  .html(function(d, i) {
    		return '<strong>' + dataLabel[i] +':</strong> <span style="color:red">'+ numberWithCommas(d.data) + '명' + '</span>';
 		});

		  function numberWithCommas(x) { 
		  	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}

		console.log(deadData);
		console.log(injuredData);
		drawEachPie('deadPie');
		drawEachPie('injuredPie');

	function drawEachPie(name){

		
		color = d3.scale.category10()
		// pie chart layout 설정
		var pie = d3.layout.pie().sort(null)
		
		// pie chart 크기 설정
		var arc = d3.svg.arc().innerRadius(svgHeight*0.2).outerRadius(svgHeight*0.4)
		
		var dataSet = []
		if (name == 'deadPie'){
			dataSet = deadData;	
		} 
		else {
			dataSet = injuredData;
		}

		// pie chart 그리기 준비
		var svg = d3.select('#' + name)
				 .attr('width', svgWidth)
				 .attr('height', svgHeight)

		var pieElements = d3.select('#' + name)
			.selectAll('g')		
			.data(pie(dataSet))
			.enter()
			.append('g')
			.attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")")
			
			console.log(pie(dataSet))

		var title = svg.append("text")		
				  .text(function(){
				  	if (name == 'deadPie'){
						return '연령대 별 사망자 수';
					} 
					else {
						return '연령대 별 부상자 수';
					}
				  })
				  .attr('x', 10)
				  .attr('y', 20)
				  .style('fill', 'black')
				  .style('font-size', 20)
				  .style('font-weight','bold');    	

		var sum = d3.sum(dataSet);
		var textElements = svg
					.append('text')
					.attr('class', 'total')
					.attr('transform', 'translate(' + svgWidth/2 + ', ' + svgHeight/2 +')')
					.text('Total: ' + numberWithCommas(d3.sum(dataSet)))
					.style('font-size', 20)	

		svg.call(tip);	
		// 데이터 추가
		pieElements
			.append("path")
			.attr("class", "pie")		
			.style("fill", function(d, i) { return color(i) })
			.on('mouseover', function(d,i){
				tip.show.apply(this, arguments);
			})
			.on('mouseout', function(){
				tip.hide.apply(this, arguments);
			})
			.transition()
			.duration(300)
			.delay(function(d, i){ return i*300})	
			.ease('linear')
			.attrTween('d', function(d, i){
				var interpolate = d3.interpolate(
					// 각 부분의 시작 각도
					{ startAngle: d.startAngle, endAngle: d.startAngle },
					// 각 부분의 종료 각도
					{ startAngle: d.startAngle, endAngle: d.endAngle }
				)
				return function(t) {return arc(interpolate(t))}
			})

		pieElements	
			.append('text')
			.attr('class', 'pieNum')
			.style('fill', 'black')
			.style('font-size', 14)
			.attr("transform", function(d, i){
				return 'translate(' + arc.centroid(d)+')'
			})
			.transition()
			.duration(300)
			.delay(function(d, i){ return i*300})	
			.ease('linear')
			.text(function(d, i){
				var fraction = dataSet[i] / sum;
				return formatPercent(fraction);
			});	

		  var legend = svg.selectAll(".legend")
		      .data(dataLabel)
		   	 .enter().append("g")
		      .attr("class", "legend")
		      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

		  // draw legend colored rectangles
		  legend.append("rect")
		      .attr("x", svgWidth - 18)
		      .attr("width", 18)
		      .attr("height", 18)
		      .style("fill", function(d, i){return color(i)});

		  // draw legend text
		  legend.append("text")
		      .attr("x", svgWidth - 24)
		      .attr("y", 9)
		      .attr("dy", ".35em")
		      .style("text-anchor", "end")
		      .text(function(d) { return d;})
		}		
	})	
}


var margin = { top: 20, right: 20, bottom: 30, left: 50 }
var width = 960 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom

// x, y 축 스케일과 위치 설정


var svg = d3.select('#lines')
		 .attr('width', width + margin.left + margin.right)
		 .attr('height', height + margin.left + margin.right)
		 .append('g')
		 .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

d3.tsv("data/OctagonLine2.csv", function(error, data) {
 
   console.log(data[0]);

   var data1 = [];
   var data2 = [];
   var data3 = [];
   var data4 = [];
   var data5 = [];
   var ages = [];

	for(var i = 0 ; i < data.length; i++ ){
		ages.push(data[i].age);
		data1.push(data[i].a);
		data2.push(data[i].b);
		data3.push(data[i].c);
		data4.push(data[i].d);
		data5.push(data[i].e);
	};


	// console.log(years);
	var dataLabel = [];
	for(var i = 0; i < data.length; i++){
		dataLabel.push((i+1) * width / (data.length+1))
	};
	var x = d3.scale.linear().range([0, width])
	var y = d3.scale.linear().range([height, 0])
	x.domain(d3.extent(dataLabel, function(d, i) { return d[i] }))
	y.domain(d3.extent(data1, function(d, i) { return d[i] }))

	

	var xAxis = d3.svg.axis().scale(x).orient("bottom")
	var yAxis = d3.svg.axis().scale(y).orient("left")
	
	


  	var line = d3.svg.line()
	    .interpolate("basis")
	    .x(function(d, i) { return x(dataLabel[i]); })
	    .y(function(d) { return y(d[i]); });
	
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
	
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		


		svg.append("svg:path")
			.datum(data)
			.attr('class', 'line')			
			.attr("d", line(data1))
			.attr('stroke', 'green')
			

	 	// lineChart.append("text")
	  //     	.datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
	  //     	.attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
	  //     	.attr("x", 3)
	  //     	.attr("dy", ".35em")
	  //     	.text(function(d) { return d.name; });

})