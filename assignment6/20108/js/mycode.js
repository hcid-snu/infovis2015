var margin = {top: 35, right: 0, bottom: 20, left: 0},
    width = 900,
    height = 680 - margin.top - margin.bottom,
    formatNumber = d3.format(",%"),
    colorDomain = [0, 8],
    colorRange = ["#e0f3db", '#a8ddb5', "#43a2ca"],
    transitioning;

var x = d3.scale.linear()
    .domain([0, width])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, height])
    .range([0, height]);

var color = d3.scale.linear()
    .domain(colorDomain)
    .range(colorRange);

var treemap = d3.layout.treemap()
    .children(function(d, depth) { return depth ? null : d._children; })
    .sort(function(a, b) { return a.value - b.value; })
    .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
    .round(false);

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.bottom + margin.top)
    .style("margin-left", -margin.left + "px")
    .style("margin.right", -margin.right + "px")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .style("shape-rendering", "crispEdges");

var grandparent = svg.append("g")
    .attr("class", "grandparent");

grandparent.append("rect")
    .attr("y", -margin.top)
    .attr("width", width)
    .attr("height", margin.top);

grandparent.append("text")
    .attr("x", 6)
    .attr("y", 6 - margin.top)
    .attr("dy", ".75em");


function initialize(root) {
    root.x = root.y = 0;
    root.dx = width;
    root.dy = height;
    root.depth = 0;
  }

  function accumulate(d) {
    return (d._children = d.children)
        ? d.value = d.children.reduce(function(p, v) {return p + accumulate(v); }, 0)
        : d.value;
  }

  function layout(d) {
    if (d._children) {
      treemap.nodes({_children: d._children});
      d._children.forEach(function(c) {
        c.x = d.x + c.x * d.dx;
        c.y = d.y + c.y * d.dy;
        c.dx *= d.dx;
        c.dy *= d.dy;
        c.parent = d;
        layout(c);
      });
    }
  }

function colorIncrements(d){
    return (colorDomain[colorDomain.length - 1] - colorDomain[0])/18*d + colorDomain[0];
}

function getContrast50(hexcolor){
    return (parseInt(hexcolor.replace('#', ''), 16) > 0xffffff/3) ? '#525252':'#ffffff';
}

d3.json("data/tree.json", function(root) {
  console.log(root)
  initialize(root);
  accumulate(root);
  layout(root);
  display(root);

  function display(d) {
    grandparent
        .datum(d.parent)
        .on("click", transition)
      .select("text")
        .text(name(d));

    grandparent
      .datum(d.parent)
      .select("rect")
      .attr("fill", function(){console.log(color(d.rate)); return color(d['rate'])})

    var g1 = svg.insert("g", ".grandparent")
        .datum(d)
        .attr("class", "depth");

    var g = g1.selectAll("g")
        .data(d._children)
      .enter().append("g");

    g.filter(function(d) { return d._children; })
        .classed("children", true)
        .on("click", transition);

    g.selectAll(".child")
        .data(function(d) { return d._children || [d]; })
      .enter().append("rect")
        .attr("class", "child")
        .call(rect);

    g.append("rect")
        .attr("class", "parent")
        .call(rect)
      .append("title")
        .text(function(d) {console.log(typeof(d.value), d.value); return d.name + ', 비율: ' + d.rate + '%'; });

    g.append("text")
        .attr("dy", ".75em")
        .text(function(d) { return d.name; })
        .call(text);

    function transition(d) {
      if (transitioning || !d) return;
      transitioning = true;

      var g2 = display(d),
          t1 = g1.transition().duration(750),
          t2 = g2.transition().duration(750);

      x.domain([d.x, d.x + d.dx]);
      y.domain([d.y, d.y + d.dy]);

      svg.style("shape-rendering", null);

      svg.selectAll(".depth").sort(function(a, b) { return a.depth - b.depth; });

      g2.selectAll("text").style("fill-opacity", 0);

      t1.selectAll("text").call(text).style("fill-opacity", 0);
      t2.selectAll("text").call(text).style("fill-opacity", 1);
      t1.selectAll("rect").call(rect);
      t2.selectAll("rect").call(rect);

      t1.remove().each("end", function() {
        svg.style("shape-rendering", "crispEdges");
        transitioning = false;
      });
    }

    return g;
  }

  function text(text) {
    text.attr("x", function(d) { return x(d.x) + 6; })
        .attr("y", function(d) { return y(d.y) + 6; })
        .attr("fill", function (d) {return getContrast50(color(parseFloat(d.rate)))});
  }

  function rect(rect) {
    rect.attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y); })
        .attr("width", function(d) { return x(d.x + d.dx) - x(d.x); })
        .attr("height", function(d) { return y(d.y + d.dy) - y(d.y); })
        .attr("fill", function(d){return color(parseFloat(d.rate));});
  }

  function name(d) {
    return d.parent
        ? name(d.parent) + " > " + d.name + " << 돌아가기 "
        : d.name;
  }

});
