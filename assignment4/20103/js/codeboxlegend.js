





// d3.csv("data/mydata_la.csv", function(error, data){

//  // svg 요소의 크기를 구한다
//   var svgEle = document.getElementById("agentPielegend")
//   var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
//   var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
//   svgWidth = parseFloat(svgWidth) // remove px
//   svgHeight = parseFloat(svgHeight) // remove px


//   // 데이터 로딩
//   var dataSet_la = []  // empty array to store data
//   var dataLabel_la = []  // empty array to store label
//   for(var i = 0; i < data.length; i++) {
//     dataSet_la.push(data[i].item1)
//     dataLabel_la.push(data[i].item2)
//   }

// // bar graph drawing code - from last week
//   barElements = d3.select("#agentPielegend")
//     .selectAll("rect")
//     .data(dataSet_la)
//     .enter()
//     .append("rect")
//     .attr("class", "bar")
//     .attr("x", 0)
//     .attr("y", function(d, i) { return i * 30 })
//     .color(d3.scale.category10().range())
//     .attr("height", 20)
//     .attr("width", 0)
//     // 마우스 이벤트 처리
//     .on("mouseover", function() { 
//       d3.select(this)
//         .style("fill", "#FFDC9A")
//     })
//     .on("mouseout", function() { 
//       d3.select(this)
//         .transition()
//         .duration(500)
//         .style("fill", "#E0DADA")
//     })
//     .transition()
//     .delay(function(d, i){ return i * 500 })  // 0.5초마다 그리도록 대기 시간을 설정
//     .duration(2500)                            // 2.5초에 걸쳐 애니메이션화 함
//     .attr("width", function(d, i) { return d })
  

//   barElements.enter()
//     .append("text")
//     .attr("class", "barNum")
//     .attr("x", function(d, i) { return svgHeight -d*10 })
//     .attr("y", function(d, i) { return i })
//     //.text(function(d, i) { return d3.round(d , 0)+"%"; })
//     .text(function(d, i){ return dataLabel_la[i] })
  




//   })