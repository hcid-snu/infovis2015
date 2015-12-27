var margin = { top: 50, right: 0, bottom: 100, left: 30 },
    width = 960 - margin.left - margin.right,
    height = 430 - margin.top - margin.bottom,
    gridSize = Math.floor(width / 24),
    legendElementWidth = gridSize*2,
    buckets = 9,
    colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],
    subject = ["p18", "p19", "p21", "p22", "p23", "p25"],
    datasets = ["data/mydata1.csv", "data/mydata2.csv", "data/mydata3.csv"];

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var subLabels = svg.selectAll(".subLabel")
    .data(subject)
    .enter().append("text")
    .text(function (d) { return d })
    .attr("x", 0)
    .attr("y", function (d, i) { return i * gridSize })
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
    .attr("class", "subLabel mono axis")


var heatmapChart = function(csvFile) {
  d3.csv(csvFile, function(d) {
    return {
      subject: +d.subject,
      day: +d.day,
      value: +d.value
    }
  },
  function(error, data) {
    var colorScale = d3.scale.quantile()
        .domain([0, buckets - 1, d3.max(data, function (d) { return d.value })])
        .range(colors)
		
		console.log(colorScale.quantiles())

    var cards = svg.selectAll(".hour")
        .data(data, function(d) { return d.subject+':'+d.day })

    cards.append("title")

    cards.enter().append("rect")
        .attr("x", function(d) { return (d.day - 1) * gridSize })
        .attr("y", function(d) { return (d.subject - 1) * gridSize })
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

    console.log(csvFile);
    times = [];
    if (csvFile == "data/mydata1.csv") {
      for (var i = 1; i <= 22; i++) times.push("Day" + i); 
    } else if (csvFile == "data/mydata2.csv") {
      for (var i = 23; i <= 42; i++) times.push("Day" + i);
    } else {
      for (var i = 43; i <= 49; i++) times.push("Day" + i);
    }

    svg.selectAll(".timeLabel").remove();

    var timeLabels = svg.selectAll(".timeLabel")
      .data(times)
      .enter().append("text")
      .text(function(d) { return d; })
      .attr("x", function(d, i) { return i * gridSize; })
      .attr("y", 0)
      .style("text-anchor", "middle")
      .attr("transform", "translate(" + gridSize / 2 + ", -6)")
      .attr("class", "timeLabel mono axis")

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
  .attr("value", function(d){ 
    if (d == "data/mydata1.csv") {
      return "진료 전"
    } else if (d == "data/mydata2.csv") {
      return "1차 진료 후"
    } else {
      return "2차 진료 후"
    }
  })
  .attr("type", "button")
  .attr("class", "dataset-button")
  .on("click", function(d) {
    heatmapChart(d);
})