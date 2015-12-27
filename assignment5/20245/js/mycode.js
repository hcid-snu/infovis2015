var width = 800,
    height = 800

var dataSet = {
	nodes : [	
			{ name : "Susan", group : 0 }, // 0
			{ name : "Mike Delfino", group : 0 },	// 1
			{ name : "Karl Mayer", group : 0 },	// 2
			{ name : "Julie", group : 0 },	// 3
			{ name : "Bree", group : 1 }, // 4
			{ name : "Rex Van de Kamp", group : 1 }, // 5
			{ name : "Andrew", group : 1 }, // 6
			{ name : "Danielle", group : 1 }, // 7
			{ name : "Lynette", group : 2 }, // 8
			{ name : "Tom Scavo", group : 2 }, // 9
			{ name : "Porter", group : 2 }, // 10
			{ name : "Preston", group : 2 }, // 11
			{ name : "Parker", group : 2 }, // 12
			{ name : "Penny", group : 2 }, // 13
			{ name : "Gabriell", group : 3 }, // 14
			{ name : "Carlos Solis", group : 3 }, // 15
			{ name : "John", group : 3 }, // 16
			{ name : "Mary Alice", group : 4 }, // 17
			{ name : "Martha Huber", group : 5 }, // 18
			{ name : "Brandi", group : 0 }, // 19
			{ name : "Maisy", group : 1 }, // 20
			{ name : "George", group : 1 }, // 21
			{ name : "Justin", group : 1 }, // 22
			{ name : "Paul", group : 4 }, // 23
			{ name : "Zach", group : 4 }, // 24
			{ name : "Juanita Solis", group : 3 }, // 25

	],
	links : [	
			{ source : 0, target : 1 },
			{ source : 0, target : 2 },
			{ source : 0, target : 3 },
			{ source : 2, target : 3 },
			{ source : 4, target : 5 },
			{ source : 5, target : 6 },
			{ source : 6, target : 7 },
			{ source : 7, target : 4 },
			{ source : 7, target : 16 },
			{ source : 8, target : 9 },
			{ source : 9, target : 10 },
			{ source : 10, target : 11 },
			{ source : 11, target : 12 },
			{ source : 12, target : 13 },
			{ source : 13, target : 8 },
			{ source : 14, target : 15 },
			{ source : 14, target : 16 },
			{ source : 15, target : 25 },
			{ source : 25, target : 6 },
			{ source : 0, target : 4 },
			{ source : 4, target : 8 },
			{ source : 8, target : 14 },
			{ source : 14, target : 17 },
			{ source : 17, target : 0 },
			{ source : 18, target : 23 },
			{ source : 19, target : 2 },
			{ source : 20, target : 5 },
			{ source : 21, target : 4 },
			{ source : 22, target : 6 },
			{ source : 17, target : 23 },
			{ source : 23, target : 24 },
			{ source : 24, target : 17 },
			{ source : 24, target : 3 },

	]
}
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)

var color = d3.scale.category10()

var force = d3.layout.force()
  .nodes(dataSet.nodes)
  .links(dataSet.links)
  .size([width, height])
  .linkDistance(100)
  .linkStrength(5)
  .gravity(0.001)
  .start()

var link = d3.select("#myGraph")
  .selectAll("line")
  .data(dataSet.links)
  .enter()
  .append("line")
  .attr("class", "forceLine")


var node = d3.select("#myGraph")
  .selectAll(".node")	
  .data(dataSet.nodes)
  .enter()
  .append("g")
  .attr("class", "node")
  .call(force.drag)	

node.append("circle")
	.attr("r", 8)
	.style("fill", function(d) { return color(d.group) })

node.append("text")
	.attr("dx", 12)
    .attr("dy", ".35em")
    .text(function(d) { return d.name })

force.on("tick", function() {
	link
	  .attr("x1", function(d) { return d.source.x; })
	  .attr("y1", function(d) { return d.source.y; })
	  .attr("x2", function(d) { return d.target.x; })
	  .attr("y2", function(d) { return d.target.y; })
	node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")" })
})
