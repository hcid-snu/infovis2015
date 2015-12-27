/* 	sohyun's InfoVis assignment 
	  social network analysis with force directed layout
*/

// Define elements 
var width = 1000,
    height = 800;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// Get the data
d3.csv("data/shakespeare.csv", function(error, links) {

var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
    link.source = nodes[link.source] || 
        (nodes[link.source] = {name: link.source, group: link.group1 });
    link.target = nodes[link.target] || 
        (nodes[link.target] = {name: link.target, group: link.group2 });
    link.weight = +link.weight;
});

var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(200)
    .charge(-800)
    .on("tick", tick)
    .start();

// build the arrow.
svg.append("svg:defs").selectAll("marker")
    .data(["end"])      // Didfferent link/path types can be defined here
    .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    //.attr("markerWidth", 6)
    //.attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

// add the links and the arrows
var path = svg.append("svg:g").selectAll("path")
    .data(force.links())
    .enter().append("svg:path")
    //.attr("class", function(d) { return "link " + d.type; })
    .attr("class", "link")
    //.attr("marker-end", "url(#end)");

// define the nodes
var node = svg.selectAll(".node")
    .data(force.nodes())
    .enter().append("g")
    .attr("class", "node")
    .call(force.drag);

// add the nodes
node.append("circle")
    //.attr("r", 5);
    .attr('r', 20)
    .attr('fill-opacity', 0.3)
    .attr("class", function(d) { return "group" + d['group'];}); // color the circles differently by group

node.append('circle')
    .attr('r', 4)
    .attr('stroke', 'black');

// add the text 
node.append("text")
    .attr("x", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });

// add the curvy lines
function tick() {
    path.attr("d", function(d) {
        var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy);
            return "M" + 
            d.source.x + "," + 
            d.source.y + "A" + 
            dr + "," + dr + " 0 0,1 " + 
            d.target.x + "," + 
            d.target.y;
    });

    node
        .attr("transform", function(d) { 
        return "translate(" + d.x + "," + d.y + ")"; });
}

});