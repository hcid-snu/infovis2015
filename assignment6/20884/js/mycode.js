var margin = { top: 50, right: 0, bottom: 100, left: 150 },
    width = 450 - margin.left - margin.right,
    height = 900 - margin.top - margin.bottom,
    gridSize = 30,
    legendElementWidth = gridSize,
    colors = ["#0000FF", "#3F3FFF", "#7F7FFF", "#BFBFFf", "#FFFFFF", "#FFBFBF", "#FF7F7F", "#FF3F3F", "#FF0000"],
    times = ["0h", "1h", "6h"];
    datasets = ["data/CCD.tsv", "data/CUU.tsv"]

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var timeLabels = svg.selectAll(".timeLabel")
    .data(times)
    .enter().append("text")
    .text(function(d) { return d; })
    .attr("x", function(d, i) { return i * gridSize; })
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + gridSize / 2 + ", -6)")
    .attr("class", "timeLabel")

var heatmapChart = function(tsvFile) {
  var days = []
  d3.tsv(tsvFile, function(d) {
    if (days.indexOf(d.geneName)<0) {
	days.push(d.geneName)
    }
    return {
      day: +d.geneID,
      hour: +d.hour,
      value: +d.value
    }
  },
  function(error, data) {

    var geneLabels = svg.selectAll(".geneLabel")
    .data(days, function(d, i) { return i })

    geneLabels.enter().append("text")
    .text(function (d) { return d })
    .attr("x", 0)
    .attr("y", function (d, i) { return i * gridSize })
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
    .attr("class", "geneLabel") 

    geneLabels.transition().duration(1000)
	.text(function(d) { return d })

    var colorScale = function(v) {
	ind = Math.floor(v) 
	if (ind<-3) { ind = -4 }
	if (ind>=0) { ind+=1 }
	if (ind>3) { ind  = 4 }
	return colors[ind+4]
	}
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
        .style("fill", colors[4])

    cards.transition().duration(1000)
        .style("fill", function(d) { return colorScale(d.value) })

    cards.select("title").text(function(d) { return d.value })
    
    cards.exit().remove()

    var legend = svg.selectAll(".legend")
        .data([-4,-3,-2,-1,0,1,2,3,4], function(d) { return d })

    legend.enter().append("g")
        .attr("class", "legend")

    legend.append("rect")
      .attr("x", function(d, i) { return legendElementWidth * i })
      .attr("y", height+50)
      .attr("width", legendElementWidth)
      .attr("height", gridSize / 2)
      .style("fill", function(d, i) { return colors[i] })

    legend.append("text")
      .attr("class", "mono")
      .text(function(d) { 
		if (d==0) { return "0" }
		else if (d<0) { return "≤ "+d }
		else { return "≥ "+d }})
      .attr("x", function(d, i) { return legendElementWidth * i })
      .attr("y", height + gridSize+50)

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
