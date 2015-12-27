var margin = { top: 50, right: 0, bottom: 100, left: 100 },
    width = 960 - margin.left - margin.right,
    height = 430 - margin.top - margin.bottom,
    gridSize = Math.floor(width / 20),
    legendElementWidth = gridSize,
    buckets = 10,
    colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],
    country = ["Seoul", "Tokyo", "Beijing", "HongKong", "Bangkok", "Jakarta"],
    month = ["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m", "10m", "11m", "12m"];
    datasets = ["data/data1.tsv"]

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var dayLabels = svg.selectAll(".dayLabel")
    .data(country)
    .enter().append("text")
    .text(function (d) { return d })
    .attr("x", 0)
    .attr("y", function (d, i) { return i * gridSize })
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
    .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "countryLabel mono axis axis-workweek" : "dayLabel mono axis") })

var timeLabels = svg.selectAll(".timeLabel")
    .data(month)
    .enter().append("text")
    .text(function(d) { return d; })
    .attr("x", function(d, i) { return i * gridSize; })
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + gridSize / 2 + ", -6)")
    .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "monthLabel mono axis axis-worktime" : "timeLabel mono axis") })

var heatmapChart = function(tsvFile) {
  d3.tsv(tsvFile, function(d) {
    return {
      country: +d.country,
      month: +d.month,
      value: +d.value
    }
  },
  function(error, data) {
    var colorScale = d3.scale.quantile()
        .domain([0, buckets - 1, d3.max(data, function (d) { return d.value })])
        .range(colors)
		
		console.log(colorScale.quantiles())

    var cards = svg.selectAll(".month")
        .data(data, function(d) { return d.country+':'+d.month })

    cards.append("title")

    cards.enter().append("rect")
        .attr("x", function(d) { return (d.month - 1) * gridSize })
        .attr("y", function(d) { return (d.country - 1) * gridSize })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "month bordered")
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