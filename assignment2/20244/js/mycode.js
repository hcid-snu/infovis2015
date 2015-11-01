/**
 * @author Joon-min Lee
 */
var wing1 = d3.select("#myWing1")
wing1.style("opacity", "0")
    
var wing2 = d3.select("#myWing2")
wing2.style("opacity", "0")
  
function showWing1() {
    var wing = document.getElementById("myWing2");
    if (wing.style.opacity == 0) {
        wing.style.opacity = 1;
    } else {
       wing.style.opacity = 0;
    }
}

function showWing2() {
    var wing = document.getElementById("myWing1");
    if (wing.style.opacity == 0) {
        wing.style.opacity = 1;
    } else {
       wing.style.opacity = 0;
    }
}