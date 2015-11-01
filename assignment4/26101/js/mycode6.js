var svgWidth = 400;
var svgHeight = 200;
var offsetX = 30;
var offsetY = 25;
var scale = 10;
var dataSet = [
	{ year : 2005, Jongrogu : 4, Junggu : 3, Yongsangu : 10, Seongdonggu : 7, Gwangjingu : 8 ,Dongdaemungu : 2, Jungnanggu : 3 ,Seongbukgu : 6, Gangbukgu : 3 , Dobonggu : 2, Nowongu : 3, Eunpyeonggu : 2, Seodaemungu : 4, Mapogu : 8, Yangcheongu : 9, Gangseogu : 7, Gurogu : 8, Geumcheongu : 3, Yeongdeungpogu : 11 ,Dongjakgu : 3, Gwanakgu : 5 ,Seochogu : 7 , Gangnamgu : 12 ,Songpagu : 12, Gangdonggu : 4},
  	{ year: 2006, Jongrogu : 6 ,Junggu : 7 ,Yongsangu : 7 ,Seongdonggu : 6 ,Gwangjingu : 3 ,Dongdaemungu: 8,Jungnanggu: 1 ,Seongbukgu: 3 ,
    Gangbukgu: 1 ,
    Dobonggu: 3 ,
    Nowongu: 7 ,
    Eunpyeonggu: 6 ,
    Seodaemungu: 4 ,
    Mapogu: 7 ,
    Yangcheongu: 2 ,
    Gangseogu: 5 ,
    Gurogu: 3 ,
    Geumcheongu: 2 ,
    Yeongdeungpogu: 10 ,
    Dongjakgu: 5 ,
    Gwanakgu: 5 ,
    Seochogu: 6 ,
    Gangnamgu: 11 ,
    Songpagu: 4 ,
    Gangdonggu: 1 },
    {year: 2007, 
    Jongrogu: 4 ,
    Junggu: 5 ,
    Yongsangu: 5 ,
    Seongdonggu: 5 ,
    Gwangjingu: 3 ,
    Dongdaemungu: 6 ,
    Jungnanggu: 4 ,
    Seongbukgu: 1 ,
    Gangbukgu: 3 ,
    Dobonggu: 1 ,
    Nowongu: 3 ,
    Eunpyeonggu: 5 ,
    Seodaemungu: 1 ,
    Mapogu: 6 ,
    Yangcheongu: 4 ,
    Gangseogu: 5 ,
    Gurogu: 3 ,
    Geumcheongu: 7 ,
    Yeongdeungpogu: 11 ,
    Dongjakgu: 4 ,
    Gwanakgu: 3 ,
    Seochogu: 9 ,
    Gangnamgu: 12 ,
    Songpagu: 7 ,
    Gangdonggu: 3 },
    {year : 2008, 
    Jongrogu: 8 ,
    Junggu: 3 ,
    Yongsangu: 8 ,
    Seongdonggu: 7 ,
    Gwangjingu: 3 ,
    Dongdaemungu: 9 ,
    Jungnanggu: 5 ,
    Seongbukgu: 4 ,
    Gangbukgu: 6 ,
    Dobonggu: 5 ,
    Nowongu: 7 ,
    Eunpyeonggu: 2 ,
    Seodaemungu: 3 ,
    Mapogu: 4 ,
    Yangcheongu: 3 ,
    Gangseogu: 4 ,
    Gurogu: 7 ,
    Geumcheongu: 4 ,
    Yeongdeungpogu: 8 ,
    Dongjakgu: 2 ,
    Gwanakgu: 5 ,
    Seochogu: 4 ,
    Gangnamgu: 13 ,
    Songpagu: 12 ,
    Gangdonggu: 6 },
    {year : 2009, 
    Jongrogu: 5 ,
    Junggu: 0 ,
    Yongsangu: 10 ,
    Seongdonggu: 7 ,
    Gwangjingu: 8 ,
    Dongdaemungu: 8 ,
    Jungnanggu: 2 ,
    Seongbukgu: 3 ,
    Gangbukgu: 6 ,
    Dobonggu: 3 ,
    Nowongu: 6 ,
    Eunpyeonggu: 4 ,
    Seodaemungu: 8 ,
    Mapogu: 4 ,
    Yangcheongu: 4 ,
    Gangseogu: 2 ,
    Gurogu: 2 ,
    Geumcheongu: 3 ,
    Yeongdeungpogu: 10 ,
    Dongjakgu: 7 ,
    Gwanakgu: 4 ,
    Seochogu: 4 ,
    Gangnamgu: 6 ,
    Songpagu: 12 ,
    Gangdonggu: 4 },
    {year : 2010, 
    Jongrogu: 3 ,
    Junggu: 3 ,
    Yongsangu: 5 ,
    Seongdonggu: 4 ,
    Gwangjingu: 7 ,
    Dongdaemungu: 3 ,
    Jungnanggu: 1 ,
    Seongbukgu: 0 ,
    Gangbukgu: 2 ,
    Dobonggu: 2 ,
    Nowongu: 3 ,
    Eunpyeonggu: 5 ,
    Seodaemungu: 3 ,
    Mapogu: 10 ,
    Yangcheongu: 4 ,
    Gangseogu: 2 ,
    Gurogu: 6 ,
    Geumcheongu: 5 ,
    Yeongdeungpogu: 6 ,
    Dongjakgu: 6 ,
    Gwanakgu: 4 ,
    Seochogu: 5 ,
    Gangnamgu: 12 ,
    Songpagu: 5 ,
    Gangdonggu: 2 },
    {year : 2011,
    Jongrogu: 1 ,
    Junggu: 4 ,
    Yongsangu: 5 ,
    Seongdonggu: 5 ,
    Gwangjingu: 4 ,
    Dongdaemungu: 4 ,
    Jungnanggu: 3 ,
    Seongbukgu: 5 ,
    Gangbukgu: 2 ,
    Dobonggu: 6 ,
    Nowongu: 1 ,
    Eunpyeonggu: 2 ,
    Seodaemungu: 4 ,
    Mapogu: 5 ,
    Yangcheongu: 3 ,
    Gangseogu: 7 ,
    Gurogu: 4 ,
    Geumcheongu: 1 ,
    Yeongdeungpogu: 6 ,
    Dongjakgu: 3 ,
    Gwanakgu: 6 ,
    Seochogu: 7 ,
    Gangnamgu: 13 ,
    Songpagu: 8 ,
    Gangdonggu: 3 },
    {year : 2012, Jongrogu: 2,
    Junggu: 2 ,
    Yongsangu: 4 ,
    Seongdonggu: 2 ,
    Gwangjingu: 1 ,
    Dongdaemungu: 4 ,
    Jungnanggu: 2 ,
    Seongbukgu: 1 ,
    Gangbukgu: 0 ,
    Dobonggu: 1 ,
    Nowongu: 1 ,
    Eunpyeonggu: 3 ,
    Seodaemungu: 5 ,
    Mapogu: 6 ,
    Yangcheongu: 4 ,
    Gangseogu: 6 ,
    Gurogu: 10 ,
    Geumcheongu: 2 ,
    Yeongdeungpogu: 8 ,
    Dongjakgu: 4 ,
    Gwanakgu: 3 ,
    Seochogu: 4 ,
    Gangnamgu: 6 ,
    Songpagu: 4 ,
    Gangdonggu: 3 },
    { year: 2013,
    Jongrogu: 4 ,
    Junggu: 2 ,
    Yongsangu: 4 ,
    Seongdonggu: 0 ,
    Gwangjingu: 2 ,
    Dongdaemungu: 2 ,
    Jungnanggu: 3 ,
    Seongbukgu: 1 ,
    Gangbukgu: 0 ,
    Dobonggu: 0 ,
    Nowongu: 7 ,
    Eunpyeonggu: 2 ,
    Seodaemungu: 4 ,
    Mapogu: 6 ,
    Yangcheongu: 3 ,
    Gangseogu: 3 ,
    Gurogu: 1 ,
    Geumcheongu: 3 ,
    Yeongdeungpogu: 7 ,
    Dongjakgu: 4 ,
    Gwanakgu: 6 ,
    Seochogu: 6 ,
    Gangnamgu: 12 ,
    Songpagu: 5 ,
    Gangdonggu: 4 },
    {year : 2014, 
    Jongrogu: 3 ,
    Junggu: 2 ,
    Yongsangu: 2 ,
    Seongdonggu: 5 ,
    Gwangjingu: 3 ,
    Dongdaemungu: 5 ,
    Jungnanggu: 2 ,
    Seongbukgu: 6 ,
    Gangbukgu: 3 ,
    Dobonggu: 2 ,
    Nowongu: 1 ,
    Eunpyeonggu: 1 ,
    Seodaemungu: 2 ,
    Mapogu: 4 ,
    Yangcheongu: 2 ,
    Gangseogu: 8 ,
    Gurogu: 2 ,
    Geumcheongu: 3 ,
    Yeongdeungpogu: 0 ,
    Dongjakgu: 2 ,
    Gwanakgu: 5 ,
    Seochogu: 1 ,
    Gangnamgu: 4 ,
    Songpagu: 2 ,
    Gangdonggu: 2 }
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
		
  	var lineElements= d3.select("#myGraph3")
  		.append("path")
  		.attr("class","line "+cssClassName)
  		.attr("d", line(dataSet))
}

function drawScale(){
	var yScale = d3.scale.linear()
		.domain([0,14])
		.range([scale*14,0])
	d3.select("#myGraph3")
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

	d3.select("#myGraph3")
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

	}
