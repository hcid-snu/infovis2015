Array.prototype.contains = function(elem){
	for (var i in this){
		if (this[i] == elem) return true;
	}
	return false;
	};

d3.csv("oecd/barData.csv", function(error, data){
	
	// 바 그래프의 폭과 그래프 간의 간격을 설정
	var barWidth = 25
	var barGap = 5

	var svgWidth = 0
	var svgHeight = 0
	
	var formatPercent = d3.format(".0%");
	
 	// 데이터 로딩
	var dataSet = [];  // empty array to store data
	var dataLabel = [];
	var dataAbb = [];
		
	for(var i = 0; i < data.length; i++) {
		dataSet.push(parseFloat(data[i].value))
		dataLabel.push(data[i].country)
		var abb = data[i].country.substring(0,3)
		if(dataAbb.contains(abb)){
			abb = abb + 1;			
		}
		dataAbb.push(abb);
		svgWidth += barWidth + barGap		
		if(svgHeight < parseInt(data[i].value)){
			svgHeight = data[i].value 
			}
		}

	var tip = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([-10, 0])
	  .html(function(d, i) {
	    return '<strong>' + dataLabel[i] +':</strong> <span style="color:red">'+ d.toFixed(2) + '</span>';
	  });

	var yScale = d3.scale.linear()
		.domain([0, d3.max(dataSet, function(d){ return d} )])
		.range([0, 400]);
	
	var offsetX = 10;
	var offsetY = 30;
	
	svgWidth += 3 * offsetX
	tempSvgHeight = parseInt(svgHeight)
	svgHeight = tempSvgHeight + 6
	console.log(yScale(svgHeight))

	// 요소 추가
	var svg = d3.select("#myGraph")
			.attr('width', svgWidth)
			.attr('height', yScale(svgHeight))


	var xScaleForAxis = d3.scale.ordinal()
		.rangeRoundBands([0, svgWidth], 0.1, 1)
		.domain(dataAbb.map (function(d){return d}))

	var yScaleForAxis = d3.scale.linear()
		.domain([0, d3.max(dataSet, function(d){ return d* 0.01} )])
		.range([400, 0]);

	// y축 그리기
	// var yAxis = svg
	// 			.append('g')
	// 			.attr('class', 'yAxis')
	// 			.attr('transform', 'translate(' + (4 * offsetX) + ', ' + (offsetY-10)+ ')')
	// 			.call(
	// 				d3.svg.axis()
	// 				.scale(yAxis)
	// 				.orient('left')
	// 				.tickFormat(formatPercent)
	// 				);
	var yAxis = d3.svg.axis()
			.scale(yScaleForAxis)
			.orient('left')
			.tickFormat(formatPercent);

	 svg.append('g')
		.attr('class', 'yAxis')
		.call(yAxis)
		.attr('transform', 'translate(' + (4 * offsetX) + ', ' + (offsetY-10)+ ')');	

	// x축 그리기 
	var xAxis = svg
				.append('g')
				.attr('class', 'xAxis')
				.attr('transform', 'translate(' + (offsetX + 5)+ ', ' + (yScale(tempSvgHeight) + offsetY+1)+')')
				.call(
					d3.svg.axis()
					.scale(xScaleForAxis)
					.orient('bottom')
					);


	var barElementsG = svg
						.append('g')
						.attr('transform', 'translate(' + (offsetX + 5) + ', '+ offsetY+')') 
						// selectAll 다음에 하면 어떻게 될까? -> 적용 안됨					    

	// barElements에 g로 grouping된 barElementsG의 모든 rect를 할당
	var barElements = barElementsG						
					.selectAll('rect')
					.data(dataSet);
	svg.call(tip);	


	// 아래서 위로 그리기
	barElements
		.enter() 
	    .append("rect")
		.attr("class", "bar")
		.attr('height', 0) // 초기 높이 설정을 해줘야 함. 안그러면 이상하게 시작
		.attr("width", xScaleForAxis.rangeBand())
		// .attr("x", function(d, i) { return i * ( barWidth + barGap ) })
		.attr("x", function(d,i){return xScaleForAxis(dataAbb[i])})  
		.attr("y", function(d, i){ return yScale(tempSvgHeight) })
		.on('mouseover', function(d,i){
			tip.show.apply(this, arguments);
			d3.select(this)
	          .style('fill', 'orange');
		})
		.on('mouseout', function(){
			tip.hide.apply(this, arguments);
			d3.select(this)
			.transition()
			.duration(500)
			.style('fill', '#ccc')	
		})
		.on('click', function(){
			sortBars();
		})
		.transition() // transition 전에 interaction 코드를 추가해야 함.
		.delay(function(d, i){
			return i * 100
		})
		.duration(500)
		.attr('y', function(d, i){
			return yScale(tempSvgHeight) - yScale(d)
		})
		.attr("height", function(d, i) { return yScale(d)});

	
	// d3.select("input").on("change", change);

	// var sortTimeout = setTimeout(function() {
 //    					d3.select("input").property("checked", true).each(change);
 //  					}, 2000);

	// function change() {
	//     clearTimeout(sortTimeout);

	//     // Copy-on-write since tweens are evaluated after a delay.
	//     var x0 = xScaleForAxis.domain(data.sort(this.checked
	//         ? function(a, b) { return b.value - a.value; }
	//         : function(a, b) { return d3.ascending(a.country, b.country); })
	//         .map(function(d) { return d.country; }))
	//         .copy();

	//     svg.selectAll("rect")
	//         .sort(function(a, b) { return x0(a.country) - x0(b.country); });

	//     var transition = svg.transition().duration(750),
	//         delay = function(d, i) { return i * 50; };

	//     transition.selectAll("rect")
	//         .delay(delay)
	//         .attr("x", function(d) { return x0(d.country); });

	//     transition.select("xAxis")
	//         .call(xAxis)
	//       .selectAll("g")
	//         .delay(delay);
 //  } 
})