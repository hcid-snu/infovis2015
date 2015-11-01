d3.csv("OECD_Social_Expenditure.csv", function(error, data){

  // svg 요소의 크기를 구한다
  var svgEle = document.getElementById("myGraph")
  var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width")
  var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height")
  svgWidth = parseFloat(svgWidth) // remove px
  svgHeight = parseFloat(svgHeight) // remove px

  var barElements
  
  var offsetX = 30
  var offsetY = 30

  var dataSet = []
  var dataLabel = []
  for(var i = 0; i < data.length; i++) {
    dataSet.push(data[i].value)
    dataLabel.push(data[i].country)
  }

  var barWidth = 4.5*(svgWidth-80) / (5.5*data.length)
  var barGap = barWidth / 4.5
  var formatAsPercentage = d3.format(".1%");
  var formatPercent = d3.format(".0%");


  barElements = d3.select("#myGraph")
    .append("g")
    .attr("transform", "translate(" + (offsetX + 30) + ", " + -offsetY + ")")
    .selectAll("rect")
    .data(dataSet)
  

 barElements.enter()
    .append("rect")
    .attr("class", "bar")
    .attr("height", 0)
    .attr("width", barWidth)
    .attr("x", function(d, i) { return i * (barWidth + barGap) + 5})    
    .attr("y", svgHeight)
    .on("mouseover", function() { 
      d3.select(this)
        .style("fill", "orangered")
    })
    .on("mouseout", function() { 
      d3.select(this)
        .transition()
        .duration(500)
        .style("fill", "orange")
    })
    .transition()
    .delay(function(d, i) { return i * 500 })
    .duration(1500)
    .attr("y", function(d, i) { return svgHeight - (d*1000) })
    .attr("height", function(d, i) { return d*1000 })
  

  barElements.enter()
    .append("text")
    .attr("class", "barNum")
    .attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 +5 })
    .attr("y", svgHeight + offsetY)
    .transition()
    .delay(function(d, i) { return i * 500 })
    .attr("y", function(d, i) { return svgHeight - (d*1000) - 5 })
    .text(function(d, i) { return formatAsPercentage(d) })
  
  
  // var y= d3.scale.linear()
  //       .range([450, 0])


  //y축을 표시하기 위한 스케일 설정
  var y = d3.scale.linear()  // 직선의 스케일 사용
    .range([350, 0])  // 그래프가 아래에서 위로 그려지기 때문에 range를 역으로 써주어야 함.
    .domain([0, 350])
// d3.max(data, function(d) {return d.value;})
//d3.max(data, function(d, i) {return data[i].value*1000 })
  // y축을 표시
  d3.select("#myGraph").append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + (offsetX + 30) + ", " + ((svgHeight - 350) - offsetY) + ")")
    .call(
      d3.svg.axis()
      .scale(y)
      .orient("left")
      // .tickFormat(formatPercent)
    )
   .append("text")
      // .attr("transform", "rotate(-90)")
      .attr("y", -25)
      .attr("dy", 0)
      .style("text-anchor", "middle")
      .text("Percentage*1000");


  // x축을 표시
  d3.select("#myGraph")
    .append("rect")
    .attr("class", "axis")
    .attr("width", 1500)
    .attr("height", 1)
    .attr("transform", "translate(" + (offsetX + 30) + ", " + (svgHeight - offsetY) + ")")
  

  // var x = d3.scale.ordinal()
  //       .rangeBands([0, svgWidth])

  //   d3.select("#myGraph")
  //     .append("g")
  //     .attr("class", "axis")
  //     .attr("transform", "translate(0," + (svgHeight - offsetY) +")")
  //     .call(
  //         d3.svg.axis()
  //         .scale(x)
  //         .orient("bottom")
  //       )
  //     .selectAll("text")
  //       .style("text-anchor", "end")
  //       .attr("dx", "-.8em")
  //       .attr("dy", ".15em")
  //       .text(function(d, i) {return dataLabel[i] })
  //       .attr("transform", function(d) {return "rotate(-65)"})

// x축 레이블 표시
  barElements.enter()
    .append("text")
    .attr("class", "barName")
    .attr("x", function(d, i) { return i * (barWidth + barGap) + barWidth/2 +5})
    .attr("y", function (d, i) {
      if (i%2 == 0) {return svgHeight + offsetY - 17}
        else {return svgHeight + offsetY - 5}
    })
    .text(function(d, i) { return dataLabel[i] })



    d3.selectAll("button").on("click", function(){  

      var button_index = this.getAttribute("id")  
      if (button_index == "button_1") {
      d3.select("#myGraph")
        .append("rect")
        .attr("class", "average")
        .attr("width", 1500)
        .attr("height", 1)
        .attr("transform", "translate(" + (offsetX + 30) + ", " + (svgHeight - offsetY - (0.216*1000) ) + ")")

      d3.select("#myGraph")
        .append("text")
        .attr("class", "average_axis")
        .attr("x", offsetX + 2)
        .attr("y", svgHeight - offsetY - (0.216*1000) + 3)
        .style("text-anchor", "start")
        .text("216")
      }

      else {
        d3.select("#myGraph")
          .append("path")
          .attr("class", "top_3")
          .attr("d", "M471 60 L481 70 L491 60")
        d3.select("#myGraph")
          .append("path")
          .attr("class", "top_3")
          .attr("d", "M591 51 L601 61 L611 51")
        d3.select("#myGraph")
          .append("path")
          .attr("class", "top_3")
          .attr("d", "M711 63 L721 73 L731 63")
      }
   })


      // d3.selectAll("button").on("click", function(){
        
      //   var csvFile = this.getAttribute("data-src")
      //   var OECDbar;

      //   d3.csv(csvFile, function(error, data){

        // var dataSet2 = []
        // var dataLabel2= []
        // for(var i = 0; i < data.length; i++) {
        //   dataSet2.push(data[i].value)
        //   dataLabel2.push(data[i].country)
        // }

        // d3.select("#myGraph")
        // .append("rect")
        // .attr("class", "average")
        // .attr("width", 1500)
        // .attr("height", 2)
        // .attr("transform", "translate(" + (offsetX + 30) + ", " + (svgHeight - offsetY) + ")")

      // })
})











