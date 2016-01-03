var radius=74,
	padding=10;

var color=d3.scale.ordinal()
		.range(["#98abc5","#8a89a6","#7b6888"]);

var arc=d3.svg.arc()
	.outerRadius(radius)
	.innerRadius(radius-30);

var pie=d3.layout.pie("#PieGraph")
	.sort(null)
	.value(function(d){return d.occ;});

d3.csv("data/type_2010.csv",function(error,data){
	if(error) throw	error;

	color.domain(d3.keys(data[0]).filter(function(key){return key!=="region";}));

	data.forEach(function(d){
	d.types=color.domain().map(function(name){
	return{name:name,occ:+d[name]};
});
});

var legend=d3.select("body").append("svg")
	.attr("class","legend")
	.attr("width",radius*2)
	.attr("height",radius*2)
	.selectAll("g")
	.data(color.domain().slice().reverse())
	.enter().append("g")
	.attr("transform",function(d,i){return "translate(0,"+i*20+")";});

legend.append("rect")
	.attr("width",18)
	.attr("height",18)
	.style("fill",color);

legend.append("text")
	.attr("x",24)
	.attr("y",9)
	.attr("dy",".35em")
	.text(function(d){return d;});

var svg=d3.select("body").selectAll("#PieGraph")
	.data(data)
	.enter().append("svg")
	.attr("class","pie")
	.attr("width",radius*2)
	.attr("height",radius*2)
	.append("g")
	.attr("transform","translate("+radius+","+radius+")");

svg.selectAll(".arc")
	.data(function(d){return pie(d.types);})
	.enter().append("path")
	.attr("class","arc")
	.attr("d",arc)
	.style("fill",function(d){return color(d.data.name);});

svg.append("text")
	.attr("dy",".35em")
	.style("text-anchor","middle")
	.text(function(d){return d.region;});


svg.append("text")//데이터수만큼text요소가추가됨
	.attr("class","pieNum")//CSS클래스설정
	.attr("transform",function(d,i){
	return"translate("+arc.centroid(i)+")"//부채꼴의중심으로함(무게중심계산)
})
.text(function(d,i){
	return i.value//값표시
})
});