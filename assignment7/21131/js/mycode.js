// http://synthesis.sbecker.net/articles/2012/07/18/learning-d3-part-7-choropleth-maps

drawMap("data/2008.csv")

d3.select("#year").on("change", function() { 
  d3.select("#map").selectAll("*").remove()
  drawMap("data/" + this.value + ".csv", this.value)
})

  function drawMap(filename) {

    var width = 800, height = 700

    var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height)

    var seoul = svg.append("g").attr("id", "seoul")

    var projection = d3.geo.mercator()
        .center([126.9895, 37.5651])
        .scale(100000)
        .translate([width/2, height/2])

    var path = d3.geo.path().projection(projection)

    var popByName = d3.map()


    queue()
        .defer(d3.json, "map/seoul_municipalities_topo_simple.json")
        .defer(d3.csv, filename, function(d) { popByName.set(d.region, +d.occurrence) })
        .await(ready)

    function ready(error, data) {
      // console.log(popByName)
      var features = topojson.feature(data, data.objects.seoul_municipalities_geo).features
      
      var colorScale = d3.scale.quantize()
          .domain([0, 500])
          .range(d3.range(9).map(function(i) { return "p" + i }))

      seoul.selectAll("path")
          .data(features)
          .enter().append("path")
          .attr("class", function(d) {
            return "municipality " + colorScale(popByName.get(d.properties.name_eng)) 
          })
          .attr("d", path)
          .attr("id", function(d) { return d.properties.name_eng })
          
      seoul.selectAll("text")
          .data(features)
          .enter()
          .append("text")
          .attr("class", "municipality-label")
          .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")" })
          .attr("dy", ".35em")
          .text(function(d) { return d.properties.name_eng })


    }
  }