var isIE = BrowserDetect.browser == 'Explorer';
var chartWidth = 900;
var chartHeight = 650;
var xscale = d3.scale.linear().range([0, chartWidth]);
var yscale = d3.scale.linear().range([0, chartHeight]);
var color = d3.scale.category10();
var headerHeight = 20;
var headerColor = "#555555";
var transitionDuration = 500;
var root;
var node;
var treemap = d3.layout.treemap()
        .round(false)
        .size([chartWidth, chartHeight])
        .sticky(true)
        .value(function(d) {
            return d.size;
        });
        
var svg = d3.select("#body")
    	    .append("svg:svg")
        	.attr("width", chartWidth)
        	.attr("height", chartHeight);
var chart = svg.append("svg:g");
var defs = svg.append("defs");
var filter = defs.append("svg:filter")
       		     .attr("id", "outerDropShadow")
      	  		 .attr("x", "-20%")
        		 .attr("y", "-20%")
       			 .attr("width", "140%")
       			 .attr("height", "140%");
    filter.append("svg:feOffset")
        .attr("result", "offOut")
        .attr("in", "SourceGraphic")
        .attr("dx", "1")
        .attr("dy", "1");
    filter.append("svg:feColorMatrix")
        .attr("result", "matrixOut")
        .attr("in", "offOut")
        .attr("type", "matrix")
        .attr("values", "1 0 0 0 0 0 0.1 0 0 0 0 0 0.1 0 0 0 0 0 .5 0");
    filter.append("svg:feGaussianBlur")
        .attr("result", "blurOut")
        .attr("in", "matrixOut")
        .attr("stdDeviation", "3");
    filter.append("svg:feBlend")
        .attr("in", "SourceGraphic")
        .attr("in2", "blurOut")
        .attr("mode", "normal");
        
var tooltip = d3.select("#body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);        
    
    
d3.json("data/KBO2015.json", function(data) {
        node = root = data;
        var nodes = treemap.nodes(root);
        var children = nodes.filter(function(d) {
            return !d.children;
        });
        var parents = nodes.filter(function(d) {
            return d.children;
        });
        
        // create parent cells
        var parentCells = chart.selectAll("g.cell.parent")
            .data(parents, function(d) {
                return "p-" + d.id;
            });
            
        var parentEnterTransition = parentCells.enter()
            .append("g")
            .attr("class", "cell parent")
            .on("click", function(d) {
                zoom(d);
            });
            
        parentEnterTransition.append("rect")
            .attr("width", function(d) {
                return Math.max(0.01, d.dx);
            })
            .attr("height", headerHeight)
            .style("fill", headerColor);
            
        parentEnterTransition.append('foreignObject')
            .attr("class", "foreignObject")
            .append("xhtml:body")
            .attr("class", "labelbody")
            .append("div")
            .attr("class", "label");
            
        // update transition
        var parentUpdateTransition = parentCells.transition().duration(transitionDuration);
        parentUpdateTransition.select(".cell")
            .attr("transform", function(d) {
                return "translate(" + d.dx + "," + d.y + ")";
            });
            
        parentUpdateTransition.select("rect")
            .attr("width", function(d) {
                return Math.max(0.01, d.dx);
            })
            .attr("height", headerHeight)
            .style("fill", headerColor);
            
        parentUpdateTransition.select(".foreignObject")
            .attr("width", function(d) {
                return Math.max(0.01, d.dx);
            })
            .attr("height", headerHeight)
            .select(".labelbody .label")
            .text(function(d) {
                return d.name;
            });
        // remove transition
        
        parentCells.exit()
            .remove();
        
        // create children cells
        var childrenCells = chart.selectAll("g.cell.child")
            .data(children, function(d) {
                return "c-" + d.id;
            });
            
        // enter transition
        var childEnterTransition = childrenCells.enter()
            .append("g")
            .attr("class", "cell child")
            .on("click", function(d) {
                zoom(node === d.parent ? root : d.parent);
            })
            .on("mousemove", function(d) {
				var xPosition = d3.event.pageX - 50;
				var yPosition = d3.event.pageY + 15;
	
				tooltip
				.style("left", xPosition + "px")
    			.style("top", yPosition + "px");	
			})
            .on("mouseover", function(d) {
                this.parentNode.appendChild(this); // workaround for bringing elements to the front (ie z-index)
                d3.select(this)
                    .attr("filter", "url(#outerDropShadow)")
                    .select(".background")
                    .style("stroke", "#000000");
               
        		tooltip.transition()        
                .duration(400)   
                .style("opacity", .9);      
                
            	tooltip.html(d.name + "<br/>" + "Salary: " + d.size + "억" + "<br/>" + "WAR: " + d.WAR)  
                // .style("left", xPosition + "px")     
                // .style("top", (d3.event.pageY) + "px");    	
            })
            .on("mouseout", function(d) {
                d3.select(this)
                    .attr("filter", "")
                    .select(".background")
                    .style("stroke", "#FFFFFF");
                
                tooltip.transition()        
                .duration(400)      
                .style("opacity", 0);    
            });
            
        childEnterTransition.append("rect")
            .classed("background", true)
            .style("fill", function(d) {
                return color(d.parent.name);
            });
            
        childEnterTransition.append('foreignObject')
            .attr("class", "foreignObject")
            .attr("width", function(d) {
                return Math.max(0.01, d.dx);
            })
            .attr("height", function(d) {
                return Math.max(0.01, d.dy);
            })
            .append("xhtml:body")
            .attr("class", "labelbody")
            .append("div")
            .attr("class", "label")
            .text(function(d) {
                return d.name;
            }); 	
            
        if (isIE) {
            childEnterTransition.selectAll(".foreignObject .labelbody .label")
                .style("display", "none");
        } else {
            childEnterTransition.selectAll(".foreignObject")
                .style("display", "none");
        }
        
        // update transition
        var childUpdateTransition = childrenCells.transition().duration(transitionDuration);
        childUpdateTransition.select(".cell")
            .attr("transform", function(d) {
                return "translate(" + d.x  + "," + d.y + ")";
            });
            
        childUpdateTransition.select("rect")
            .attr("width", function(d) {
                return Math.max(0.01, d.dx);
            })
            .attr("height", function(d) {
                return d.dy;
            })
            .style("fill", function(d) {
                return color(d.parent.name);
            });
            
        childUpdateTransition.select(".foreignObject")
            .attr("width", function(d) {
                return Math.max(0.01, d.dx);
            })
            .attr("height", function(d) {
                return Math.max(0.01, d.dy);
            })
            .select(".labelbody .label")
            .text(function(d) {
                return d.name;
            });
            
        // exit transition
        childrenCells.exit()
            .remove();
            
        d3.select("select").on("change", function() {
            console.log("select zoom(node)");
            treemap.value(this.value == "size" ? size : WAR)
                .nodes(root);
                
            zoom(node);
        });
        zoom(node);
    });
    
    function size(d) {
        return d.size;
    }
    
    function WAR(d) {
        return d.WAR;
    }
    
    //and another one
    function textHeight(d) {
        var ky = chartHeight / d.dy;
        yscale.domain([d.y, d.y + d.dy]);
        return (ky * d.dy) / headerHeight;
    }
    
    function getRGBComponents (color) {
        var r = color.substring(1, 3);
        var g = color.substring(3, 5);
        var b = color.substring(5, 7);
        return {
            R: parseInt(r, 16),
            G: parseInt(g, 16),
            B: parseInt(b, 16)
        };
    }
    
    function idealTextColor (bgColor) {
        var nThreshold = 105;
        var components = getRGBComponents(bgColor);
        var bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);
        return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";
    }
    
    function zoom(d) {
        this.treemap
            .padding([headerHeight/(chartHeight/d.dy), 0, 0, 0])
            .nodes(d);
            
        // moving the next two lines above treemap layout messes up padding of zoom result
        var kx = chartWidth  / d.dx;
        var ky = chartHeight / d.dy;
        var level = d;
        xscale.domain([d.x, d.x + d.dx]);
        yscale.domain([d.y, d.y + d.dy]);
        if (node != level) {
            if (isIE) {
                chart.selectAll(".cell.child .foreignObject .labelbody .label")
                    .style("display", "none");
            } else {
                chart.selectAll(".cell.child .foreignObject")
                    .style("display", "none");
            }
        }
        
        var zoomTransition = chart.selectAll("g.cell").transition().duration(transitionDuration)
            .attr("transform", function(d) {
                return "translate(" + xscale(d.x) + "," + yscale(d.y) + ")";
            })
            .each("end", function(d, i) {
                if (!i && (level !== self.root)) {
                    chart.selectAll(".cell.child")
                        .filter(function(d) {
                            return d.parent === self.node; // only get the children for selected group
                        })
                        .select(".foreignObject .labelbody .label")
                        .style("color", function(d) {
                            return idealTextColor(color(d.parent.name));
                        });
                    if (isIE) {
                        chart.selectAll(".cell.child")
                            .filter(function(d) {
                                return d.parent === self.node; // only get the children for selected group
                            })
                            .select(".foreignObject .labelbody .label")
                            .style("display", "")
                    } else {
                        chart.selectAll(".cell.child")
                            .filter(function(d) {
                                return d.parent === self.node; // only get the children for selected group
                            })
                            .select(".foreignObject")
                            .style("display", "")
                    }
                }
            });
            
        zoomTransition.select(".foreignObject")
            .attr("width", function(d) {
                return Math.max(0.01, kx * d.dx);
            })
            .attr("height", function(d) {
                return d.children ? headerHeight: Math.max(0.01, ky * d.dy);
            })
            .select(".labelbody .label")
            .text(function(d) {
                return d.name;
            });
            
        // update the width/height of the rects
        zoomTransition.select("rect")
            .attr("width", function(d) {
                return Math.max(0.01, kx * d.dx);
            })
            .attr("height", function(d) {
                return d.children ? headerHeight : Math.max(0.01, ky * d.dy);
            })
            .style("fill", function(d) {
                return d.children ? headerColor : color(d.parent.name);
            });
            
        node = d;
        
        if (d3.event) {
            d3.event.stopPropagation();
        }
    }