d3.csv("mydata.csv", function(error, dataSet){
	
	var svgWidth = 1700
	var svgHeight = 400
		
	var offsetX = 25
	var offsetY = 25
		
	var barElements
	
	var dataMax = d3.max(
			dataSet.map(function(d, i){
				return d.value;
			})
	)
	dataMax = dataMax * 1.5;	
			
	var xScale = d3.scale.ordinal() 
		.domain(dataSet.map(function(d, i){ return d.country; })) 
		.rangeRoundBands([0, svgWidth], 0.5)
		
	var yScale = d3.scale.linear() 
		.domain([0, dataMax])	
		.range([svgHeight, 0]) 
	
	//요소 추가	
	barElements = d3.select("#myGraph")
		.selectAll("rect")	
		.data(dataSet)	
	
	//데이터 추가 	
	barElements.enter()	
	  .append("rect")
		.attr("class", "bar")
		.attr("height", 0)
		.attr("width", xScale.rangeBand())
		.attr("x", function(d, i){return xScale(d.country) + offsetX;})
		.attr("y",svgHeight)
		//마우스 이벤트 처리
		.on("mouseover", function() { 
			d3.select(this)
				.style("fill", "purple")
		})
		.on("mouseout", function() { 
			d3.select(this)
				.transition()
				.duration(500)
				.style("fill", "orange")
		})
		 //애니메이션 처리
		 .transition()
		 .delay(function(d, i) { return i * 100 })
		 .duration(1000)
		 .attr("y", function(d, i){return yScale(d.value) - offsetY;})
		 .attr("height", function(d,i){return svgHeight - yScale(d.value);})
	
	var xAxisElements = d3.select("#myGraph")
		.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")
		.call(
			d3.svg.axis()
			  .scale(xScale) 
			  .orient("bottom")
		)
				
	var yAxisElements = d3.select("#myGraph")
		.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + offsetX + ", -" + offsetY + ")")
		.call(
			d3.svg.axis()
			  	.scale(yScale) 
			  	.orient("left") 
		)
	
// 체크박스를 클릭했을 때의 정렬 처리
d3.select("#dataSort").on("change", function(){
	if(this.checked){	// 체크하면 오름차순, 그렇지 않으면 내림차순으로 정렬
		var s = dataSet.sort(function(a, b) { return b.value - a.value; });
	}else{
		var s = dataSet.sort(function(a, b) { return a.value - b.value; });
	}
	
	var sortResult = s.map(function(d, i){ return d.country; });
	xScale.domain(sortResult);
		
	// 가로 눈금을 변경
	xAxisElements
		.transition()
		.call(
			d3.svg.axis()
			  .scale(xScale) 
			  .orient("bottom")
		)		
		
	// 세로 막대를 변경
	barElements
		.transition()
		.attr("x", function(d, i){
		return xScale(d.country) + offsetX;
		})
	})
})

