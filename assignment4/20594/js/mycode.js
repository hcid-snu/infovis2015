// 전체 그래프의 사이즈 지정
var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
}
var width = 1700 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom

var Ticks = [
    'Jongno',
    'Jung',
    'Yongsan',
    'Seongdong',
    'Gwangjin',
    'Dongdaemun',
    'Jungnang',
    'Seongbuk',
    'Gangbuk',
    'Dobong',
    'Nowon',
    'Eunpyeong',
    'Seodaemun',
    'Mapo',
    'Yangcheon',
    'Gangseo',
    'Guro',
    'Geumcheon',
    'Yeongdeungpo',
    'Dongjak',
    'Gwanak',
    'Seocho',
    'Gangnam',
    'Songpa',
    'Gangdong',
];

var colors = ['yellowgreen', 'green', 'blue', 'red', 'purple', 'black'];
var periods = {};
var charts = {};
var circles = {};

var drawChart = function(data) {
    window._data = data;

    var years = Object.keys(data);
    var max = 0;
    var type = '';
    for (var i = 0; i < years.length; i++) {
        var key = years[i];

        var year_max = 0;
        var year_length = data[key].length;

        for(var j = 0; j < year_length; j++){

            var val = data[key][j].Total;
            if(typeof(val) === "string"){
                val = val.replace(',', '');
                val = parseInt(val);
            }

            if(val > year_max){
                year_max = val;
            }
        }

        if (year_max > max) {
            max = year_max;
        }

        if(type === ''){
            type = data[key][0]['Accident Type'];
        }
    }

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    console.log(max)
    // x, y 축을 위한 range 설정 (x: time scale, y: linear)
    var x = d3.scale.ordinal().rangeRoundBands([0, width])
    var y = d3.scale.linear().domain([0, max + 100]).range([height, 0])

    // x, y 축 스케일과 위치 설정
    var xAxis = d3.svg.axis().scale(x).orient("bottom")
    var yAxis = d3.svg.axis().scale(y).orient("left")

    x.domain(Ticks.map(function(d) {
        return d
    }));

    // 그려질 line 설정 (x: date, y: close)
    var line = d3.svg.line()
        .x(function(d, i) {
            return x(d.District)
        })
        .y(function(d) {
            var value = d.Total;

            if (typeof(value) === 'string') {
                value = parseInt(value.replace(',', ''));
            }

            return y(parseInt(value))
        });

    // svg 설정하고 추가
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")



    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append('text')
        .attr('x', '200')
        .style('font-size', '20px')
        .text(function(){
            if(type === 'Injured'){
                return "부상자 수(Injured) - 각 구별 정확한 부상자 수를 보시려면 해당 포인트에 마우스 오버 해 주세요.";
            }else{
                return "사망자 수(Killed) - 각 구별 정확한 사망자 수를 보시려면 해당 포인트에 마우스 오버 해 주세요.";
            }
        })


    var years_length = years.length;
    for (var i = 0; i < years_length; i++) {
        var key = years[i];

        var chartdata = data[key];

        if (charts[key] === undefined) {
            charts[key] = [];
        }
        if (circles[key] === undefined) {
            circles[key] = [];
        }

        var path = svg.append("path")
            .data([chartdata])
            .attr("d", line)
            .attr("stroke", colors[i])
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .attr("display", "none")
            .attr("class", key)
            .attr('transform', 'translate(30, 0)');

        var circle = svg.selectAll("dot")
            .data(chartdata)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", function(d) {
                return x(d.District) + 30;
            })
            .attr("cy", function(d) {
                var value = d.Total;

                if (typeof(value) === 'string') {
                    value = parseInt(value.replace(',', ''));
                }

                return y(parseInt(value))
            })
            .attr('fill', colors[i])
            .attr('display', 'none')
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("Period : " + d.Period + "</br>" +
                        "Total : " + d.Total + "</br>" +
                        "Accident Type : " + d['Accident Type'] + "</br>" +
                        "District : " + d.District + "</br>")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 70) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        charts[key].push(path);
        circles[key].push(circle);
    }
};

var appendButton = function(_periods, _charts, _circles) {

    var __periods = _periods;
    var html = Object.keys(__periods);
    var period_length = html.length;
    var charts = _charts;
    var circles = _circles;

    for (var i = 0; i < period_length; i++) {
        __periods[html[i]] = d3.select('body')
            .append('button')
            .text(html[i])
            .on('click', function(d) {
                var key = d3.select(this).text();

                var chart = charts[key];
                var circle = circles[key];

                for (var i = 0; i < chart.length; i++) {
                    if (chart[i].attr('display') === 'none') {
                        chart[i].attr('display', 'block');

                    } else {
                        chart[i].attr('display', 'none');

                    }
                }

                for (var i = 0; i < circle.length; i++) {
                    var c = circle[i];

                    if (c.attr('display') === 'none') {
                        c.attr('display', 'block');
                    } else {
                        c.attr('display', 'none');
                    }
                }
            })
    }

    return;
};

d3.csv("data/Car Accident.csv", function(error, data) {

    var groupData = {
        Killed: {},
        Injured: {}
    };

    var len = data.length;

    for (var i = 0; i < len; i++) {

        var key = data[i]['Accident Type'];
        var period = data[i].Period;
        if (groupData[key][period] === undefined) {
            groupData[key][period] = [];
        }

        if (periods[period] === undefined) {
            periods[period] = [];
        }

        groupData[key][period].push(data[i]);
    }

    appendButton(periods, charts, circles);
    drawChart(groupData.Injured);
    drawChart(groupData.Killed);

})
