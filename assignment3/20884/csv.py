
import sys

inputf=open(sys.argv[1], 'r')
outputf=open(sys.argv[2], 'w')

lines = inputf.readlines() 
i=0
c = []
v1 = {}
v2 = {}

outputf.write('c_short,c_long,val1,val2\n')
while(i <(len(lines))) :
	tp = lines[i].split(',')
	if (tp[3]=='"Total"' and tp[5]=='"Total"' and tp[7]=='"Total"' and tp[9]=='"In percentage of Gross Domestic Product"') :
		sname = tp[10][1:len(tp[10])-1]
		name = tp[11][1:len(tp[11])-1]
		name = sname+','+name
		if name not in c:
			c.append(name)
		if tp[12]=='"2013"' :
			v1[name]=str(round(float(tp[20]),2))
		else :
			v2[name]=str(round(float(tp[20]),2))
	i+=1

for name in c :
	val1 = '0'
	val2 = '0'
	if name in v1 :
		val1 = v1[name]
	if name in v2 :
		val2 = v2[name]
	outputf.write(name+','+val1+','+val2+'\n')
