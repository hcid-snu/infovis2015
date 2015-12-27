var width = 800, height = 1000, centered

var svg = d3.select("#map").append("svg")
.attr("width", width)
.attr("height", height)

var korea = svg.append("g").attr("id", "korea")
var places = svg.append("g").attr("id", "places")

// 어떤 도법을 사용할 것인가 지정해주는 부분 
	var projection = d3.geo.mercator()
	.center([127.9895, 36.3651]) // 지도의 중심이 될 좌표를 설정
	.scale(7000)
.translate([width/2, height/3])

var path = d3.geo.path().projection(projection)

var popByName = d3.map()

queue()
	.defer(d3.json, "map/municipalities-topo-simple.json")
	.defer(d3.csv, "data/traffic-accident.csv", function(d) { popByName.set(d.name, +d.value) })
.await(ready)


function ready(error, data) {
	// console.log(popByName)
	var features = topojson.feature(data, data.objects.municipalities_geo).features

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
		.on('click', clicked)
		//     .on('mouseover', function(d,i){
		// 	// tip.show.apply(this, arguments);
		// 	d3.select(this)
		//          .style('fill', 'orange');
		// })

	korea.selectAll("text")
		.data(features)
		.enter()
		.append("text")
		.attr("class", function(d) {
			return 'c'+d.properties.code + ' name' // JAEMIN: mystyle.css에 .name { fill: none }을 .show 선언 위에 추가해야합니다. 각 텍스트는 name이라는 클래스와 코드에 c가 접두사로 붙은 이름을 클래스로 가집니다. 예를들어 c37330
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


	korea.selectAll('text').classed('show', false); // JAEMIN: 선택을 했다면 일단 모든 레이블에서 show클래스를 지웁니다. 왜냐하면 과거에 선택된 레이블을 가리기 위함입니다.

	korea.selectAll('text' + '.c' + d.properties.code) // JAEMIN: 그 다음 text중에서 현재 선택된 지역코드를 클래스를 가진 레이블을 고릅니다. text.c37330 처럼요
		.classed("show", true) // JAEMIN: 그 다음 그 텍스트에 show 클래스를 추가합니다. name클래스 아래에 show클래스가 정의되었으므로 show가 우선 적용되어 fill: red가 적용됩니다.
		console.log(d.properties.code)
		// 위에서 정한 class 이름만 선택해서 표시하고 싶은데 잘 안 되네요.
}






// d3.json("map/seoul_municipalities_topo_simple.json", function(error, data) {

// 	if (error) { return console.error(error) }
// 	// console.log(data)
// 	var features = topojson.feature(data, data.objects.seoul_municipalities_geo).features
// 	// var features = topojson.feature(data, data.objects["seoul_municipalities_geo"]).features
// 	// 두개는 같은 기능. array 형태로 넣느냐 method 형태로 넣느냐의 차이 
// 	console.log(features)

// 	seoul.selectAll("path")
// 			.data(features)
// 			.enter()
// 			.append("path")
// 			.attr("class", function(d) {
// 				console.log(d.properties.code)
// 				return "municipality c" + d.properties.code
// 			})
// 			.attr("d", path)
// 			.on("click", clicked)
// 			// click이 되었을 때 clicked라는 함수 호출

// 	seoul.selectAll("text")
// 			.data(features)
// 			.enter()
// 			.append("text")
// 			.attr("class", "municipality-label")
// 			// translate 없이 하면 각 구의 왼쪽 상단에 붙어서 글자가 출력된다 
// 			.attr("transform", function(d) { return "translate(" + path.centroid(d) + ")" })
// 			.attr("dy", ".35em")
// 			.text(function(d) { return d.properties.name })

// 	d3.csv("data/places.csv", function(error, data) {
// 		places.selectAll("circle")
// 				.data(data)
// 				.enter()
// 				.append("circle")
// 				.attr("cx", function(d) { return projection([d.lon, d.lat])[0] })
// 				.attr("cy", function(d) { return projection([d.lon, d.lat])[1] })
// 				.attr("r", 1)

// 		places.selectAll("text")
// 	      .data(data)
// 	    	.enter()
// 				.append("text")
// 	      .attr("x", function(d) { return projection([d.lon, d.lat])[0] })
// 	      .attr("y", function(d) { return projection([d.lon, d.lat])[1] + 8 })
// 				.attr("dx", "2pt")
// 				.attr("dy", "-.40em")
// 	      .text(function(d) { return d.name })
// 	})

// 	/// centered 라는 switch를 만들겠다
// 	function clicked(d) {
// 	  var x, y, k
// 	  if (d && centered != d) {
// 	    var centroid = path.centroid(d)
// 	    x = centroid[0]
// 	    y = centroid[1]
// 	    k = 4 // k: scale factor
// 	    centered = d 
// 	    // 현재 path를 center로 지정해 줌
// 	    // 즉, 다시 click하면 이 if 문이 실행되지 않음
// 	  } else {
// 	    x = width / 2
// 	    y = height / 2
// 	    k = 1
// 	    centered = null
// 	    // x, y에 화면에 중심을 할당
// 	  }

// 	  seoul.selectAll("path")
// 	      .classed("active", centered && function(d) { return d == centered })
// 	      // path에 class를 하나 추가해주는 부분

// 	  seoul.transition()
// 	      .duration(750)
// 	      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")

// 	  places.transition()
// 	      .duration(750)
// 	      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")

// 		places.selectAll("circle")
// 				.classed("show", centered && k == 4)

// 		places.selectAll("text")
// 				.classed("show", centered && k == 4)

// 	}

// })


