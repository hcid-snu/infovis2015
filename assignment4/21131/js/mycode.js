drawPie("data/2008.csv")

d3.select("#year").on("change", function() { 
  d3.select("#myGraph").selectAll("*").remove()
  drawPie("data/" + this.value + ".csv", this.value)
})

function drawPie(filename) {
  
  d3.csv(filename, function(error, data){
  
    // svg 요소의 크기를 구한다
    var svgEle = document.getElementById("myGraph")
    var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
    var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
    svgWidth = parseFloat(svgWidth) // remove px
    svgHeight = parseFloat(svgHeight) // remove px
  
    // console.log(svgWidth);
    // console.log(svgHeight);

    // 데이터 로딩
    var dataSet = []  // empty array to store data
    var dataLabel = []  // empty array to store label
    for(var i = 0; i < data.length; i++) {
      dataSet.push(data[i].occurrence)
      dataLabel.push(data[i].region)
    }
  
    // console.log(dataSet)
    console.log(dataLabel)
  
    var color = d3.scale.category20()
  
    // pie chart layout 설정
    var pie = d3.layout.pie().sort(null)
  
    // pie chart 크기 설정
    var arc = d3.svg.arc().innerRadius(80).outerRadius(280)
  
    // pie chart 그리기 준비
    var pieElements = d3.select("#myGraph")
      .selectAll("g")
      .data(pie(dataSet))
      .enter()
      .append("g")
      .attr("transform", "translate(" + (svgWidth/2 - 80)  + ", " + svgHeight/2 + ")") // g 의 중심을 원의 가운데로 이동
    

    var textElements_2 = d3.select("#myGraph")
      .selectAll("text")
      .data(dataLabel)
      .enter()

    // d3.select(#myGraph)
    //   .append("text")
    //   .attr("x", 10)
    //   .attr("y", 10)
    //   .text(filename)

    // 데이터 추가
    pieElements
      .append("path")
      .attr("class", "pie")
      .style("fill", function(d, i) { return color(i) })
      .transition()
      .duration(100)
      .delay(function(d, i) { return i * 100 })
      .ease("linear")
      .attrTween("d", function(d, i) {
        var interpolate = d3.interpolate(
          // 각 부분의 시작 각도
          { startAngle: d.startAngle, endAngle: d.startAngle },
          // 각 부분의 종료 각도
          { startAngle: d.startAngle, endAngle: d.endAngle }
        )
        return function(t) { return arc(interpolate(t) )}
      })
    
    // 파이 데이터의 총 합을 표시
    var textElements = d3.select("#myGraph")
      .append("text")
      .attr("class", "total")
      .attr("transform", "translate(" + (svgWidth/2 - 80) + ", " + svgHeight/2  + ")")
      .text("Total: " + d3.sum(dataSet))
  
      function midAngle(d){
        return d.startAngle + (d.endAngle - d.startAngle)/2;
      }

    // 파이 데이터 개별 값을 표시
    pieElements
      .append("text") // 데이터 수만큼 text 요소가 추가됨
      .attr("class", "pieNum")  // CSS 클래스 설정
      .attr("transform", function(d, i){
        return "translate(" + arc.centroid(d) + ")"    // 부채꼴의 중심으로 함(무게 중심 계산)
      })
      .text(function(d, i){
        return  d.value // dataLabel[i]+ " - " +
      })
      // .attr("transform", function(d, i) {
      //   return "rotate("+ midAngle(d) +")"
      // })


    textElements_2
      .append("text")
      .attr("class", "region")
      .attr("transform", function (d, i) {
        return "translate(780," + (52 + (i*20)) + ")"
      })
      .text(function(d, i) { return dataLabel[i] })

    var rectElements = d3.select("#myGraph")
      .selectAll("rect")
      .data(dataSet)
      .enter()

    rectElements
      .append("rect")
      .style("fill", function(d, i) { return color(i) })
      .attr("width", 16)
      .attr("height", 16)
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("transform", function (d, i) {
        return "translate(755," + (39 + (i*20)) + ")"
      })

    d3.select("#myGraph")
    .append("text")
    .attr("x", 880)
    .attr("y", 20)
    .attr("text-anchor", "end")
    .text("<Color coding>")

    d3.select("#myGraph")
      .append("text")
      .attr("class", "info")
      .attr("x", 870)
      .attr("y", 34)
      .text("(Clockwise from top)")
  })
  
}




// var svg = d3.select("body")
//   .append("svg")
//   .append("g")

// svg.append("g")
//   .attr("class", "slices");
// svg.append("g")
//   .attr("class", "labels");
// svg.append("g")
//   .attr("class", "lines");

// var width = 960,
//     height = 450,
//   radius = Math.min(width, height) / 2;

// var pie = d3.layout.pie()
//   .sort(null)
//   .value(function(d) {
//     return d.value;
//   });

// var arc = d3.svg.arc()
//   .outerRadius(radius * 0.8)
//   .innerRadius(radius * 0.4);

// var outerArc = d3.svg.arc()
//   .innerRadius(radius * 0.9)
//   .outerRadius(radius * 0.9);

// svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// var key = function(d){ return d.dataLabel; };

// var color = d3.scale.ordinal()
//   .domain(["Jong-ro", "Joong", "Yong-san", "Seong-dong", "Gwang-jin", "Dong-dae-mun", "Joong-lang", "Seong-buk", "Gang-buk", "Do-bong", "No-won", 
//     "Eun-pyeong", "Seo-dae-mun", "Ma-po", "Yang-cheon", "Gang-seo", "Gu-ro", "Geum-cheon", "Young-deung-po", "Dong-jak", "Gwan-ak", "Seo-cho", "Gang-nam",
//     "Song-pa", "Gang-dong"])
//   .range(["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", 
//     "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5", "#393b79", "#9c9ede", "#8c6d31",
//     "#e7ba52", "#ad494a"]);


// function change(filename) {


//   d3.csv(filename, function(error, data){


//  var dataSet = []  // empty array to store data
//     var dataLabel = []  // empty array to store label
//     for(var i = 0; i < data.length; i++) {
//       dataSet.push(data[i].occurrence)
//       dataLabel.push(data[i].region)
//     }


//   /* ------- PIE SLICES -------*/
//   var slice = svg.select(".slices").selectAll("path.slice")
//     .data(pie(dataSet), key);

//   slice.enter()
//     .insert("path")
//     .style("fill", function(d) { return color(d.dataLabel); })
//     .attr("class", "slice");

//   slice   
//     .transition().duration(1000)
//     .attrTween("d", function(d) {
//       this._current = this._current || d;
//       var interpolate = d3.interpolate(this._current, d);
//       this._current = interpolate(0);
//       return function(t) {
//         return arc(interpolate(t));
//       };
//     })

//   slice.exit()
//     .remove();

//   /* ------- TEXT LABELS -------*/

//   var text = svg.select(".labels").selectAll("text")
//     .data(pie(dataSet), key);

//   text.enter()
//     .append("text")
//     .attr("dy", ".35em")
//     .text(function(d) {
//       return d.dataLabel;
//     });
  
//   function midAngle(d){
//     return d.startAngle + (d.endAngle - d.startAngle)/2;
//   }

//   text.transition().duration(1000)
//     .attrTween("transform", function(d) {
//       this._current = this._current || d;
//       var interpolate = d3.interpolate(this._current, d);
//       this._current = interpolate(0);
//       return function(t) {
//         var d2 = interpolate(t);
//         var pos = outerArc.centroid(d2);
//         pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
//         return "translate("+ pos +")";
//       };
//     })
//     .styleTween("text-anchor", function(d){
//       this._current = this._current || d;
//       var interpolate = d3.interpolate(this._current, d);
//       this._current = interpolate(0);
//       return function(t) {
//         var d2 = interpolate(t);
//         return midAngle(d2) < Math.PI ? "start":"end";
//       };
//     });

//   text.exit()
//     .remove();

//   /* ------- SLICE TO TEXT POLYLINES -------*/

//   var polyline = svg.select(".lines").selectAll("polyline")
//     .data(pie(dataSet), key);
  
//   polyline.enter()
//     .append("polyline");

//   polyline.transition().duration(1000)
//     .attrTween("points", function(d){
//       this._current = this._current || d;
//       var interpolate = d3.interpolate(this._current, d);
//       this._current = interpolate(0);
//       return function(t) {
//         var d2 = interpolate(t);
//         var pos = outerArc.centroid(d2);
//         pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
//         return [arc.centroid(d2), outerArc.centroid(d2), pos];
//       };      
//     });
  
//   polyline.exit()
//     .remove();

// })
// };