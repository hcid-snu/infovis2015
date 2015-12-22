d3.csv("data/mydata_agent.csv", function(error, data){

  // svg 요소의 크기를 구한다
  var svgEle = document.getElementById("agentPie")
  var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
  var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
  svgWidth = parseFloat(svgWidth) // remove px
  svgHeight = parseFloat(svgHeight) // remove px

  // 데이터 로딩
  var dataSet = []  // empty array to store data
  var dataLabel = []  // empty array to store label
  for(var i = 0; i < data.length; i++) {
    dataSet.push(data[i].yg)
    dataLabel.push(data[i].Agent)
  }

  console.log(dataSet)

  var color = d3.scale.category10()

  // pie chart layout 설정
  var pie = d3.layout.pie().sort(null)

  // pie chart 크기 설정
  var arc = d3.svg.arc().innerRadius(50).outerRadius(100)

  // pie chart 그리기 준비
  var pieElements = d3.select("#agentPie")
    .selectAll("g")
    .data(pie(dataSet))
    .enter()
    .append("g")
    .attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")") // g 의 중심을 원의 가운데로 이동
  



  // 데이터 추가
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
        // 각 부분의 시작 각도
        { startAngle: d.startAngle, endAngle: d.startAngle },
        // 각 부분의 종료 각도
        { startAngle: d.startAngle, endAngle: d.endAngle }
      )
      return function(t) { return arc(interpolate(t) )}
    })
  
  // 파이 데이터의 총 합을 표시
  var textElements = d3.select("#agentPie")
    .append("text")
    .attr("class", "total")
    .attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")")
    .text("YG")
    .style("text-anchor", "middle")



  // pie chart 크기 설정
  var pos = d3.svg.arc().innerRadius(50).outerRadius(180)
  var getAngle = function (d) {
      return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
  };

  // 파이 데이터 개별 값을 표시
  pieElements
    .append("text") // 데이터 수만큼 text 요소가 추가됨
    .attr("class", "pieNum")  // CSS 클래스 설정
    .attr("transform", function(d, i){
      return "translate(" + pos.centroid(d) + ")" +
              "rotate(" + getAngle(d) + ")";
         // 부채꼴의 중심으로 함(무게 중심 계산)
    })
    .text(function(d, i){
      return dataLabel[i]  // 값 표시
    })
    .style("text-anchor", "start")














 //  /* ------- PIE SLICES -------*/
 //  var slice = svg.select(".slices").selectAll("path.slice")
 //    .data(pie(dataSet));

 //  slice.enter()
 //    .insert("path")
 //    .style("fill", function(d, i) { return color(i) })
 // //   .style("fill", function(d) { return color(d.data.label); })
 //    .attr("class", "slice");

 //  slice   
 //    .transition().duration(1000)
 //    .attrTween("d", function(d) {
 //      this._current = this._current || d;
 //      var interpolate = d3.interpolate(this._current, d);
 //      this._current = interpolate(0);
 //      return function(t) {
 //        return arc(interpolate(t));
 //      };
 //    })

 //  // slice.exit()
 //  //   .remove();

 //  /* ------- TEXT LABELS -------*/

 //  var text = svg.select(".labels").selectAll("text")
 //    .data(pie(dataSet));

 //  text.enter()
 //    .append("text")
 //    .attr("dy", ".35em")
 //    // .text(function(d) {
 //    //   return d.data.label;
 //    // });
 //    .text(function(d, i){
 //       return dataLabel[i] ; // 값 표시
 //    })
  
 //  function midAngle(d){
 //    return d.startAngle + (d.endAngle - d.startAngle)/2;
 //  }

 //  text.transition().duration(1000)
 //    .attrTween("transform", function(d) {
 //      this._current = this._current || d;
 //      var interpolate = d3.interpolate(this._current, d);
 //      this._current = interpolate(0);
 //      return function(t) {
 //        var d2 = interpolate(t);
 //        var pos = outerArc.centroid(d2);
 //        pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
 //        return "translate("+ pos +")";
 //      };
 //    })
 //    .styleTween("text-anchor", function(d){
 //      this._current = this._current || d;
 //      var interpolate = d3.interpolate(this._current, d);
 //      this._current = interpolate(0);
 //      return function(t) {
 //        var d2 = interpolate(t);
 //        return midAngle(d2) < Math.PI ? "start":"end";
 //      };
 //    });

 //  // text.exit()
 //  //   .remove();

 //  /* ------- SLICE TO TEXT POLYLINES -------*/

 //  var polyline = svg.select(".lines").selectAll("polyline")
 //    .data(pie(dataSet));
  
 //  polyline.enter()
 //    .append("polyline");

 //  polyline.transition().duration(1000)
 //    .attrTween("points", function(d){
 //      this._current = this._current || d;
 //      var interpolate = d3.interpolate(this._current, d);
 //      this._current = interpolate(0);
 //      return function(t) {
 //        var d2 = interpolate(t);
 //        var pos = outerArc.centroid(d2);
 //        pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
 //        return [arc.centroid(d2), outerArc.centroid(d2), pos];
 //      };      
 //    });
  
 //  // polyline.exit()
 //  //   .remove();




})










//http://bl.ocks.org/mbostock/3888852
//codebox 수정 mydata_agent 한글 깨지는거 수정 

// var radius = 74,
//     padding = 10;

// var color_donut = d3.scale.ordinal()
//     .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

// var arc = d3.svg.arc()
//     .outerRadius(radius)
//     .innerRadius(radius - 30);

// var pie = d3.layout.pie()
//     .sort(null)
//     .value(function(d) { return d.memberfirms; });  //d.memberfirms < d.population

// d3.csv("mydata_agent.csv", function(error, data) {
//   if (error) throw error;

//   color_donut.domain(d3.keys(data[0]).filter(function(key) { return key !== "Agent"; }));

//   data.forEach(function(d) {
//     d.firms = color_donut.domain().map(function(name) {
//       return {name: name, memberfirms: +d[name]};      //memberfirms < population
//     });
//   });

//   var legend = d3.select("agentPie").append("svg")
//       .attr("class", "legend")
//       .attr("width", radius * 2)
//       .attr("height", radius * 2)
//     .selectAll("g")
//       .data(color_donut.domain().slice().reverse())
//     .enter().append("g")
//       .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

//   legend.append("rect")
//       .attr("width", 18)
//       .attr("height", 18)
//       .style("fill", color_donut);

//   legend.append("text")
//       .attr("x", 24)
//       .attr("y", 9)
//       .attr("dy", ".35em")
//       .text(function(d) { return d; });

//   var svg = d3.select("agentPie").selectAll(".pie")
//       .data(mydata_agent)
//     .enter().append("svg")
//       .attr("class", "pie")
//       .attr("width", radius * 2)
//       .attr("height", radius * 2)
//     .append("g")
//       .attr("transform", "translate(" + radius + "," + radius + ")");

//   svg.selectAll(".arc")
//       .data(function(d) { return pie(d.firms); })
//     .enter().append("path")
//       .attr("class", "arc")
//       .attr("d", arc)
//       .style("fill", function(d) { return color_donut(d.data.name); });

//   svg.append("text")
//       .attr("dy", ".35em")
//       .style("text-anchor", "middle")
//       .text(function(d) { return d.Agent; });

// });