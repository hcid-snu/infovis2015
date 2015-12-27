var margin = { top: 50, right: 0, bottom: 100, left: 30 },
    width = 1000 - margin.left - margin.right,
    height = 2200 - margin.top - margin.bottom,
    gridSize = Math.floor(width / 24),
    legendElementWidth = gridSize*2,
    buckets = 9,
    colors = ["#ffff00","#7fff00","#00ff00","#32cd32","#3cb371","#2e8b57","#00ced1","#00bfff","#1e90ff"],
    days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", ],
    times = ["AM", "PM"];
    datasets = ["data/data1.tsv", "data/data2.tsv"]

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
        .domain([100, 1000])
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