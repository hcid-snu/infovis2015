

d3.csv("oecd_welfare.csv", function(error, data){  var dataSet = []  
for(var i = 0; i < data.length; i++) { 
dataSet.push(data[i].item1)  } 
 
... 
  }) 