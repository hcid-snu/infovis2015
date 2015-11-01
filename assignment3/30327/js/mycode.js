d3.csv("data/bar_chart_Assign1.csv", function(error, data){
	
	// svg ����� ũ�⸦ ���Ѵ�
	var svgEle = document.getElementById("myGraph")
	var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
	var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
	svgWidth = parseFloat(svgWidth) // remove px
	svgHeight = parseFloat(svgHeight) // remove px

	// �� �׷����� ���� �׷��� ���� ������ ����
	var barWidth = 50
	var barGap = 10
	
	// �� �׷��� ���
	var barElements
	
	// �׷����� �̵��ϱ� ���� offset ���� 
	var offsetX = 30
	var offsetY = 20

	// ������ �ε�
	var dataSet = []  // empty array to store data
	var dataLabel = []  // empty array to store label
	for(var i = 0; i < data.length; i++) {
		dataSet.push(data[i].value)
		dataLabel.push(data[i].country)
	}

	// ��� �߰�
	barElements = d3.select("#myGraph")
		.append("g")
		.attr("transform", "translate(" + offsetX + ", " + -offsetY + ")")
		.selectAll("rect")
		.data(dataSet)
	
	// ������ �߰�
	barElements.enter()
	  .append("rect")
		.attr("class", "bar")
		.attr("height", 0) // �ִϸ��̼� ���۽� ���� ũ��
		.attr("width", barWidth)
		.attr("x", function(d, i) { return i * (barWidth + barGap) })
		.attr("y", svgHeight)
		// ���콺 �̺�Ʈ ó��
		.on("mouseover", function() { 
			d3.select(this)
				.style("fill", "blue")
		})
		.on("mouseout", function() { 
			d3.select(this)
				.transition()
				.duration(500)
				.style("fill", "#ccc")
		})
		.transition()
		.delay(function(d, i) { return i * 50 })
		.duration(100)
		.attr("y", function(d, i) { return svgHeight - d })
		.attr("height", function(d, i) { return d })
	
	// �ؽ�Ʈ ��� �߰�
	barElements.enter()
		.append("text")
		.attr("class", "barNum")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		.attr("y", function(d, i) { return svgHeight - d - 5 })
		.text(function(d, i) { return d })
	
	
	// y���� ǥ���ϱ� ���� ������ ����
	var yScale = d3.scale.linear()  // ������ ������ ���
		.domain([0, 100])  // ���� �����Ͱ� 300 �̸���
		.range([100, 0])  // �׷����� �Ʒ����� ���� �׷����� ������ range�� ������ ���־�� ��.

	// y���� ǥ��
	d3.select("#myGraph").append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + offsetX + ", " + ((svgHeight - 100) - offsetY) + ")")
		.call(
			d3.svg.axis()
			.scale(yScale)
			.orient("left")
		)
	
	// x���� ǥ��
	d3.select("#myGraph")
		.append("rect")
		.attr("class", "axis_x")
		.attr("width", 1800)
		.attr("height", 1)
		.attr("transform", "translate(" + offsetX + ", " + (svgHeight - offsetY) + ")")
		
	// x�� ���̺� ǥ��
	barElements.enter()
		.append("text")
		.attr("class", "barName")
		.attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 })
		.attr("y", svgHeight + offsetY - 5)
		.text(function(d, i) { return dataLabel[i] })
		
})











