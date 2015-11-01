//d3.csv("random.csv", function(error, data){
//	var dataSet = [ ];
//	for(var i=0; i<data.length; i++){
//		dataSet.push(data[i].item1);
//	}

var dataSet = [];
var number1 = 1000;
for (i=0; i< 1000; i++){
	var temp1 = Math.floor((Math.random() *1000) + 1);
	dataSet.push(temp1);
}
//document.write(dataSet);
d3.select("#myGraph")
.selectAll("circle")
.data(dataSet)
.enter()
.append("circle")
.attr("cx", function(d, i){
	return d;
})
.attr("cy", -10)
.attr("r", 3)
.attr("fill", "white")
.transition()
.duration(5000)
.delay(function(d, i){
	return i * 10;
})
.attr("cy", 1000)
.remove()
//.append("#text")
//.attr("x", 0)
//.attr("y", 0)
//.attr("font-family", "sans-serif")
//.attr("font-size", "20px")
//.attr("fill", "white")
//.transition()
//.duration(5000)
//.delay(10000)
//.attr("x", 450)
//.attr("y", 250)


//버튼 클릭 처리
d3.select("#updateButton")
.on("click", function(){
var number2 = 1000;
for (i=0; i< 1000; i++){
	var temp2 = Math.floor((Math.random() *1000) + 1);
	dataSet.push(temp2);
}
d3.select("#myGraph")
.selectAll("circle")
.data(dataSet)
.enter()
.append("circle")
.attr("cx", function(d, i){
	return d;
})
.attr("cy", -10)
.attr("r", 3)
.attr("fill", "white")
.transition()
.duration(5000)
.delay(function(d, i){
	return i * 10;
})
.attr("cy", 1000)
.remove()
})


//})