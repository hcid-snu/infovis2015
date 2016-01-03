// 전체 그래프의 사이즈 지정
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
var svg = d3.select("body")
    .append("svg")
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