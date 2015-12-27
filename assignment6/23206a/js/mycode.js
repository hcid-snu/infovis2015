var margin = { top: 30, right: 0, bottom: 200, left: 40  },
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    gridSize = Math.floor(width / 12),
    legendElementWidth = gridSize*2,
    buckets = 6,
    colors = ["#B2EBF4","#6799FF","#050099","#F2CB61","#FF5E00","#980000"],
    days = ["1994", "1997", "2000", "2003", "2006", "2007", "2008"],
    times = ["WA", "CA", "NV", "AK", "MT", "ND", "OK", "TX", "MI", "AL", "SC", "ME"];
    datasets = ["data/data2.tsv"]

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
    .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
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
        .domain([0, buckets - 1, d3.max(data, function (d) { return d.value })])
        .range(colors)
		
		console.log(colorScale.quantiles())

    var cards = svg.selectAll(".hour")
        .data(data, function(d) { return d.day+':'+d.hour })

    cards.append("title")

    cards.enter().append("rect")
        .attr("x", function(d) { return (d.hour - 1) * gridSize })
        .attr("y", function(d) { return (d.day - 1) * gridSize })
        .attr("rx", 7)
        .attr("ry", 7)
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
      .text(function(d, i) { return [ "<10%", "10~14%", "15~19%", "20~24%", "25~29%", "≥30%"] [i] })
      .attr("x", function(d, i) { return legendElementWidth * i })
      .attr("y", height + gridSize)

    legend.exit().remove()

  })
}

heatmapChart(datasets[0])

var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
  .data(datasets)

datasetpicker.enter()
  .append("input")
  .attr("value", function(d){ return "Dataset " + d })
  .attr("type", "button")
  .attr("class", "dataset-button")
  .on("click", function(d) {
    heatmapChart(d)
})