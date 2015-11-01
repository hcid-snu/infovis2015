d3.csv("random.csv", function(error, data){
	var dataSet = [ ];
	for(var i=0; i<data.length; i++){
		dataSet.push(data[i].item1);
	}
document.write(dataSet)