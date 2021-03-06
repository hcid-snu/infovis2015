var margin = { top: 50, right: 0, bottom: 100, left: 30 },
    width = 960 - margin.left - margin.right,
    height = 820 - margin.top - margin.bottom,
    gridSize = Math.floor(width / 24),
    legendElementWidth = gridSize*2,
    buckets = 9,
    colors = ["#FBEAE9","#F3C1BD","#EB9993","#E27068","#DB4D41","#D63528","#AC2A20","#801F18","#561510"],
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];
    datasets4 = ["data/data_sch4.tsv", "data/data3.tsv","data/data4.tsv"]

var svg4 = d3.select("#chart2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var dayLabels = svg4.selectAll(".dayLabel")
    .data(days)
    .enter().append("text")
    .text(function (d) { return d })
    .attr("x", function(d, i) { return i * gridSize*2; })
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + gridSize + ", -6)")
    .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis") })

var timeLabels = svg4.selectAll(".timeLabel")
    .data(times)
    .enter().append("text")
    .text(function(d) { return d; })
    .attr("x", 0)
    .attr("y", function (d, i) { return i * gridSize/1.5 })
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + gridSize / 2.5 + ")")
    .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis") })

var heatmapChart_sch = function(tsvFile) {
  d3.tsv(tsvFile, function(d) {
    return {
      day: +d.day,
      hour: +d.hour,
      value: +d.value
    }
  },
  function(error, data) {
    var colorScale = d3.scale.quantile()
        .domain([0, buckets - 1, d3.max(data, function (d) { return d.value })])
        .range(colors)
		
		console.log(colorScale.quantiles())

    var cards = svg4.selectAll(".hour")
        .data(data, function(d) { return d.day+':'+d.hour })

    cards.append("title")   //마우스 밑에 툴팁처럼 뜨는 숫자 부분    

    cards.enter().append("rect")
        .attr("x", function(d) { return (d.day - 1) * gridSize*2 })
        .attr("y", function(d) { return (d.hour - 1) * gridSize/1.5 })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "hour bordered")
        .attr("width", gridSize*2)
        .attr("height", gridSize/1.5)
        .style("fill", colors[0])

    cards.transition().duration(1000)
        .style("fill", function(d) { return colorScale(d.value) })

    cards.select("title").text(function(d) { return d.value })
    
    cards.exit().remove()

    var legend = svg4.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), function(d) { return d })

    legend.enter().append("g")
        .attr("class", "legend")

    legend.append("rect")
      .attr("x", function(d, i) { return legendElementWidth/1.5 * i })
      .attr("y", height-30)
      .attr("width", legendElementWidth/1.5)
      .attr("height", gridSize / 2)
      .style("fill", function(d, i) { return colors[i] })

    legend.append("text")
      .attr("class", "mono")
      .text(function(d) { return "≥ " + Math.round(d) })
      .attr("x", function(d, i) { return legendElementWidth/1.5 * i })
      .attr("y", height + gridSize-30)

    legend.exit().remove()

  })
}

heatmapChart_sch(datasets4[0])

var datasetpicker2 = d3.select("#dataset-picker2").selectAll(".dataset-button")
  .data(datasets4)

datasetpicker2.enter()
  .append("input")
  .attr("value", function(d){ 
    if (d === "data/data_sch4.tsv") {
              return "4월 스케줄" ;
            } else if (d === "data/data3.tsv") {
              return "4월 지출 횟수" ;
            }else {
              return "4월 지출 금액" ;
            }
    })  .attr("type", "button")
  .attr("class", "dataset-button")
  .on("click", function(d) {
    heatmapChart_sch(d)
})