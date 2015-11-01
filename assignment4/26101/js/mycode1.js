drawPie("pie2009.csv");
d3.select("#year").on("change",function(){
	d3.select("#myGraph1").selectAll("*").remove();
	drawPie("pie"+this.value+".csv", this.value);
});
function drawPie(filename){
	d3.csv(filename, function(error,data){
		var dataSet = [];
		for(var i=0; i<data.length; i++){
			dataSet.push(data[i]["percent"]);
		} 
		var svgEle = document.getElementById("myGraph1")
		var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
		var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");

		svgWidth=parseFloat(svgWidth);
		svgHeight = parseFloat(svgHeight);
		var pie = d3.layout.pie()
		var arc = d3.svg.arc().innerRadius(50).outerRadius(100)

		var pieElements = d3.select("#myGraph1")
			.selectAll("g")
			.data(pie(dataSet))
			.enter()
			.append("g")
			.attr("transform", "translate("+svgWidth/2+", "+svgHeight/2+")")

		pieElements
			.append("path")
			.attr("class", "pie")
			.style("fill", function(d,i){
				return ["#FF5D00", "#FF3525", "#CE2A19", "#A61600"][i];
			})
			.transition()
			.duration(1000)
			.delay(function(d,i){
				return i*1000;
			})
			.ease("linear")
			.attrTween("d", function(d,i) {
			var interpolate = d3.interpolate(
				{startAngle : d.startAngle, endAngle : d.startAngle },
				{startAngle : d.startAngle, endAngle : d.endAngle }
				);
			return function(t){
				return arc(interpolate(t));
			}
			})
		var textElements = d3.select("#myGraph1")
			.append("text")
			.attr("class", "total")
			.attr("transform", "translate("+svgWidth/2.32+","+(svgHeight/2+5)+")")
			.text("전체 사망자수"+" "+d3.sum(dataSet))
		pieElements
			.append("text")
			.attr("class", "pieNum")
			.attr("transform", function(d,i){
				return "translate("+arc.centroid(d)+")";
			})
			.text(function(d,i){
				return d.value;
			})

		});
}