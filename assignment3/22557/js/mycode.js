d3.selectAll("button").on("click", function(){
//하나의 csv에서 click시 row를 바꿔 dataSet을 변경하려 했지만 계속 막히기 때문에 배웠던 방법으로 파일을 나눔
//REMOVE가 먹히지 않는 이유를 모르겠다...
	var csvFile = this.getAttribute("data-src")


	d3.csv(csvFile, function(error, data){

	// svg width 정하기
	//width 100%로 설정했는데 작은 화면에서는 결국 다 안 보일 거라는 문제가 있음 -> 1050으로 설정함
	// 글자가 겹쳐서 나라 이름 안 보이는 부분은 어떻게 할 것인가
	// dataLabel을 약자로 (autrailia -> AUS식) 대체하고 마우스 올리면 툴팁으로 바꿔주는 게 좋을 수도?
	//숫자가 ..이면 표시하지 않기로 하자
	
	// svg 요소의 크기를 구한다
	var svgEle = document.getElementById("myGraph")
	var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
	var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
	svgWidth = parseFloat(svgWidth) // remove px
	svgHeight = parseFloat(svgHeight) // remove px

	// 바 그래프의 폭과 그래프 간의 간격을 설정
	var barWidth = 30
	var barGap = 10
	
	// 바 그래프 요소
	var barElements
	
	// 그래프를 이동하기 위한 offset 변수 
	var offsetX = 30
	var offsetY = 20

	// 데이터 로딩
	var dataSet = []  // empty array to store data
	var dataLabel = []  // empty array to store label
	var dataTip = [] // empty array to store full name

	for(var i = 0; i < data.length; i++) {
		if(data[i].item1 == ".."){
		continue;
		}
		else{
		dataSet.push(data[i].item1)
		dataLabel.push(data[i].namecode)
		dataTip.push(data[i].fullname)
		}	
	}


	// 요소 추가
	barElements = d3.select("#myGraph")
		.append("g")
		.attr("transform", "translate(" + offsetX + ", " + -offsetY + ")")
		.selectAll("rect")
		.data(dataSet)


	// 데이터 추가 
	barElements.enter()
	  .append("rect")
		.attr("class", "bar")
		.attr("height", 0) // 애니메이션 시작시 바의 크기
		.attr("width", barWidth)
		.attr("x", function(d, i) { return i * (barWidth + barGap) })
		.attr("y", svgHeight)
		// 마우스 이벤트 처리
		.on("mouseover", function() { 
			var coordinates = [0, 0];
			coordinates = d3.mouse(this);
			var xMouse = coordinates[0];
			var yMouse = coordinates[1];
			var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
			var yPosition = parseFloat(d3.select(this).attr("y")) - 10;
			var xData = xMouse/40;

		
			barElements.enter()
					.append("text")
				   .attr("id", "tooltip")
				   .attr("x", xPosition)
				   .attr("y", yPosition)
				   .attr("text-anchor", "middle")
				   .attr("font-family", "sans-serif")
				   .attr("font-size", "9px")
				   .attr("fill", "black")
			    .text(function(xData){ return dataTip[xData] }) 
			})
			//mouse 위치 -> 위치에 맞는 dataTip 찾아오는 것에서 막힘
			.on("mouseout", function() { 
				d3.select("#tooltip")
				.remove()
			})
		.transition()
		.delay(function(d, i) { return i * 50 })
		.duration(50)
		.attr("y", function(d, i) { return svgHeight - d })
		.attr("height", function(d, i) { return d })


	
	// 텍스트 요소 추가
	barElements.enter()
		.append("text")
		.attr("class", "barNum")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		.attr("y", function(d, i) { return svgHeight - d - 5 })
		.text(function(d, i) { return d })
	
	var xScale = d3.scale.ordinal()
		.domain(d3.range(dataSet.length))
		.rangeRoundBands([0, svgWidth]);	
	// y축을 표시하기 위한 스케일 설정
	var yScale = d3.scale.linear()  // 직선의 스케일 사용
		.domain([0, 300])  // 현재 데이터가 300 미만임
		.range([300, 0])  // 그래프가 아래에서 위로 그려지기 때문에 range를 역으로 써주어야 함.

	// y축을 표시
	d3.select("#myGraph").append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + offsetX + ", " + ((svgHeight - 300) - offsetY) + ")")
		.call(
			d3.svg.axis()
			.scale(yScale)
			.orient("left")
		)
	
	// x축을 표시
	d3.select("#myGraph")
		.append("rect")
		.attr("class", "axis_x")
		.attr("width", 1050)
		.attr("height", 1)
		.attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")
		
	// x축 레이블 표시
	barElements.enter()
		.append("text")
		.attr("class", "barName")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		.attr("y", svgHeight + offsetY - 5)
		.text(function(d, i) { return dataLabel[i] })
	// 데이터삭제
	barElements
		.exit()
		.remove();	
})


})










