      var margin = {
              top: 50,
              right: 0,
              bottom: 100,
              left: 30
          },
          width = 960 - margin.left - margin.right,
          height = 430 - margin.top - margin.bottom,
          gridSize = Math.floor(width / 31),
          legendElementWidth = gridSize * 2,
          colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"], // alternatively colorbrewer.YlGnBu[9]
          days = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
      // times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];
      var times = [];
      for(var i = 0; i < 31; i++){
        times.push((i + 1) + '일');
      }

      var svg = d3.select("#chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var dayLabels = svg.selectAll(".dayLabel")
          .data(days)
          .enter().append("text")
          .text(function(d) {
              return d;
          })
          .attr("x", 0)
          .attr("y", function(d, i) {
              return i * gridSize;
          })
          .style("text-anchor", "end")
          .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
          .attr("class", function(d, i) {
              return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis");
          });

      var timeLabels = svg.selectAll(".timeLabel")
          .data(times)
          .enter().append("text")
          .text(function(d) {
              return d;
          })
          .attr("x", function(d, i) {
              return i * gridSize;
          })
          .attr("y", 0)
          .style("text-anchor", "middle")
          .attr("transform", "translate(" + gridSize / 2 + ", -6)")
          .attr("class", function(d, i) {
              return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis");
          });

      var heatmapChart = function(tsvFile) {
          d3.csv("data/data.csv", function(error, buckets) {

              var datas = {};

              buckets.forEach(function(d) {
                  var year = d.date.substring(0, 4);
                  var month = d.date.substring(4, 6);
                  var day = d.date.substring(6);

                  if (datas[month] === undefined) {
                      datas[month] = [];
                  }

                  datas[month].push({
                      month: month,
                      day: day,
                      total: d.total
                  });

              });

              var keys = Object.keys(datas);

              var sort_key = keys.sort();
              var length = sort_key.length;

              var _buckets = [];

              for (var i = 0; i < length; i++) {
                  var key = sort_key[i];
                  var _length = datas[key].length;

                  for (var j = 0; j < _length; j++) {
                      _buckets.push(datas[key][j]);
                  }
              }

              // Coerce the CSV data to the appropriate types.
              _buckets.forEach(function(d) {
                  d.month = d.month;
                  d.day = +d.day;
                  d.total = +d.total;
              });

              var colorScale = d3.scale.quantile()
                  .domain([0, 9 - 1, d3.max(_buckets, function(d) {
                      return d.total /1000;
                  })])
                  .range(colors);
              console.log(_buckets);
              var cards = svg.selectAll(".hour")
                  .data(_buckets, function(d) {
                      return d.month + ':' + d.day;
                  });

              cards.append("title");

              cards.enter().append("rect")
                  .attr("x", function(d) {
                      return (d.day - 1) * gridSize;
                  })
                  .attr("y", function(d) {
                      return (d.month - 1) * gridSize;
                  })
                  .attr("rx", 4)
                  .attr("ry", 4)
                  .attr("class", "hour bordered")
                  .attr("width", gridSize)
                  .attr("height", gridSize)
                  .style("fill", colors[0]);

              cards.transition().duration(1000)
                  .style("fill", function(d) {
                      return colorScale(d.total/1000);
                  });

              cards.select("title").text(function(d) {
                  return d.total / 1000;
              });

              cards.exit().remove();

              var legend = svg.selectAll(".legend")
                  .data([0].concat(colorScale.quantiles()), function(d) {
                      return d;
                  });

              legend.enter().append("g")
                  .attr("class", "legend");

              legend.append("rect")
                  .attr("x", function(d, i) {
                      return legendElementWidth * i;
                  })
                  .attr("y", height)
                  .attr("width", legendElementWidth)
                  .attr("height", gridSize / 2)
                  .style("fill", function(d, i) {
                      return colors[i];
                  });

              legend.append("text")
                  .attr("class", "mono")
                  .text(function(d) {
                      return "≥ " + Math.round(d);
                  })
                  .attr("x", function(d, i) {
                      return legendElementWidth * i;
                  })
                  .attr("y", height + gridSize);

              legend.exit().remove();

          });
      };

      heatmapChart('data/data.csv');

      // var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
      //     .data(datasets);

      // datasetpicker.enter()
      //     .append("input")
      //     .attr("value", function(d) {
      //         return "Dataset " + d
      //     })
      //     .attr("type", "button")
      //     .attr("class", "dataset-button")
      //     .on("click", function(d) {
      //         heatmapChart(d);
      //     });
