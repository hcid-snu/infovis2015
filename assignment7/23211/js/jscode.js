var width = 1000, height = 1000, centered

var svg = d3.select("#map").append("svg")
.attr("width", width)
.attr("height", height)

var korea = svg.append("g").attr("id", "korea")
var places = svg.append("g").attr("id", "places")

// 어떤 도법을 사용할 것인가 지정해주는 부분 
	var projection = d3.geo.mercator()
	.center([127.992484, 36.943275]) // 지도의 중심이 될 좌표를 설정
	.scale(8000)
.translate([width/2, height/3])

var path = d3.geo.path().projection(projection)

var popByName = d3.map()

queue()
	.defer(d3.json, "map/skorea_submunicipalities_topo_simple.json")
	.defer(d3.csv, "data/traffic-accident.csv", function(d) { popByName.set(d.name, +d.value) })
.await(ready)


function ready(error, data) {
	var features = topojson.feature(data, data.objects.skorea_submunicipalities_geo).features

		var colorScale = d3.scale.quantize()
		.domain([0, 2000])
		.range(d3.range(9).map(function(i) { return "p" + i }))
		// range를 9 단계로 나눠놓고 p0, p1 ... p8

	korea.selectAll("path")
		.data(features)
		.enter()
		.append("path")
		.attr("class", function(d) {			
				return "municipality " + d.properties.code			
		})
		.attr("d", path)
		.attr("id", function(d) { return d.properties.name })
		.on('mouseover', function(d,i){
			if(!korea.selectAll('text' + '.c' + d.properties.code).classed('show')){
				if(d3.select(this).classed('fillNone')){
				d3.select(this).classed('fillNone', false)
			}			
				d3.select(this).classed('fillTra', true)
			}
		 })
		.on('mouseout', function(d,i){
			if(!korea.selectAll('text' + '.c' + d.properties.code).classed('show')){
				if(d3.select(this).classed('fillTra')){
				d3.select(this).classed('fillTra', false)
			}
			d3.select(this).classed('fillNone', true)
			}
		})
		.on('click', clicked)
		 
	korea.selectAll("text")
		.data(features)
		.enter()
		.append("text")
		.attr("class", function(d) {
			return 'c'+d.properties.code + ' name' 
			// JAEMIN: mystyle.css에 .name { fill: none }을 .show 선언 위에 추가해야합니다. 각 텍스트는 name이라는 클래스와 코드에 c가 접두사로 붙은 이름을 클래스로 가집니다. 예를들어 c37330
			
		})
		.classed("show", false) // JAEMIN: 모든 텍스트는 기본적으로 show 클래스가 지정되어있지 않으므로 위에서 지정한 name클래스가 우선하여 fill:none이 적용됩니다. 따라서 모든 레이블은 초기에 가려져 있습니다.
		.attr("transform", function(d) { return "translate(" + path.centroid(d) + ")" })
		.attr("dy", ".35em")
		.text(function(d) {				
			return  d.properties.name 
		})
}

function clicked(d) {
	var x, y, k
		if (d && centered != d) {
			var centroid = path.centroid(d)
				x = centroid[0]
				y = centroid[1]
				k = 4
				centered = d
		} else {
			    x = width / 2
				y = height / 2
				k = 1
				centered = null
		}

	korea.selectAll("path")
		.classed("active", centered && function(d) { return d == centered })

		korea.transition()
		.duration(750)
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")


	if(!korea.selectAll('text' + '.c' + d.properties.code).classed('show')){
		korea.selectAll('text').classed('show', false);
		korea.selectAll('path').classed('fillTra', false);	
		korea.selectAll('text' + '.c' + d.properties.code)
		.classed('show', true);
		korea.selectAll('path'+'.municipality'+ d.properties.code+'.active')
		.classed('fillTra', true);
	}
	else{
		korea.selectAll('text' + '.c' + d.properties.code)
		.classed('show', false);
		korea.selectAll('path'+'.municipality'+ d.properties.code+'.active')
		.classed('fillTra', true)		
	}

	
}