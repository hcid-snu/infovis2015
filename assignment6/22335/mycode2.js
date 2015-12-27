var margin = { top: 150, bottom: 150, right: 100, left: 100 },
    width = 1200 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom,
    gridSize = Math.floor(width / 20),
    legendElementWidth = gridSize*1.5,
    buckets = 9,
    colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],
    days = ["삼성물산", "삼성생명", "호텔신라", "삼성SDI", "삼성SDS"],
    times = ["1st MON", "1st TUE", "1st WED", "1st THU", "1st FRI", "2nd MON", "2nd TUE", "2nd WED", "2nd THU", "2nd FRI", "3rd MON", "3rd TUE", "3rd WED", "3rd THU", "3rd FRI", "4th MON", "4th TUE", "4th WED", "4th THU", "4th FRI"];
    datasets = ["data in August.tsv", "data in September.tsv"]

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.top + "," + margin.left + ")")

var dayLabels = svg.selectAll(".dayLabel")
    .data(days)
    .enter().append("text")
    .text(function (d) { return d })
    .attr("x", 0)
    .attr("y", function (d, i) { return i * gridSize })
    .style("text-anchor", "end")
    .style("font-family", "Nanum Gothic")
    .style("font-size", "13px")
    .style("font-weight", "bold")
    .attr("transform", "translate(-5," + gridSize / 2 + ")")
   
var timeLabels = svg.selectAll(".timeLabel")
    .data(times)
    .enter().append("text")
    .text(function(d) { return d; })
    .attr("x", function(d, i) { return i * gridSize; })
    .attr("y", 0)
    .style("text-anchor", "middle")
    .style("font-family", "Nanum Gothic")
    .style("font-size", "11px")
    .style("font-weight", "bold")
    .attr("transform", "translate(" + gridSize / 2 + ", -5)")
    
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
        .domain([70000, 300000])
        .range(colors)
		
		console.log(colorScale.quantiles())

    var cards = svg.selectAll(".hour")
        .data(data, function(d) { return d.day+':'+d.hour })

    cards.append("title")

    cards.enter().append("rect")
        .attr("x", function(d) { return (d.hour - 1) * gridSize })
        .attr("y", function(d) { return (d.day - 1) * gridSize })
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("class", "hour bordered")
        .attr("width", gridSize - 1)
        .attr("height", gridSize - 1)
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
      .attr("transform", "translate(0, 100)")

    legend.append("text")
      .attr("class", "mono")
      .text(function(d) { return "≥ " + Math.round(d) })
      .style("font-family", "Nanum Gothic")
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .attr("x", function(d, i) { return legendElementWidth * i })
      .attr("y", height + gridSize)
      .attr("transform", "translate(0, 100)")

    legend.exit().remove()

  })
}

heatmapChart(datasets[0])

var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
  .data(datasets)

datasetpicker.enter()
  .append("input")
  .attr("value", function(d){ return d })
  .attr("type", "button")
  .attr("class", "dataset-button")
  .on("click", function(d) {
    heatmapChart(d)
})