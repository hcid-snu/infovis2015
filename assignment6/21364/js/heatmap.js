
(function() {

  var margin = { top: 50, right: 0, bottom: 50, left: 30 },
  width = 930 - margin.left - margin.right,
  height = 220 - margin.top - margin.bottom,
  gridSize = Math.floor(width / 30),
  legendElementWidth = gridSize*2,
  buckets = 9,
            // colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
            colors = ["#444","#7bb6d1"],
            meals = ["아침", "점심", "저녁"],
            date = ["4/1", "4/2", "4/3", "4/4", "4/5", "4/6", "4/7", "4/8", "4/9", "4/10", "4/11", "4/12", "4/13", "4/14", "4/15", "4/16", "4/17", "4/18", "4/19", "4/20", "4/21", "4/22", "4/23", "4/24", "4/25", "4/26", "4/27", "4/28", "4/29", "4/30"];
            datasets = ["data/meal.tsv"];

            var svg = d3.select("#heatmap").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var mealLabels = svg.selectAll(".mealLabel")
            .data(meals)
            .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) { return i * gridSize; })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            // .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "mealLabel mono axis axis-workweek" : "mealLabel mono axis"); });

            var dateLabels = svg.selectAll(".dateLabel")
            .data(date)
            .enter().append("text")
            .text(function(d) { return d; })
            .attr("x", function(d, i) { return i * gridSize; })
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr("class", function(d, i) { return ((i == 13) ? "dateLabel mono axis axis-worktime" : "dateLabel mono axis"); });

            var heatmapChart = function(tsvFile) {
              d3.tsv(tsvFile,
                function(d) {
                  return {
                    date: +d.date,
                    meal: +d.meal,
                    value: +d.value
                  };
                },
                function(error, data) {
                  var colorScale = d3.scale.quantile()
                  .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
                  .range(colors);

                  var cards = svg.selectAll(".meal")
                  .data(data, function(d) {return d.date+':'+d.meal;});

                  cards.append("title");

                  cards.enter().append("rect")
                  .attr("x", function(d) { return (d.date - 1) * gridSize; })
                  .attr("y", function(d) { return (d.meal - 1) * gridSize; })
                  .attr("rx", 4)
                  .attr("ry", 4)
                  .attr("class", "hour bordered")
                  .attr("width", gridSize)
                  .attr("height", gridSize)
                  .style("fill", colors[0]);

                  cards.transition().duration(1000)
                  .style("fill", function(d) { return colorScale(d.value); });

                  cards.select("title").text(function(d) { return d.value; });

                  cards.exit().remove();

                  var legend = svg.selectAll(".legend")
                  .data([0].concat(colorScale.quantiles()), function(d) { return d; });

                  legend.enter().append("g")
                  .attr("class", "legend");

                  legend.append("rect")
                  .attr("x", function(d, i) { return legendElementWidth * i; })
                  .attr("y", height)
                  .attr("width", legendElementWidth)
                  .attr("height", gridSize / 2)
                  .style("fill", function(d, i) { return colors[i]; });

                  legend.append("text")
                  .attr("class", "mono")
                  // .text(function(d) { return "≥ " + Math.round(d); })
                  .text(function(d) { return Math.round(d) >= 1 ? "먹음" : "안 먹음"; })
                  .attr("x", function(d, i) { return legendElementWidth * i; })
                  .attr("y", height + gridSize);

                  legend.exit().remove();

                });  
  };

  heatmapChart(datasets[0]);


})()


