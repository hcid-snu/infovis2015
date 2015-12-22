d3.csv("data/mydata_agent.csv", function(error, data){

  // svg 요소의 크기를 구한다
  var svgEle = document.getElementById("agentPie3")
  var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
  var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
  svgWidth = parseFloat(svgWidth) // remove px
  svgHeight = parseFloat(svgHeight) // remove px

  // 데이터 로딩
  var dataSet = []  // empty array to store data
  var dataLabel = []  // empty array to store label
  for(var i = 0; i < data.length; i++) {
    dataSet.push(data[i].jyp)
    dataLabel.push(data[i].Agent)
  }

  console.log(dataSet)

  var color = d3.scale.category10()

  // pie chart layout 설정
  var pie = d3.layout.pie().sort(null)

  // pie chart 크기 설정
  var arc = d3.svg.arc().innerRadius(50).outerRadius(100)

  // pie chart 그리기 준비
  var pieElements = d3.select("#agentPie3")
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
  var textElements = d3.select("#agentPie3")
    .append("text")
    .attr("class", "total")
    .attr("transform", "translate(" + svgWidth/2 + ", " + svgHeight/2 + ")")
    .text("JYP")
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


})
