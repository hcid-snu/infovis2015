var regions={"Jongro-gu", "Jung-gu", "Yongsan-gu", "Seongdong-gu", "Gwangjin-gu", "Dongdaemun-gu","Jungnang-gu","Seongbuk-gu","Gangbuk-gu","Dobong-gu","Nowon-gu","Eunpyeong-gu","Seodaemun-gu","Mapo-gu","Yangcheon-gu","Gangseo-gu","Guro-gu","Geumcheon-gu","Yeongdeungpo-gu","Dongjak-gu","Gwanak-gu","Seocho-gu","Gangnam-gu","Songpa-gu","Gangdong-gu"}, w=925, h=550, margin=30, startYear=2005, endYear=2014, startNum=0, endNum=20, y=d3.scale.linear().domain([endNum,startNum]).range([0+ margin,h- margin]),x=d3.scale.linear().domain([2005,2014]).range([0+ margin-5,w]), years=d3.range(startYear,endYear)
	var vis=d3.select("#vis").append("svg:svg").attr("width",w).attr("height",h).append("svg:g") 
var line=d3.svg.line().x(function(d,i){
		return x(d.x);
	}).y(function(d){
		return y(d.y);
	});
	var countries_regions={};
	d3.text('region1.csv','text/csv',function(text){
		var regions=d3.csv.parseRows(text);
			for(i=1;i<regions.length;i++){
				regions[regions[i][0]]=regions[i][1];}});
		var startEnd={},countryCodes={};
		d3.text('region1.csv','text/csv',function(text){
			var countries=d3.csv.parseRows(text);for(i=1;i<countries.length;i++){
				var values=countries[i].slice(2,countries[i.length-1]);
				var currData=[];countryCodes[countries[i][1]]=countries[i][0];
				var started=false;for(j=0;j<values.length;j++){
					if(values[j]!=''){
					currData.push({x:years[j],y:values[j]});
					if(!started){
						startEnd[countries[i][1]]={'startYear':years[j],'startVal':values[j]};started=true;}
					else if(j==values.length-1){
						startEnd[countries[i][1]]['endYear']=years[j];
						startEnd[countries[i][1]]['endVal']=values[j];}
					}
				}
vis.append("svg:path")
   .data([currData])
   .attr("country",countries[i][1])
   .attr("class",countries_regions[countries[i][1]])
   .attr("d",line)
   .on("mouseover",onmouseover)
   .on("mouseout",onmouseout);}});
vis.append("svg:line")
   .attr("x1",x(2005))
   .attr("y1",y(startNum))
   .attr("x2",x(2014))
   .attr("y2",y(startNum))
   .attr("class","axis")
vis.append("svg:line")
   .attr("x1",x(startYear))
   .attr("y1",y(startNum))
   .attr("x2",x(startYear))
   .attr("y2",y(endNum))
   .attr("class","axis")
vis.selectAll(".xLabel")
   .data(x.ticks(5))
   .enter()
   .append("svg:text")
   .attr("class","xLabel")
   .text(String)
   .attr("x",function(d){return x(d)})
   .attr("y",h-10).attr("text-anchor","middle")
vis.selectAll(".yLabel")
   .data(y.ticks(4))
   .enter()
   .append("svg:text")
   .attr("class","yLabel")
   .text(String)
   .attr("x",0)
   .attr("y",function(d){return y(d)})
   .attr("text-anchor","right")
   .attr("dy",3)
vis.selectAll(".xTicks")
   .data(x.ticks(5))
   .enter()
   .append("svg:line")
   .attr("class","xTicks")
   .attr("x1",function(d){return x(d);})
   .attr("y1",y(startNum))
   .attr("x2",function(d){return x(d);})
   .attr("y2",y(startNum)+7)
vis.selectAll(".yTicks")
   .data(y.ticks(4))
   .enter()
   .append("svg:line")
   .attr("class","yTicks")
   .attr("y1",function(d){return y(d);})
   .attr("x1",x(2004.5)) 
   .attr("y2",function(d){return y(d);})
   .attr("x2",x(2005))
function onclick(d,i){
	var currClass=d3.select(this)
		.attr("class");
			if(d3.select(this).classed('selected')){
				d3.select(this).attr("class",currClass.substring(0,currClass.length-9));}
			else{d3.select(this).classed('selected',true);}}
function onmouseover(d,i){
	var currClass=d3.select(this).attr("class");
		d3.select(this).attr("class",currClass+" current");
		var countryCode=$(this).attr("country");var countryVals=startEnd[countryCode];
		var percentChange=100*(countryVals['endVal']- countryVals['startVal'])/ countryVals['startVal'];
var blurb='<h2>'+ countryCodes[countryCode]+'</h2>';
	blurb+="<p>On averNum: total death "+ Math.round(countryVals['startVal'])+" years in "+ countryVals['startYear']+" and "+ Math.round(countryVals['endVal'])+" years in "+ countryVals['endYear']+", ";
		if(percentChange>=0){
			blurb+="an increase of "+ Math.round(percentChange)+" percent."
		}
		else{
			blurb+="a decrease of "+-1*Math.round(percentChange)+" percent."
		}
blurb+="</p>";$("#default-blurb").hide();$("#blurb-content").html(blurb);}
function onmouseout(d,i){
	var currClass=d3.select(this).attr("class");
	var prevClass=currClass.substring(0,currClass.length-8);
	d3.select(this).attr("class",prevClass);$("#default-blurb").show();$("#blurb-content").html('');}
function showRegion(regionCode){
	var countries=d3.selectAll("path."+regionCode);
		if(countries.classed('highlight')){
			countries.attr("class",regionCode);
		}
		else{
			countries.classed('highlight',true);
		}}				
