d3.json("region10.json", function(error, data) {
	var dataSet = [];
	var svgEle = document.getElementById("myGraph2");
	var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
	var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
	svgWidth = parseFloat(svgWidth) - 60;
	svgHeight = parseFloat(svgHeight) - 60;
	var offsetX = 30;
	var offsetY = 20;
	var scale = 2.0;
	var rangeYear = 10;
	var year = d3.extent(data, function(d){
		return d.year;
	});
	var startYear = year[2005];
	var currentYear = 2014
	var margin = svgWidth / (rangeYear - 1);

	pickupData(data, currentYear-startYear);
	drawGraph(dataSet, "Jongro-gu", "itemA", "linear");
	drawGraph(dataSet, "Jung-gu", "itemB", "linear");
	drawGraph(dataSet, "Yongsan-gu", "itemC","linear");
	drawGraph(dataSet, "Seongdong-gu","itemD","linear");
	drawGraph(dataSet, "Gwangjin-gu", "itemE", "linear");
	drawGraph(dataSet, "Dongdaemun-gu", "itemF", "linear");
	drawGraph(dataSet, "Jungnang-gu", "itemG", "linear");
	drawGraph(dataSet, "Seongbuk-gu", "itemH", "linear");
	drawGraph(dataSet, "Gangbuk-gu", "itemI", "linear");
	drawGraph(dataSet, "Dobong-gu", "itemJ", "linear");
	drawGraph(dataSet, "Nowon-gu", "itemK", "linear");
	drawGraph(dataSet, "Eunpyeong-gu", "itemL", "linear");
	drawGraph(dataSet, "Seodaemun-gu", "itemM", "linear");
	drawGraph(dataSet, "Mapo-gu", "itemN", "linear");
	drawGraph(dataSet, "Yangcheon-gu", "itemO", "linear");
	drawGraph(dataSet, "Gangseo-gu","itemP", "linear"); 
	drawGraph(dataSet, "Guro-gu", "itemQ", "linear");
	drawGraph(dataSet, "Geumcheon-gu", "itemR", "linear");
	drawGraph(dataSet, "Yeongdeungpo-gu", "itemS", "linear");
	drawGraph(dataSet, "Dongjak-gu", "itemT", "linear");
	drawGraph(dataSet, "Gwanak-gu", "itemU", "linear");
	drawGraph(dataSet, "Seocho-gu", "itemV", "linear");
	drawGraph(dataSet, "Gangnam-gu", "itemW", "linear");
	drawGraph(dataSet, "Songpa-gu", "itemX", "linear");
	drawGraph(dataSet, "Gangdong-gu","itemY", "linear");
	drawScale();

	function drawGraph(dataSet, itemName, cssClassName, type){
		var line = d3.svg.line()
		  .x(function(d, i){
		  	return offsetX + i * margin; 	  	
		  })
		  .y(function(d, i){
		  	return svgHeight - (d[itemName]*scale) - offsetY;
		  })
		  .interpolate(type)
		var lineElements = d3.select("#myGraph2")
		  .append("path")
		  .attr("class", "line "+cssClassName)
		  .attr("d", line(dataSet))
	}
	function drawScale(){
		var yScale = d3.scale.linear()
		  .domain([0, 100])
		  .range([scale*100, 0])
		d3.select("#myGraph2")
		  .append("g")
		  .attr("class", "axis")
		  .attr("transform", "translate(" + offsetX+", "+((100-(scale-1)*100)+offsetY)+")")
		  .call(
		  	d3.svg.axis()
		  	  .scale(yScale)
		  	  .orient("left")
		  )
	var xScale = d3.time.scale()
	  .domain([new Date(currentYear+"/1/1"),
	  	new Date((currentYear + rangeYear - 1)+"/1/1")])
	  .range([0, svgWidth])
	d3.select("#myGraph2")
	  .append("g")
	  .attr("class", "axis")
	  .attr("transform", "translate("+offsetX+", "+(svgHeight - offsetY)+")")
	  .call(
	  	d3.svg.axis()
	  	  .scale(xScale)
	  	  .orient("bottom")
	  	  .ticks(10)
	  	  .tickFormat(function(d,i){
	  	  	var fmtFunc = d3.time.format("%Y년");
	  	  	return fmtFunc(d);
	  	  })
	  )
	  .selectAll("text")
	  .attr("transform", "rotate(90)")
	  .attr("dx", "0.7em")
	  .attr("dy", "-0.4em")
	  .style("text-anchor", "start")	  
	}
	function pickupData(data,start){
		dataSet = [];
		for(var i=0; i<rangeYear; i++){
			dataSet[i] = data[start+1];
		}
		d3.select("#myGraph2").selectAll("*").remove();		
	}
	d3.select("#prev").on("click", function() {
		if (currentYear > year[0]){
			currentYear = currentYear-1;
		}
		pickupData(data, currentYear-startYear);
		drawGraph(dataSet, "Jongro-gu", "itemA", "linear");
		drawGraph(dataSet, "Jung-gu", "itemB", "linear");
		drawGraph(dataSet, "Yongsan-gu", "itemC","linear");
		drawGraph(dataSet, "Seongdong-gu","itemD","linear");
		drawGraph(dataSet, "Gwangjin-gu", "itemE", "linear");
		drawGraph(dataSet, "Dongdaemun-gu", "itemF", "linear");
		drawGraph(dataSet, "Jungnang-gu", "itemG", "linear");
		drawGraph(dataSet, "Seongbuk-gu", "itemH", "linear");
		drawGraph(dataSet, "Gangbuk-gu", "itemI", "linear");
		drawGraph(dataSet, "Dobong-gu", "itemJ", "linear");
		drawGraph(dataSet, "Nowon-gu", "itemK", "linear");
		drawGraph(dataSet, "Eunpyeong-gu", "itemL", "linear");
		drawGraph(dataSet, "Seodaemun-gu", "itemM", "linear");
		drawGraph(dataSet, "Mapo-gu", "itemN", "linear");
		drawGraph(dataSet, "Yangcheon-gu", "itemO", "linear");
		drawGraph(dataSet, "Gangseo-gu","itemP", "linear"); 
		drawGraph(dataSet, "Guro-gu", "itemQ", "linear");
		drawGraph(dataSet, "Geumcheon-gu", "itemR", "linear");
		drawGraph(dataSet, "Yeongdeungpo-gu", "itemS", "linear");
		drawGraph(dataSet, "Dongjak-gu", "itemT", "linear");
		drawGraph(dataSet, "Gwanak-gu", "itemU", "linear");
		drawGraph(dataSet, "Seocho-gu", "itemV", "linear");
		drawGraph(dataSet, "Gangnam-gu", "itemW", "linear");
		drawGraph(dataSet, "Songpa-gu", "itemX", "linear");
		drawGraph(dataSet, "Gangdong-gu","itemY", "linear");
		drawScale();
	})
	d3.select("#next").on("click", function(){
		if (currentYear <= year[1]-rangeYear){
			currentYear = currentYear + 1;
		}
		pickupData(data, currentYear-startYear);
		drawGraph(dataSet, "Jongro-gu", "itemA", "linear");
		drawGraph(dataSet, "Jung-gu", "itemB", "linear");
		drawGraph(dataSet, "Yongsan-gu", "itemC","linear");
		drawGraph(dataSet, "Seongdong-gu","itemD","linear");
		drawGraph(dataSet, "Gwangjin-gu", "itemE", "linear");
		drawGraph(dataSet, "Dongdaemun-gu", "itemF", "linear");
		drawGraph(dataSet, "Jungnang-gu", "itemG", "linear");
		drawGraph(dataSet, "Seongbuk-gu", "itemH", "linear");
		drawGraph(dataSet, "Gangbuk-gu", "itemI", "linear");
		drawGraph(dataSet, "Dobong-gu", "itemJ", "linear");
		drawGraph(dataSet, "Nowon-gu", "itemK", "linear");
		drawGraph(dataSet, "Eunpyeong-gu", "itemL", "linear");
		drawGraph(dataSet, "Seodaemun-gu", "itemM", "linear");
		drawGraph(dataSet, "Mapo-gu", "itemN", "linear");
		drawGraph(dataSet, "Yangcheon-gu", "itemO", "linear");
		drawGraph(dataSet, "Gangseo-gu","itemP", "linear"); 
		drawGraph(dataSet, "Guro-gu", "itemQ", "linear");
		drawGraph(dataSet, "Geumcheon-gu", "itemR", "linear");
		drawGraph(dataSet, "Yeongdeungpo-gu", "itemS", "linear");
		drawGraph(dataSet, "Dongjak-gu", "itemT", "linear");
		drawGraph(dataSet, "Gwanak-gu", "itemU", "linear");
		drawGraph(dataSet, "Seocho-gu", "itemV", "linear");
		drawGraph(dataSet, "Gangnam-gu", "itemW", "linear");
		drawGraph(dataSet, "Songpa-gu", "itemX", "linear");
		drawGraph(dataSet, "Gangdong-gu","itemY", "linear");
		drawScale();
	});
});
