var margin = { top: 50, right: 0, bottom: 100, left: 100 },
    width = 960 - margin.left - margin.right,
    height = 560 - margin.top - margin.bottom,
    gridSize = Math.floor(width / 20),
    legendElementWidth = gridSize*1.2,
    buckets = 9,
    colors = ["#FFDEDE","#FFB8B8","#FFA5A5","#FF9797","#FF8080","#FF5F5F","#FF4242","#FF2222","#FF0101"],
    team = ["두산(OB)", "삼성", "넥센(현대)", "SK", "한화", "기아(해태)", "롯데", "LG", "NC", "KT"],
    year = ["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"];
    datasets = ["data/KBO0615.tsv", "data/KBO9605.tsv"]

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var teamLabels = svg.selectAll(".teamLabel")
    .data(team)
    .enter().append("text")
    .text(function (d) { return d })
    .attr("x", 0)
    .attr("y", function (d, i) { return i * gridSize })
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
    .attr("class", function (d, i) { return ((i >= 0 && i <= 100) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis") })

var yearLabels = svg.selectAll(".yearLabel")
    .data(year)
    .enter().append("text")
    .text(function(d) { return d; })
    .attr("x", function(d, i) { return i * gridSize; })
    .attr("y", 0)
    .style("text-anchor", "middle")
    .attr("transform", "translate(" + gridSize / 2 + ", -6)")
    .attr("class", function(d, i) { return ((i >= 0 && i <= 100) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis") })

var heatmapChart = function(tsvFile) {
  d3.tsv(tsvFile, function(d) {
    return {
      teamnum: +d.teamnum,
      year: +d.year,
      ave: +d.ave
      }
  },
  function(error, data) {
    var colorScale = d3.scale.quantile()
        .domain([0, buckets - 8.6, d3.max(data, function (d) { return d.ave })])
        .range(colors)
		
		console.log(colorScale.quantiles())

    var cards = svg.selectAll(".year")
        .data(data, function(d) { return d.teamnum+':'+d.year })

    cards.append("title")



    cards.enter().append("rect")
//      .attr("x", function(d) { return ((d.year >= 2006 && d.year < 2006) ? (d.year - 2006) * gridSize : (d.year - 1996) * gridSize) })
        .attr("x", function(d) { return (d.year - 2006) * gridSize })
        .attr("y", function(d) { return (d.teamnum - 1) * gridSize })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "hour bordered")
        .attr("width", gridSize)
        .attr("height", gridSize)
        .style("fill", colors[0])

    cards.transition().duration(1000)
        .style("fill", function(d) { return colorScale(d.ave) })

    cards.select("title").text(function(d) { return d.ave })
    
    cards.exit().remove()

    var legend = svg.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), function(d) { return d })

    legend.enter().append("g")
        .attr("class", "legend")

    legend.append("rect")
      .attr("x", 600)
      .attr("y", function(d, i) { return legendElementWidth * i /2 })
      .attr("width", legendElementWidth )
      .attr("height", gridSize / 2)
      .style("fill", function(d, i) { return colors[i] })

    legend.append("text")
      .attr("class", "mono")
      .text(function(d) { return "≥ " + Math.floor(d * 1000)/1000 })
      .attr("x", 680)
      .attr("y", function(d, i) { return legendElementWidth * i /2 })

    legend.exit().remove()

  })
}

heatmapChart(datasets[0])

// var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
//   .data(datasets)

// datasetpicker.enter()
//   .append("input")
//   .attr("value", function(d){ return "Dataset " + d })
//   .attr("type", "button")
//   .attr("class", "dataset-button")
//   .on("click", function(d) {
//     heatmapChart(d)
// })