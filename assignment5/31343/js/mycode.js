
var width = 900,
    height = 600,
    fill = d3.scale.category20();

var nodes = null,
    links = null,
    nodeIds = null;

var zoom = d3.behavior.zoom().scaleExtent([0.1, 8]).on("zoom", zoomed);
   
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .call(zoom)
    .append("g");
    
function zoomed() {
    svg.attr("transform",
        "translate(" + zoom.translate() + ")" +
        "scale(" + zoom.scale() + ")"
    );
}

function interpolateZoom (translate, scale) {
    var self = this;
    return d3.transition().duration(350).tween("zoom", function () {
        var iTranslate = d3.interpolate(zoom.translate(), translate),
            iScale = d3.interpolate(zoom.scale(), scale);
        return function (t) {
            zoom
                .scale(iScale(t))
                .translate(iTranslate(t));
            zoomed();
        };
    });
}

function zoomClick() {
    var clicked = d3.event.target,
        direction = 1,
        factor = 0.2,
        target_zoom = 1,
        center = [width / 2, height / 2],
        extent = zoom.scaleExtent(),
        translate = zoom.translate(),
        translate0 = [],
        l = [],
        view = {x: translate[0], y: translate[1], k: zoom.scale()};

    d3.event.preventDefault();
    direction = (this.id === 'zoom_in') ? 1 : -1;
    target_zoom = zoom.scale() * (1 + factor * direction);

    if (target_zoom < extent[0] || target_zoom > extent[1]) { return false; }

    translate0 = [(center[0] - view.x) / view.k, (center[1] - view.y) / view.k];
    view.k = target_zoom;
    l = [translate0[0] * view.k + view.x, translate0[1] * view.k + view.y];

    view.x += center[0] - l[0];
    view.y += center[1] - l[1];

    interpolateZoom([view.x, view.y], view.k);
}

d3.selectAll('button').on('click', zoomClick);

var force = d3.layout.force()
    .gravity(.05)
    .distance(150)
    .charge(-100)
    .size([width, height]);

d3.json("data/mydata.json", function(json) {
  nodes = json.nodes;
  links = json.links;
  nodeIds = nodes.map(function(d) { return d.id; });

  force
      .nodes(json.nodes)
      .links(json.links)
      .linkDistance(function(d) { return (100.0 / (Math.sqrt(d.weight)+1)); })
      .start();

  var link = svg.selectAll(".link")
      .data(json.links)
      .enter().append("line")
      .attr("class", "link");

  var color = d3.scale.category20();

  var node = svg.selectAll(".node")
      .data(json.nodes)
      .enter().append("g")
      .attr("class", "node")
      .call(force.drag)
      .on('mouseover', function(d) {
        highlightGraph(d);
      })
      .on('mouseout', function(d) {
        highlightGraph(null);
      });

  node.append("circle")
      .attr("id", function(d) { return "c" + d.index; })
      .attr("r", function(d) { return d.size;})

  node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.id });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
        .style("stroke-width", function(d) { return Math.sqrt(d.weight); });


    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
});

function highlightGraph(obj) {
  if (obj) {
    svg.selectAll('circle').classed('inactive', true);

    nodes
      .filter(function(d) { return d.id == obj.id; })
      .map(function (d) { svg.select('#c' + d.index).classed('inactive', false); });

    links
      .filter(function(d) { return (d.source.id == obj.id || d.target.id == obj.id); })
      .map(function(d) {
        svg.select('#c' + d.source.index).classed('inactive', false);
        svg.select('#c' + d.target.index).classed('inactive', false);
      });
  } else {
    svg.selectAll('circle').classed('inactive', false);
  }
};