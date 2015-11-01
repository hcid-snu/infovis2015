var width = 960,
    height = 500 - 29


var color = d3.scale.category20();  

var svg  = d3.select("#myGraph")
	.attr("width", width).attr("height", height);

var lines = svg.append('g')
  .attr('transform', 'translate(170, 100)')
  .attr("stroke", color(0))
  .attr("fill", "none")
  .attr("stroke-width", "3");

	lines.append("line")
	.attr({x1:150, y1:30, x2: 150, y2: 30})
	.transition()
	.duration(1000)
		.attr({x2: 250, y2: 100*Math.sqrt(3)+30})
	lines.append("line")
	.attr({x1: 250, y1: 100*Math.sqrt(3)+30, x2: 250, y2: 100*Math.sqrt(3)+30})
	.transition()
	.delay(1000)
	.duration(1000)
		.attr({x2:50, y2: 100*Math.sqrt(3) +30})
	lines.append("line")
	.attr({x1: 50, y1: 100*Math.sqrt(3) + 30, x2: 50, y2: 100*Math.sqrt(3) +30})
	.transition()
	.delay(2000)
	.duration(1000)
		.attr({x2:150, y2: 30})	
	lines.append("line")
	.attr({x1:50, y1:60, x2: 50, y2: 60})
	.transition()
	.duration(1000)
		.attr({x2: 150, y2: 100*Math.sqrt(3)+60})
	lines.append("line")
	.attr({x1:150, y1:100*Math.sqrt(3)+60, x2: 150, y2: 100*Math.sqrt(3)+60})
	.transition()
	.delay(1000)
	.duration(1000)
		.attr({x2: 250, y2: 60})
	lines.append("line")
	.attr({x1:250, y1:60, x2: 250, y2: 60})
	.transition()
	.delay(2000)
	.duration(1000)
		.attr({x2: 50, y2: 60});	


	
// var min = Math.min(width, height);
min = 300
var oRadius = min / 2 * 0.9;
var iRadius = min / 2 * 0.88;

var bigORadius = min / 2 * 0.96;
var bigIRadius = min / 2 * 0.94;


τ = 2 * Math.PI;


var arc = d3.svg.arc()
  .outerRadius(oRadius)
  .innerRadius(iRadius)
  .startAngle(0);

var bigArc = d3.svg.arc()
	.outerRadius(bigORadius)
	.innerRadius(bigIRadius)
	.startAngle(0);

var g = svg.append('g')
  .attr('transform', function(){
    if ( window.innerWidth >= 960 ) var shiftWidth = width / 3;
    if ( window.innerWidth < 960 ) var shiftWidth = width / 3;
    return 'translate(' + shiftWidth + ',' + height / 2 + ')';
  })

// var background = g.append("path")
// 	.datum({endAngle: τ})
// 	.style("fill", "#ddd")
// 	.attr("d", arc);

var foreground = g.append("path")
    .datum({endAngle: 0})
    .style("fill", color(0))
    .attr("d", arc);

var bigground = g.append("path")
    .datum({endAngle: 0})
    .style("fill", color(0))
    .attr("d", bigArc);

setInterval(function() {
  foreground.transition()
      .duration(1500)
      .call(arcTween, τ);
  bigground.transition()
      .duration(1500)
      .call(bigArcTween, τ); }, 1000);


function arcTween(transition, newAngle) {
  transition.attrTween("d", function(d) {
    var interpolate = d3.interpolate(d.endAngle, newAngle);
    return function(t) {
      d.endAngle = interpolate(t);
      return arc(d);
    };
  });
}

function bigArcTween(transition, newAngle) {
  transition.attrTween("d", function(d) {
    var interpolate = d3.interpolate(d.endAngle, newAngle);
    return function(t) {
		d.endAngle = interpolate(t);
		return bigArc(d);
    };
  });
}

