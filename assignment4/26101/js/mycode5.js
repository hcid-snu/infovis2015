var svgWidth = 400;
var svgHeight = 200;
var offsetX = 30;
var offsetY = 25;
var scale = 15;
var dataSet = [
	{ year : 2005, Jongrogu : 3, Junggu : 2, Yongsangu : 3, Seongdonggu : 1, Gwangjingu : 1, Dongdaemungu : 4, Jungnanggu : 1, Seongbukgu : 2, Gangbukgu : 3, Dobonggu : 0, Nowongu : 1, Eunpyeonggu : 0, Seodaemungu : 3, Mapogu : 1, Yangcheongu : 2, Gangseogu : 0, Gurogu : 1, Geumcheongu : 4, Yeongdeungpogu : 3, Dongjakgu : 3, Gwanakgu : 4, Seochogu : 4, Gangnamgu : 2, Songpagu : 3, Gangdonggu : 0 },
	{ year : 2006, Jongrogu : 1, Junggu : 0, Yongsangu : 0, Seongdonggu : 0, Gwangjingu : 3, Dongdaemungu : 0, Jungnanggu : 2, Seongbukgu : 4, Gangbukgu : 1, Dobonggu : 0, Nowongu : 1, Eunpyeonggu : 0, Seodaemungu : 0, Mapogu : 1, Yangcheongu : 2, Gangseogu : 5, Gurogu : 3, Geumcheongu : 2, Yeongdeungpogu : 3, Dongjakgu : 2, Gwanakgu : 1, Seochogu : 3, Gangnamgu : 7, Songpagu : 8, Gangdonggu : 3 },
	{ year : 2007, Jongrogu : 1, Junggu : 0, Yongsangu : 4, Seongdonggu : 1, Gwangjingu : 2, Dongdaemungu : 3, Jungnanggu : 2, Seongbukgu : 3, Gangbukgu : 1, Dobonggu : 4, Nowongu : 2, Eunpyeonggu : 2, Seodaemungu : 0, Mapogu : 4, Yangcheongu : 0, Gangseogu : 2, Gurogu : 1, Geumcheongu : 2, Yeongdeungpogu : 1, Dongjakgu : 2, Gwanakgu : 4, Seochogu : 2, Gangnamgu : 3, Songpagu : 4, Gangdonggu : 3 },
	{ year : 2008, Jongrogu : 1, Junggu : 2, Yongsangu : 0, Seongdonggu : 0, Gwangjingu : 4, Dongdaemungu : 4, Jungnanggu : 1, Seongbukgu : 0, Gangbukgu : 0, Dobonggu : 0, Nowongu : 1, Eunpyeonggu : 3, Seodaemungu : 0, Mapogu : 1, Yangcheongu : 7, Gangseogu : 4, Gurogu : 2, Geumcheongu : 3, Yeongdeungpogu : 0, Dongjakgu : 2, Gwanakgu : 3, Seochogu : 1, Gangnamgu : 0, Songpagu : 2, Gangdonggu : 2 },
	{ year : 2009, Jongrogu : 0, Junggu : 0, Yongsangu : 2, Seongdonggu : 1, Gwangjingu : 0, Dongdaemungu : 2, Jungnanggu : 3, Seongbukgu : 0, Gangbukgu : 1, Dobonggu : 1, Nowongu : 0, Eunpyeonggu : 1, Seodaemungu : 3, Mapogu : 6, Yangcheongu : 2, Gangseogu : 5, Gurogu : 2, Geumcheongu : 3, Yeongdeungpogu : 2, Dongjakgu : 1, Gwanakgu : 1, Seochogu : 2, Gangnamgu : 2, Songpagu : 2, Gangdonggu : 1 },
	{ year : 2010, Jongrogu : 0, Junggu : 0, Yongsangu : 0, Seongdonggu : 0, Gwangjingu : 3, Dongdaemungu : 2, Jungnanggu : 2, Seongbukgu : 1, Gangbukgu : 3, Dobonggu : 1, Nowongu : 3, Eunpyeonggu : 0, Seodaemungu : 1, Mapogu : 2, Yangcheongu : 1, Gangseogu : 6, Gurogu : 1, Geumcheongu : 1, Yeongdeungpogu : 3, Dongjakgu : 1, Gwanakgu : 1, Seochogu : 1, Gangnamgu : 2, Songpagu : 0, Gangdonggu : 3 },
	{ year : 2011, Jongrogu : 0, Junggu : 0, Yongsangu : 1, Seongdonggu : 1, Gwangjingu : 4, Dongdaemungu : 0, Jungnanggu : 1, Seongbukgu : 4, Gangbukgu : 1, Dobonggu : 2, Nowongu : 2, Eunpyeonggu : 1, Seodaemungu : 0, Mapogu : 4, Yangcheongu : 3, Gangseogu : 0, Gurogu : 0, Geumcheongu : 1, Yeongdeungpogu : 3, Dongjakgu : 2, Gwanakgu : 2, Seochogu : 1, Gangnamgu : 3, Songpagu : 0, Gangdonggu : 1 },
	{ year : 2012, Jongrogu : 0, Junggu : 0, Yongsangu : 0, Seongdonggu : 0, Gwangjingu : 2, Dongdaemungu : 1, Jungnanggu : 0, Seongbukgu : 0, Gangbukgu : 1, Dobonggu : 1, Nowongu : 2, Eunpyeonggu : 0, Seodaemungu : 1, Mapogu : 2, Yangcheongu : 0, Gangseogu : 5, Gurogu : 2, Geumcheongu : 1, Yeongdeungpogu : 1, Dongjakgu : 0, Gwanakgu : 2, Seochogu : 1, Gangnamgu : 1, Songpagu : 2, Gangdonggu : 4 },
	{ year : 2013, Jongrogu : 0, Junggu : 0, Yongsangu : 2, Seongdonggu : 1, Gwangjingu : 0, Dongdaemungu : 3, Jungnanggu : 1, Seongbukgu : 1, Gangbukgu : 0, Dobonggu : 0, Nowongu : 2, Eunpyeonggu : 2, Seodaemungu : 0, Mapogu : 1, Yangcheongu : 1, Gangseogu : 2, Gurogu : 2, Geumcheongu : 1, Yeongdeungpogu : 2, Dongjakgu : 0, Gwanakgu : 0, Seochogu : 1, Gangnamgu : 1, Songpagu : 0, Gangdonggu : 0 },
	{ year : 2014, Jongrogu : 0, Junggu : 0, Yongsangu : 0, Seongdonggu : 0, Gwangjingu : 1, Dongdaemungu : 1, Jungnanggu : 1, Seongbukgu : 1, Gangbukgu : 0, Dobonggu : 1, Nowongu : 2, Eunpyeonggu : 2, Seodaemungu : 2, Mapogu : 3, Yangcheongu : 0, Gangseogu : 3, Gurogu : 2, Geumcheongu : 0, Yeongdeungpogu : 5, Dongjakgu : 2, Gwanakgu : 1, Seochogu : 0, Gangnamgu : 0, Songpagu : 4, Gangdonggu : 0 } 
];

var margin = svgWidth/ (dataSet.length-1);
drawGraph(dataSet, "Jongrogu", "itemA", "basis");
	drawGraph(dataSet, "Junggu", "itemB", "basis");
	drawGraph(dataSet, "Yongsangu", "itemC","basis");
	drawGraph(dataSet, "Seongdonggu","itemD","basis");
	drawGraph(dataSet, "Gwangjingu", "itemE", "basis");
	drawGraph(dataSet, "Dongdaemungu", "itemF", "basis");
	drawGraph(dataSet, "Jungnanggu", "itemG", "basis");
	drawGraph(dataSet, "Seongbukgu", "itemH", "basis");
	drawGraph(dataSet, "Gangbukgu", "itemI", "basis");
	drawGraph(dataSet, "Dobonggu", "itemJ", "basis");
	drawGraph(dataSet, "Nowongu", "itemK", "basis");
	drawGraph(dataSet, "Eunpyeonggu", "itemL", "basis");
	drawGraph(dataSet, "Seodaemungu", "itemM", "basis");
	drawGraph(dataSet, "Mapogu", "itemN", "basis");
	drawGraph(dataSet, "Yangcheongu", "itemO", "basis");
	drawGraph(dataSet, "Gangseogu","itemP", "basis"); 
	drawGraph(dataSet, "Gurogu", "itemQ", "basis");
	drawGraph(dataSet, "Geumcheongu", "itemR", "basis");
	drawGraph(dataSet, "Yeongdeungpogu", "itemS", "basis");
	drawGraph(dataSet, "Dongjakgu", "itemT", "basis");
	drawGraph(dataSet, "Gwanakgu", "itemU", "basis");
	drawGraph(dataSet, "Seochogu", "itemV", "basis");
	drawGraph(dataSet, "Gangnamgu", "itemW", "basis");
	drawGraph(dataSet, "Songpagu", "itemX", "basis");
	drawGraph(dataSet, "Gangdonggu","itemY", "basis");
	drawScale();
function drawGraph(dataSet, itemName, cssClassName, type) {
	var line = d3.svg.line()
		.x(function(d,i) {
	 	 return offsetX + i * margin;
		})
		.y(function(d,i) {
	 	 return svgHeight - (d[itemName] * scale) - offsetY;
		})
		.interpolate(type)
		
  	var lineElements= d3.select("#myGraph2")
  		.append("path")
  		.attr("class","line "+cssClassName)
  		.attr("d", line(dataSet))
}

function drawScale(){
	var yScale = d3.scale.linear()
		.domain([0,10])
		.range([scale*10,0])
	d3.select("#myGraph2")
		.append("g")
		.attr("class", "axis")
		.attr("transform", "translate("+offsetX+", "+offsetY+")")
		.call(
			d3.svg.axis()
			.scale(yScale)
			.orient("left")
		)
	var xScale = d3.scale.linear()
		.domain([new Date("2005/1/1"), new Date("2014/1/1")])
		.range([0, svgWidth])

	d3.select("#myGraph2")
		.append("g")
		.attr("class", "axis")
		.attr("transform", "translate("+offsetX+", "+(svgHeight-offsetY)+")")
		.call(
		 d3.svg.axis()
			.scale(xScale)
			.orient("bottom")
			.ticks(10)
			.tickFormat(function(d, i){
			  var fmtFunc = d3.time.format("%Y년%m월");
			  return fmtFunc(d);
			})  
		)
		.selectAll("text")
		.attr("transform", "rotate(90)")
		.attr("dx", "0.7em")
		.attr("dy", "-0.4em")
		.style("text-anchor", "start")

		.selectAll(".xTicks")
		.data(x.ticks(5))
		.enter().append("svg:line")
		.attr("class","xTicks")
		.attr("x1",function(d){return x(d);})
		.attr("y1",y(startAge)).attr("x2",function(d){return x(d);})
		.attr("y2",y(startAge)+7)

		.selectAll(".yTicks")
		.data(y.ticks(4))
		.enter().append("svg:line")
		.attr("class","yTicks")
		.attr("y1",function(d){return y(d);})
		.attr("x1",x(2004.5)).attr("y2",function(d){return y(d);}).attr("x2",x(2005))
	}
