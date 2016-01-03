var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var parseyear = d3.time.format("%Y").parse;
var formatyear = d3.time.format("%Y");
var formatcount = d3.format("#,##0");
var bisectYear = d3.bisector(function(d) { return d.year; }).left;

d3.tsv("data_.tsv", function(error, data) {
  if (error) throw error;

  var color = d3.scale.category10();
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));

  data.forEach(function(d) {
    d.year = parseyear(d.year);
    d.total = d3.sum(
        color.domain().map(function(name) { return +d[name] }) 
    )
  });

  // compute total for each year.
  // data.forEach(function(d){
  //   d.total = 0;
  //   color.domain().forEach( function(name) {
  //     d.total = d.total + d[name];  
  //   })
  // });

  // var categories = d3.keys(data[0]).filter(function(key) { return key !== "year"; }).map(function(name) {
  var categories = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {year: d.year, count: +d[name]};
      })
    };
  });

  function lineGraph(fD){
      var lG={},    lGDim = {t: 0, r: 50, b: 30, l: 50};
      lGDim.w = 400 - lGDim.l - lGDim.r, 
      lGDim.h = 250 - lGDim.t - lGDim.b;
          
      //create svg for histogram.
      var lGsvg = d3.select("#myTable").append("svg")
          .attr("width", lGDim.w + lGDim.l + lGDim.r)
          .attr("height", lGDim.h + lGDim.t + lGDim.b).append("g")
          .attr("transform", "translate(" + lGDim.l + "," + lGDim.t + ")");

      var line = d3.svg.line()
          .interpolate("linear")
          .x(function(d) { return x(d.year); })
          .y(function(d) { return y(d.count); });

      // create function for x-axis mapping.
      var x = d3.time.scale().range([0, lGDim.w]);
      var y = d3.scale.linear().range([lGDim.h, 0]);

      // Add x-axis to the histogram svg.
      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");
      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

        // x.domain(d3.extent(data, function(d) { return d.year; }));
      x.domain([data[0].year, data[data.length - 1].year]);
      y.domain([
        d3.min(categories, function(c) { return d3.min(c.values, function(v) { return v.count; }); }),
        d3.max(categories, function(c) { return d3.max(c.values, function(v) { return v.count; }); })
      ]);

      lGsvg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + (lGDim.h) + ")")
          .call(xAxis);

      lGsvg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 12)
          .style("text-anchor", "end")
          .text("단위: 명");

      var age = lGsvg.selectAll(".age")
          .data(categories)
        .enter().append("g")
          .attr("class", "age");

      age.append("path")
          .attr("class", "line")
          .attr("d", function(d) { return line(d.values); })
          .style("stroke", function(d) { return color(d.name); })
          .style("stroke-width", "1.5px");

      age.append("text")
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
          .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.count) + ")"; })
          .attr("x", 3)
          .attr("dy", ".35em")
          .text(function(d) { return d.name })
          .style("opacity",0);

      //x-axis mouseover
      var focus = lGsvg.selectAll(".focus")
          .data(categories)
          .enter().append("g")
          .attr("class", "focus")
          .style("display", "none");

      focus.append("circle")
          .attr("r", 3)
          .style("fill", function(d) {return color(d.name) })
          .style("stroke", "none");

      focus.append("text")
          .attr("x", 9)
          .attr("dy", ".35em");

      lGsvg.append("rect")
          .attr("class", "overlay")
          .attr("width", lGDim.w)
          .attr("height", lGDim.h)
          .on("mouseover", function() { focus.style("display", null); })
          .on("mouseout", function() { focus.style("display", "none"); mouseout(); })
          .on("mousemove", mousemove);

      function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
          i = bisectYear(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          i_target = x0 - d0.year > d1.year - x0 ? i : i-1;
          year_target = x0 - d0.year > d1.year - x0 ? d1.year : d0.year;

          // filter for selected state.
          var st = data.filter(function(s){ return s.year == year_target;})[0],
              nD = color.domain().map(function(s){ return {name:s, count:st[s]};});

          // call update functions of pie-chart and legend.    
          pC.update(nD);
          leg.update(nD);

        focus
          .datum(function(d) { 
              return { name: d.name, year: year_target, count: data.map( function(e) {
                  var result = 0;
                  if (e.year==year_target) {
                    result = e[d.name];
                  }
                  return result;
                })[i_target]
              };
          })
          .attr("transform", function(d) { return "translate(" + x(d.year) + "," + y(d.count) + ")"; });
          // .select("text").text(function(d) { 
                // return d.name + ": " + formatcount(d.count) + "명";
            // });
      }

      function mouseout(d){    // utility function to be called on mouseout.
          // reset the pie-chart and legend.    
          pC.update(totalCount);
          leg.update(totalCount);
      }

      // create function to update the bars. This will be used by pie-chart.
      lG.update = function(name){
          var age = lGsvg.selectAll(".age").data(categories);


          if (name == "null") {
              age.select("path").transition().duration(50)
                  // .attr("class", "line")
                  // .attr("d", function(d) { return line(d.values); })
                  .style("stroke", function(d) { return color(d.name);})
                  .style("stroke-width", "1.5px");

              age.select("text").style("opacity",0);

          } else {
              age.select("path").transition().duration(50)
                  // .attr("class", "line")
                  // .attr("d", function(d) { return line(d.values); })
                  .style("stroke", function(d) { if (d.name == name) return color(d.name); else return "silver";})
                  .style("stroke-width", function(d) { if (d.name == name) return "3px"; else return "1.5px";});

              age.select("text")
                  .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
                  .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.count) + ")"; })
                  .attr("x", 3)
                  .attr("dy", ".35em")
                  .text(function(d) { if (d.name == name) return d.name; else return null;})
                  .style("opacity",1);
          }
      }        
      return lG;
  }



  // function to handle pieChart.
  function pieChart(pD){
      var pC ={},    pieDim ={w:200, h: 250};
      // pieDim.left =  500 + pieDim.w/2;
      // pieDim.top = height*1/2;
      pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

      // create svg for pie chart.
      var piesvg = d3.select("#myTable").append("svg")
            .attr("width", pieDim.w).attr("height", pieDim.h)
          .append("g")
            .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");

      // create function to draw the arcs of the pie slices.
      var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(pieDim.r/4);

      // create a function to compute the pie slice angles.
      var pie = d3.layout.pie().sort(null).value(function(d) { return d.count; });

      // Draw the pie slices.
      piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
          .each(function(d) { this._current = d; })
          .style("fill", function(d) { return color(d.data.name); })
          .on("mouseover",mouseover).on("mouseout",mouseout);

      // create function to update pie-chart. This will be used by histogram.
      pC.update = function(nD){
          piesvg.selectAll("path").data(pie(nD)).transition().duration(50)
              .attrTween("d", arcTween);
      }

      // Utility function to be called on mouseover a pie slice.
      function mouseover(d){
          // call the update function of histogram with new data.
          lG.update(d.data.name);
      }
      //Utility function to be called on mouseout a pie slice.
      function mouseout(d){
          // call the update function of histogram with all data.
          lG.update("null");
      }

      // Animating the pie-slice requiring a custom function which specifies
      // how the intermediate paths should be drawn.
      function arcTween(a) {
          var i = d3.interpolate(this._current, a);
          this._current = i(0);
          return function(t) { return arc(i(t));    };
      }    
      return pC;
  }



  // function to handle legend.
  function legend(lD){
      var leg = {};
          
      // create table for legend.
      var legend = d3.select("#myTable").append("table").attr('class','legend');
      
      // create one row per segment.
      var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");
          
      // create the first column for each segment.
      tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
          .attr("width", '16').attr("height", '16')
          .attr("fill",function(d,i){ return color(d.name) });
          
      // create the second column for each segment.
      tr.append("td").text(function(d){ return d.name;});

      // create the third column for each segment.
      tr.append("td").attr("class",'legendFreq')
          .text(function(d){ return d3.format(",")(d.count);});

      // create the fourth column for each segment.
      tr.append("td").attr("class",'legendPerc')
          .text(function(d){ return getLegend(d,lD);});

      // Utility function to be used to update the legend.
      leg.update = function(nD){
          // update the data attached to the row elements.
          var l = legend.select("tbody").selectAll("tr").data(nD);

          // update the frequencies.
          l.select(".legendFreq").text(function(d){ return d3.format(",")(d.count);});

          // update the percentage column.
          l.select(".legendPerc").text(function(d){ return getLegend(d,nD);});        
      }
      
      function getLegend(d,aD){ // Utility function to compute percentage.
          return d3.format("%")(d.count/d3.sum(aD.map(function(v){ return v.count; })));
      }

      return leg;
  }


  // calculate total Count by segment for all year.
  var totalCount = color.domain().map(function(name){ 
      return {name:name, count: d3.sum(data.map(function(t){ return t[name];}))};
  });

  var lG = lineGraph(data)
      pC = pieChart(totalCount),
      leg= legend(totalCount);  // create the legend.

});



  // // legend of line chart
  // var legendRectSize = 13;
  // var legendSpacing = 5;

  // var legend = svg.selectAll('.legend')
  // .data(color.domain())
  // .enter()
  // .append('g')
  // .attr('class', 'legend')
  // .attr('transform', function(d, i) {
  //   var horz = 20 + i*width*1/2/color.domain().length;
  //   var vert = height+10;
  //   return 'translate(' + horz + ',' + vert + ')';
  // });

  // legend.append('rect')
  // .attr('width', legendRectSize)
  // .attr('height', legendRectSize)
  // .style('fill', color)
  // .style('stroke', color);

  // legend.append('text')
  // .attr('x', legendRectSize + legendSpacing)
  // .attr('y', legendRectSize - legendSpacing)
  // .text(function(d) { return d; });