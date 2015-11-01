//HONG NAHI 2015-20247//

var svg = d3.select("#color").append("svg");

//1ST COLUMN// 
//1,2//
var square = svg.append("rect")
    .attr("height", 88)
    .attr("width", 82)
    .attr("x", 6)
    .attr("y", 155)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#B0E0E6")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//1,3//
var square = svg.append("rect")
    .attr("height", 66)
    .attr("width", 82)
    .attr("x", 6)
    .attr("y", 249)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#9ACD32")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//1,4//
var square = svg.append("rect")
    .attr("height", 109)
    .attr("width", 81)
    .attr("x", 6)
    .attr("y", 320)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#8B0000")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//1,5//
var square = svg.append("rect")
    .attr("height", 171)
    .attr("width", 81)
    .attr("x", 6)
    .attr("y", 435)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#1E90FF")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });

//2ND COLUMN//
//2,1//
var square = svg.append("rect")
    .attr("height", 139)
    .attr("width", 54)
    .attr("x", 93)
    .attr("y", 6)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "green")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//2,2//
var square = svg.append("rect")
    .attr("height", 88)
    .attr("width", 54)
    .attr("x", 93)
    .attr("y", 155)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#808000")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//2,3//
var square = svg.append("rect")
    .attr("height", 66)
    .attr("width", 54)
    .attr("x", 93)
    .attr("y", 249)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#FA8080")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//2,4//
var square = svg.append("rect")
    .attr("height", 109)
    .attr("width", 54)
    .attr("x", 93)
    .attr("y", 320)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#66CDAA")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    }); 
//2,5,1//
var square = svg.append("rect")
    .attr("height", 115)
    .attr("width", 54)
    .attr("x", 93)
    .attr("y", 435)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#2F4F4F")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    }); 
//2,5,2//
var square = svg.append("rect")
    .attr("height", 39)
    .attr("width", 54)
    .attr("x", 93)
    .attr("y", 567)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#DC143C")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    }); 

//3RD COLUMN//
//3,1//
var square = svg.append("rect")
    .attr("height", 139)
    .attr("width", 66)
    .attr("x", 153)
    .attr("y", 6)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#FFCC99")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//3,2,1//
var square = svg.append("rect")
    .attr("height", 88)
    .attr("width", 36)
    .attr("x", 153)
    .attr("y", 155)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#9370DB")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//3,2,2//
var square = svg.append("rect")
    .attr("height", 88)
    .attr("width", 24)
    .attr("x", 195)
    .attr("y", 155)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#98FB98")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//3,3,1//
var square = svg.append("rect")
    .attr("height", 66)
    .attr("width", 36)
    .attr("x", 153)
    .attr("y", 249)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#32CD32")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//3,3,2//
var square = svg.append("rect")
    .attr("height", 66)
    .attr("width", 24)
    .attr("x", 195)
    .attr("y", 320)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#FFA500")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//3,4,1//
var square = svg.append("rect")
    .attr("height", 110)
    .attr("width", 36)
    .attr("x", 153)
    .attr("y", 320)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#8B4513")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//3,4,2//
var square = svg.append("rect")
    .attr("height", 110)
    .attr("width", 24)
    .attr("x", 195)
    .attr("y", 320)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#AFEEEE")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//3,5,1,1//
var square = svg.append("rect")
    .attr("height", 39)
    .attr("width", 36)
    .attr("x", 153)
    .attr("y", 567)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#696969")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//3,5,1,2//
var square = svg.append("rect")
    .attr("height", 39)
    .attr("width", 24)
    .attr("x", 195)
    .attr("y", 567)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#4682B4")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });    
//3,5,2,1//
var square = svg.append("rect")
    .attr("height", 115)
    .attr("width", 36)
    .attr("x", 153)
    .attr("y", 435)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#FF6347")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//3,5,2,2//
var square = svg.append("rect")
    .attr("height", 115)
    .attr("width", 24)
    .attr("x", 195)
    .attr("y", 435)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#228B22")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });    

//4TH COLUMN//
//4,1//
var square = svg.append("rect")
    .attr("height", 139)
    .attr("width", 134)
    .attr("x", 225)
    .attr("y", 6)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#00008B")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//4,2//
var square = svg.append("rect")
    .attr("height", 88)
    .attr("width", 133)
    .attr("x", 225)
    .attr("y", 155)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#FF69B4")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//4,3//
var square = svg.append("rect")
    .attr("height", 66)
    .attr("width", 133)
    .attr("x", 225)
    .attr("y", 249)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#3CB371")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//4,4//
var square = svg.append("rect")
    .attr("height", 109)
    .attr("width", 133)
    .attr("x", 225)
    .attr("y", 320)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#808080")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });
//4,5//
var square = svg.append("rect")
    .attr("height", 171)
    .attr("width", 133)
    .attr("x", 225)
    .attr("y", 435)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "0.02")
    .on("mouseover", function() {
        d3.select(this)
          .attr("fill", "#6B8E23")
        })
    .on("mouseout", function(d) {
        d3.select(this)
          .attr("fill", "white");
    });

//5TH COLUMN//
//5,1//
var square = svg.append("rect")
.attr("height", 139)
.attr("width", 125.5)
.attr("x", 368)
.attr("y", 6)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#FF1493")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//5,2&3//
var square = svg.append("rect")
.attr("height", 160)
.attr("width", 125.5)
.attr("x", 368)
.attr("y", 155)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#F0FFFF")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//5,4//
var square = svg.append("rect")
.attr("height", 109)
.attr("width", 125.5)
.attr("x", 368)
.attr("y", 320)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#00FF00")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//5,5,1//
var square = svg.append("rect")
.attr("height", 45.5)
.attr("width", 125.5)
.attr("x", 368)
.attr("y", 546)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#0000CD")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//5,5,2//
var square = svg.append("rect")
.attr("height", 9)
.attr("width", 125.5)
.attr("x", 368)
.attr("y", 597)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#FFDAB9")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});

//6TH COLUMN//
//6,1//
var square = svg.append("rect")
.attr("height", 139)
.attr("width", 29)
.attr("x", 502)
.attr("y", 6)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#D88FD8")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//6,2//
var square = svg.append("rect")
.attr("height", 88)
.attr("width", 29)
.attr("x", 502)
.attr("y", 155)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#ADFF2F")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//6,3//
var square = svg.append("rect")
.attr("height", 66)
.attr("width", 29)
.attr("x", 502)
.attr("y", 249)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#B22222")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//6,4//
var square = svg.append("rect")
.attr("height", 109)
.attr("width", 29)
.attr("x", 502)
.attr("y", 320)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#FFEBCD")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//6,5,1//
var square = svg.append("rect")
.attr("height", 99)
.attr("width", 29)
.attr("x", 502)
.attr("y", 435)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#4169E1")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//6,5,2//
var square = svg.append("rect")
.attr("height", 45.5)
.attr("width", 29)
.attr("x", 502)
.attr("y", 546)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#F0E68C")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//6,5,3//
var square = svg.append("rect")
.attr("height", 9)
.attr("width", 29)
.attr("x", 502)
.attr("y", 597)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#800000")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});

//7TH COLUMN//
//7,1//
var square = svg.append("rect")
.attr("height", 139)
.attr("width", 42)
.attr("x", 537)
.attr("y", 6)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#20B2AA")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//7,2//
var square = svg.append("rect")
.attr("height", 88)
.attr("width", 42)
.attr("x", 537)
.attr("y", 155)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#F08080")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//7,3//
var square = svg.append("rect")
.attr("height", 66)
.attr("width", 42)
.attr("x", 537)
.attr("y", 249)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#7FFF00")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//7,4//
var square = svg.append("rect")
.attr("height", 109)
.attr("width", 42)
.attr("x", 537)
.attr("y", 320)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#FFB6C1")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//7,5//
var square = svg.append("rect")
.attr("height", 171)
.attr("width", 42)
.attr("x", 537)
.attr("y", 435)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#FFA07A")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//8TH COLUMN//
//8,1//
var square = svg.append("rect")
.attr("height", 139)
.attr("width", 21)
.attr("x", 585)
.attr("y", 6)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#DAA520")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//8,2//
var square = svg.append("rect")
.attr("height", 88)
.attr("width", 21)
.attr("x", 585)
.attr("y", 155)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#00FA9A")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//8,3//
var square = svg.append("rect")
.attr("height", 66)
.attr("width", 21)
.attr("x", 585)
.attr("y", 249)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#C71585")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//8,4//
var square = svg.append("rect")
.attr("height", 109)
.attr("width", 21)
.attr("x", 585)
.attr("y", 320)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#DEB887")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//8,5,1//
var square = svg.append("rect")
.attr("height", 110)
.attr("width", 21)
.attr("x", 585)
.attr("y", 435)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#8B008B")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});
//8,5,2//
var square = svg.append("rect")
.attr("height", 46)
.attr("width", 21)
.attr("x", 585)
.attr("y", 560)
.attr("fill", "white")
.attr("stroke", "black")
.attr("stroke-width", "0.02")
.on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#00BFFF")
    })
.on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "white");
});

