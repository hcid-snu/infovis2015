d3.csv("oecd.csv", function(error, data){
	
	var svgEle = document.getElementById("myGraph")
	var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
	var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
	svgWidth = parseFloat(svgWidth) // remove px
	svgHeight = parseFloat(svgHeight) // remove px

	var barWidth = 25
	var barGap = 5
	var barElements
	
	var offsetX = 30
	var offsetY = 20

	var dataSet = []
	var dataLabel = []
	for(var i = 0; i < data.length; i++) {
		dataSet.push(data[i].Value)
		dataLabel.push(data[i].COUNTRY)
	}

	barElements = d3.select("#myGraph")
		.append("g")
		.attr("transform", "translate(" + offsetX + ", " + -offsetY + ")")
		.selectAll("rect")
		.data(dataSet)
	
	barElements.enter()
	  .append("rect")
		.attr("class", "bar")
		.attr("height", 0) // 애니메이션 시작시 바의 크기
		.attr("width", barWidth)
		.attr("x", function(d, i) { return i * (barWidth + barGap) })
		.attr("y", svgHeight)
		
		.on("click", function() {
          window.open("https://stats.oecd.org/Index.aspx?DataSetCode=SOCX_AGG")
 })

		.on("mouseover", function() { 
			d3.select(this)
				.style("fill", "red")

			d3.select('#myGraph')
				.append('polyline')
				.attr("points", "30 165 100 165 1000 165")
				.attr("stroke-width", 3)
				.attr("stroke", "blue");
		})
		.on("mouseout", function() { 
			d3.select(this)
				.transition()
				.duration(500)
				.style("fill", "green")
			d3.select('#myGraph')
				.select("polyline").remove();
		})
		.transition()
		.delay(function(d, i) { return i * 50 })
		.duration(200)
		.attr("y", function(d, i) { return svgHeight - 5*d })
		.attr("height", function(d, i) { return 5*d })
		.style("fill","green")
		

	
	// 텍스트 요소 추가m
	barElements.enter()
		.append("text")
		.attr("class", "barNum")
		.transition()
		.delay(function(d, i) { return i * 60 })
		.duration(100)
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		.attr("y", function(d, i) { return svgHeight - 5*d - 5 })
		.text(function(d, i) { return d })
	
	
	var yScale = d3.scale.linear()
		.domain([0, 40])
		.range([100, -100])

	// y축을 표시
	d3.select("#myGraph").append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + offsetX + ", " + ((svgHeight - 100) - offsetY) + ")")
		.call(
			d3.svg.axis()
			.scale(yScale)
			.orient("left")
			.ticks(5)
		)
		
	.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", 110)
      .attr("y", 10)
      .attr("dy", ".71em")
      .attr("fill", "blue")
      .style("text-anchor", "end")
      .text("%수치");
	
	// x축을 표시
	d3.select("#myGraph")
		.append("rect")
		.attr("class", "axis_x")
		.attr("width", 1600)
		.attr("height", 1)
		.attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")
		
	// x축 레이블 표시
	barElements.enter()
		.append("text")
		.attr("class", "barName")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		.attr("y", svgHeight + offsetY - 5)
		.text(function(d, i) { return dataLabel[i] })
		
})


//
d3.select('#myGraph')
    .append('text').text("마우스 올려 평균선(23) 확인")
    .attr('x', 650)
    .attr('y', 50)
    .attr('fill',"blue")

d3.select('#myGraph')
    .append('text').text("차트 내용 클릭시 내용확인으로 이동")
    .attr('x', 650)
    .attr('y', 70)
    .attr('fill',"blue")






