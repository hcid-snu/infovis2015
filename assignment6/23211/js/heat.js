  var margin = { top: 100, right: 0, bottom: 100, left: 30 },
      width = 1800 - margin.left - margin.right,
      height = 2000 - margin.top - margin.bottom,
      // 하나의 cell의 크기를 결정함
      gridSize = Math.floor(width/28),
      legendElementWidth = gridSize*2,
      buckets = 7,
      colors = ["#B29E9A","#FFC0B5","#FF9E8D","#CC6452","#B23E2A","#B23620","#B2280F","#B21C00"],
      eps = []
      chas = []
  var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top - margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  var heatmapChart = function(tsvFile) {
     d3.tsv(tsvFile, function(error, data) {
      for ( var i = 0; i < 50; i++){
        if (i < 28){
         chas.push(data[i].char)
        }
         eps.push(i+1)      
      }
      
    })
    d3.tsv(tsvFile, function(d, i) {    
      return {
        ep: +d.ep,
        cha: d.char,
        value: +d.value
      }
    },
    function(error, data) {
    
    console.log(eps)
     console.log(chas)
  	 var dayLabels = svg.selectAll(".epLabel")
  	    .data(eps)
  	    .enter().append("text")
  	    .text(function (d) { return d })
  	    .attr("x", 0)
  	    .attr("y", function (d, i) { return i * gridSize/2 })
  	    .style("text-anchor", "end")    
  	    .attr("transform", "translate(-6," + gridSize/3 + ")")
  	    // 주중과 주말을 css를 이용해서 컨트롤하기 위해 class의 이름을 변경함
  	    // .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis") })

  	var timeLabels = svg.selectAll(".timeLabel")
  	    .data(chas)
  	    .enter().append("text")	    
  	    .attr("x", function(d, i) { return i * gridSize; })
  	    .attr("y", 0)
        .style("text-anchor", "end")
  	    .attr("transform", "translate(" + gridSize + ", -6) ")
        .text(function(d) { return d; })
        
     var colorScale = d3.scale.quantile()
  	        .domain([0, buckets - 1, d3.max(data, function (d) { return d.value })])
  	        .range(colors)
  			
  			// console.log(colorScale.quantiles())

      var cards = svg.selectAll(".hour")
          .data(data, function(d) { return d.ep +':'+ chas.indexOf(d.cha) })
          
      cards.append("title")

      cards.enter().append("rect")
          .attr("x", function(d, i) { return (chas.indexOf(d.cha)) * gridSize })
          .attr("y", function(d, i) { return (+d.ep - 1) * gridSize/2 })
          .attr("rx", 4)
          .attr("ry", 4)
          .attr("class", "hour bordered")
          .attr("width", gridSize)
          .attr("height", gridSize/2)
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
        .attr("x", function(d, i) { return legendElementWidth* i })
        .attr("y", -70)
        .attr("width", legendElementWidth)
        .attr("height", gridSize / 2)
        .style("fill", function(d, i) { return colors[i] })

      legend.append("text")
        .attr("class", "mono")
        .text(function(d) { return Math.round(d) + " 번 이상 만남"})
        .attr("x", function(d, i) { return legendElementWidth* i })
        .attr("y", -80)

      legend.exit().remove()

    })
  }

  heatmapChart("data/jdjForHeat.tsv")
