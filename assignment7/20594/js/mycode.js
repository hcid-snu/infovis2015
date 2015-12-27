var geocoder = new google.maps.Geocoder();

function colores_google(key) {
    // var colores_g = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
    var colores_g = {
        '서울': "#3366cc",
        '경기': "#dc3912",
        '인천': "#ff9900",
        '광주': "#109618",
        '대구': "#990099",
        '대전': "#0099c6",
        '부산': "#dd4477",
        '강원': "#66aa00",
        '충북': "#b82e2e",
        '충남': "#316395",
        '전북': "#994499",
        '전남': "#22aa99",
        '경북': "#aaaa11",
        '경남': "#6633cc",
        '울산': "#3b3eac",
        '제주': "#5574a6"
    };

    return colores_g[key];
}

var drawGoogleMap = function() {
    // 구글맵을 그리는 함수

    var map = new google.maps.Map(
        d3.select("#map").node(), {
            zoom: 10,
            center: new google.maps.LatLng(37.463842, 126.949335),
            mapTypeId: google.maps.MapTypeId.ROADMAP // MapTypeId.TERRAIN, MapTypeId.HYBRID, MapTypeId.SATELLITE
        }
    )

    var drawColors = function() {
        var colores_g = {
            '서울': "#3366cc",
            '경기': "#dc3912",
            '인천': "#ff9900",
            '광주': "#109618",
            '대구': "#990099",
            '대전': "#0099c6",
            '부산': "#dd4477",
            '강원': "#66aa00",
            '충북': "#b82e2e",
            '충남': "#316395",
            '전북': "#994499",
            '전남': "#22aa99",
            '경북': "#aaaa11",
            '경남': "#6633cc",
            '울산': "#3b3eac",
            '제주': "#5574a6"
        };

        var keys = Object.keys(colores_g);
        var key_length = keys.length;

        for (var i = 0; i < key_length; i++) {
            d3.select('#legendArea').append('circle')
                .attr("r", 10)
                // .attr("top", 10)
                .attr("cy", 15)
                .attr("cx", 10 + 80 * i)
                .style("fill", colores_g[keys[i]]);

            d3.select('#legendArea').append('text')
                .attr('x', 10 + 80 * i + 15)
                .attr('y', 17)
                .attr("dy", ".31em")
                .text(function() {
                    return keys[i];
                });
        }
    };

    d3.csv("data/data.csv", function(data) {
        drawColors()
        var c20b = d3.scale.category20b();
        var overlay = new google.maps.OverlayView()

        overlay.onAdd = function() {
            var layer = d3.select(this.getPanes().overlayLayer).append("div")
                .attr("class", "stations")

            overlay.draw = function() {
                // console.log("called")
                var projection = this.getProjection(),
                    padding = 10

                var marker = layer.selectAll("svg")
                    .data(d3.entries(data))
                    .each(transform)
                    .enter().append("svg")
                    .each(transform)
                    .attr("class", "marker")

                marker.append("circle")
                    .attr("r", 6)
                    .attr("cx", padding)
                    .attr("cy", padding)
                    .style("fill", function(d) {
                        var colorKey = d.value.address.substr(0, 2);
                        var color = colores_google(colorKey);
                        if (color === undefined) {
                            console.log(colorKey);
                        }
                        return color;
                    });


                // marker.append("text")
                //     .attr("x", padding + 12)
                //     .attr("y", padding)
                //     .attr("dy", ".31em")
                //     .text(function(d) {
                //         return d.value.address;
                //     })

                function transform(d) {
                    // console.log(d);
                    d = new google.maps.LatLng(d.value.lat, d.value.lng);
                    d = projection.fromLatLngToDivPixel(d);
                    return d3.select(this)
                        .style("left", (d.x - padding) + "px")
                        .style("top", (d.y - padding) + "px")
                }
            }
        }

        overlay.setMap(map)
    })


};


drawGoogleMap();
