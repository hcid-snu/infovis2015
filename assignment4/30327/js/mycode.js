drawPie("data/year_2012.csv")

d3.select("#year").on("change", function() { 
	d3.select("#myGraph").selectAll("*").remove()
	drawPie("data/year_" + this.value + ".csv", this.value)
})

function drawPie(filename) {
	
	d3.csv(filename, function(error, data){
	
		// svg ����� ũ�⸦ ���Ѵ�
		var svgEle = document.getElementById("myGraph")
		var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
		var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
		svgWidth = parseFloat(svgWidth) // remove px
		svgHeight = parseFloat(svgHeight) // remove px
	
		// ������ �ε�
		var dataSet = []  // empty array to store data
		var dataLabel = []  // empty array to store label
		for(var i = 0; i < data.length; i++) {
			dataSet.push(data[i].injured)
			dataLabel.push(data[i].age)
		}
	
		console.log(dataSet)
	
		var color = d3.scale.category10()
	
		// pie chart layout ����
		var pie = d3.layout.pie().sort(null)
	
		// pie chart ũ�� ����
		var arc = d3.svg.arc().innerRadius(50).outerRadius(200)
	
		// pie chart �׸��� �غ�
		var pieElements = d3.select("#myGraph")
			.selectAll("g")
			.data(pie(dataSet))
			.enter()
			.append("g")
			.attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")") // g �� �߽��� ���� ����� �̵�
		
		// ������ �߰�
		pieElements
			.append("path")
			.attr("class", "pie")
			.style("fill", function(d, i) { return color(i) })
			.transition()
			.duration(1000)
			.delay(function(d, i) { return i * 1000 })
			.ease("linear")
			.attrTween("d", function(d, i) {
				var interpolate = d3.interpolate(
					// �� �κ��� ���� ����
					{ startAngle: d.startAngle, endAngle: d.startAngle },
					// �� �κ��� ���� ����
					{ startAngle: d.startAngle, endAngle: d.endAngle }
				)
				return function(t) { return arc(interpolate(t) )}
			})
		
		// ���� �������� �� ���� ǥ��
		var textElements = d3.select("#myGraph")
			.append("text")
			.attr("class", "total")
			.attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")")
			.text("Total: " + d3.sum(dataSet))
	
		// ���� ������ ���� ���� ǥ��
		pieElements
		  .append("text")	// ������ ����ŭ text ��Ұ� �߰���
		  .attr("class", "pieNum")	// CSS Ŭ���� ����
		  .attr("transform", function(d, i){
				return "translate(" + arc.centroid(d) + ")"    // ��ä���� �߽����� ��(���� �߽� ���)
			})
		  .text(function(d, i){
				return dataLabel[i] + "," + d.value	// �� ǥ��
			})
	})
	
}