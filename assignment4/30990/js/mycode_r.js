// 전체 그래프의 사이즈 지정
(function(){
var margin = { top: 20, right: 20, bottom: 30, left: 50 }
var width = 960 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom

// 데이터의 텍스트 날짜 포맷 (day-month-year)을 날짜 오브젝트 포맷으로 변환
var parseDate = d3.time.format("%Y").parse

// x, y 축을 위한 range 설정 (x: time scale, y: linear)
var x = d3.time.scale().range([0, width])
var y = d3.scale.linear().range([height, 0])

// x, y 축 스케일과 위치 설정
var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5)
var yAxis = d3.svg.axis().scale(y).orient("left")

// 그려질 line 설정 (x: date, y: close)
var line = d3.svg.line()
    .x(function(d) { return x(d.date) })
    .y(function(d) { return y(d.freq) })

/// Adds the svg canvas
var svg = d3.select("#lineGraph")
    
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("data/line_data.csv", function(error, data) {
    data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.freq = +d.freq;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.freq; })]); 

    // Nest the entries by symbol
    var dataNest = d3.nest()
        .key(function(d) {return d.types;})
        .entries(data);

    // Loop through each symbol / key
    dataNest.forEach(function(d) {
        svg.append("path")
            .attr("class", "line")
            .attr("d", line(d.values)); 

    });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

});


})();


drawPie('2010')

d3.select("#year").on("change", function() { 
  // d3.select("#PieGraph").selectAll("*").remove()  
  d3.select("#PieGraph").selectAll('*').remove()  
  console.log(d3.select("#PieGraph").selectAll('svg'))
  drawPie(this.value)
})

function drawPie(fileName, on){
 
  var color=d3.scale.ordinal()
            .range(["#98abc5","#8a89a6","#7b6888"]);

  var radius=74,
      padding=60;

  var width = 1500, height = 700;

  var pie=d3.layout.pie().sort(null)
      .value(function(d){return d.occ;});

  var arc=d3.svg.arc()
      .outerRadius(radius)
      .innerRadius(radius-30);

 d3.csv("data/type_"+fileName+".csv",function(error,data){ if(error) throw error;
     color.domain(d3.keys(data[0]).filter(function(key){return key!=="region";}));
      
      data.forEach(function(d){
        d.types=color.domain().map(function(name){
            // console.log(name + " "+ d[name])
            return { name:name, occ:+d[name]};
          });
      });
       

    var svg = d3.select('#PieGraph')
            .attr('width', width)
            .attr('height', height);

    console.log(radius)

    var legend = svg.selectAll('.legend')
                .attr("class","legend")
              // .attr("width",radius*2)
               // .attr("height",radius*2)
              // .selectAll("g")
              .data(color.domain().slice().reverse())
              .enter().append("g")
              .attr("transform",function(d,i){                
                return "translate(0,"+i*20+")";
              });

        legend.append("rect")
              .attr("width",18)
              .attr("height",18)
              .style("fill",color);

        legend.append("text")
              .attr("x",24)
              .attr("y",9)
              .attr("dy",".35em")
              .text(function(d){return d;});

      var pieElementsG = svg
                            .append('g')
                            .attr('transform', 'translate(0, 60)')  
      index = 0
      var pieElements = pieElementsG
                        .selectAll('svg')
                        .data(data)                        
                        .enter()
                        .append("svg")
                        .attr('x', function(d,i){
                              if( i < 10) { return i * (2*radius)}
                              else if( i >= 10 && i <20) {return (i-10) * (2*radius)}
                              else { return (i-20) * (2*radius)}                              
                          })
                        .attr('y', function(d,i){
                              if( i < 10) { return 0}
                              else if( i >= 10 && i <20) {return 2*radius}
                              else { return 4*radius}        

                        })
                        .attr("class","pie")
                        .attr("width",radius*2)
                        .attr("height",radius*2)
                        .append("g")
                        .attr("transform","translate("+radius+","+radius+")");

      pieElements.selectAll(".arc")
            .data(function(d){
              // console.log(d.types)
              return pie(d.types);}
              )  
            .enter().append("path")
            .attr("class","arc")
            .attr("d",arc)
            .style("fill",function(d){return color(d.data.name);});

       pieElements.append("text")
            .attr("dy",".35em")
            .style("text-anchor","middle")
            .text(function(d){return d.region;});


          // svg.selectAll('.arc').remove();
          // svg.selectAll('*').remove();






        // svg.append("text")//데이터수만큼text요소가추가됨
        //   .attr("class","pieNum")//CSS클래스설정
        //   .attr("transform",function(d,i){
        //   return"translate("+arc.centroid(i)+")"//부채꼴의중심으로함(무게중심계산)
        // })
        //   .text(function(d,i){
        //     return i.value//값표시
        //   })
    });
};