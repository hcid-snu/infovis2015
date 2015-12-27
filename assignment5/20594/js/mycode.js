// get the data
d3.csv("data/sample.csv", function(error, links) {

    var nodes = {};

    links.forEach(function(link) {
        link.source = nodes[link.source] ||
            (nodes[link.source] = {
                name: link.source
            });
        link.target = nodes[link.target] ||
            (nodes[link.target] = {
                name: link.target
            });
        link.value = +link.value;
    });



    var width = 960,
        height = 500;

    var force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        .linkDistance(60)
        .charge(-300)
        .on("tick", tick)
        .start();

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    var path = svg.append("svg:g").selectAll("path")
        .data(force.links())
        .enter().append("svg:path")
        .attr("class", "link")
        .attr("marker-end", "url(#end)");

    var node = svg.selectAll(".node")
        .data(force.nodes())
        .enter().append("g")
        .attr("class", "node")
        .call(force.drag);

    var circle = node.append("circle")
        .attr("r", 4);

    node.append("text")
        .attr("x", 12)
        .attr("dy", ".35em")
        .text(function(d) {
            return d.name;
        });

    node.on('mouseover', function(d) {
        path.style('stroke-width', function(l) {
            if (d === l.source || d === l.target) {
                return 4;
            } else {
                return 2;
            }
        });
        d3.select(this).select('circle').attr('r', 10);
    });

    node.on('mouseout', function() {
        path.style('stroke-width', 2);
        d3.select(this).select('circle').attr('r', 5);
    });

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
                return "translate(" + d.x + "," + d.y + ")";
            });
    }

});
