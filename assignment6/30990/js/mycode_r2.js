var margin = { top: 50, right: 0, bottom: 100, left: 90 },
    width = 1000 - margin.left - margin.right,
    height = 430 - margin.top - margin.bottom,
    gridSize = Math.floor(width / 24),
    legendElementWidth = gridSize*2,
    buckets = 9,
    colors = ["white","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],
    days = ["19대 총선", "18대 대선", "6회 지선", "17대 대선", "18대 총선", "5회 지선"],
    times = ["전국","서울","부산","대구","인천","광주","대전", "울산", "세종", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"];
    datasets = ["data/data_1r.tsv"]

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var dayLabels = svg.selectAll(".dayLabel")
    .data(days)
    .enter().append("text")
    .text(function (d) { return d })
    .attr("x", 0)
    .attr("y", function (d, i) { return i * gridSize })
    .style("text-anchor", "end")
    .attr("transform", "translate(-15," + gridSize / 1.5 + ")")
    .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis") })

var timeLabels = svg.selectAll(".timeLabel")
    .data(times)
    .enter().append("text")
    .text(function(d) { return d; })
    .attr("x", function(d, i) { return i * gridSize; })
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + gridSize / 2 + ", -6)")
    .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis") })

var heatmapChart = function(tsvFile) {
  d3.tsv(tsvFile, function(d) {
    return {
      day: +d.day,
      hour: +d.hour,
      value: +d.value
    }
  },
  function(error, data) {
    var colorScale = d3.scale.quantile()        
        .domain([35, 80])
        .range(colors)
		
		console.log(colorScale.quantiles())

    var cards = svg.selectAll(".hour")
        .data(data, function(d) { return d.day+':'+d.hour })

    cards.append("title")

    cards.enter().append("rect")
        .attr("x", function(d) { return (d.hour - 1) * gridSize })
        .attr("y", function(d) { return (d.day - 1) * gridSize })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "hour bordered")
        .attr("width", gridSize)
        .attr("height", gridSize)
        .style("fill", colors[0])

    cards.transition().duration(1000)
        .style("fill", function(d) { return colorScale(d.value) })

    cards.select("title").text(function(d) { return d.value })
    
    cards.exit().remove()

    var legend = svg.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), function(d) { return d })

    legend.enter().append("g")
        .attr("class", "legend")

    legend.append("rect")
      .attr("x", function(d, i) { return legendElementWidth * i })
      .attr("y", height)
      .attr("width", legendElementWidth)
      .attr("height", gridSize / 2)
      .style("fill", function(d, i) { return colors[i] })

    legend.append("text")
      .attr("class", "mono")
      .text(function(d) { return "≥ " + Math.round(d) })
      .attr("x", function(d, i) { return legendElementWidth * i })
      .attr("y", height + gridSize)

    legend.exit().remove()

  })
}

heatmapChart(datasets[0])

