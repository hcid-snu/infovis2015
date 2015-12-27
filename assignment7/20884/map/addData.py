import sys
import json
reload(sys)
sys.setdefaultencoding('utf-8')

jsonfile = open(sys.argv[1],'r')
j = json.load(jsonfile)
d = {}

popfile = open('population','r')
for l in popfile.readlines() :
	tp = l.split()
	d[unicode(tp[0])]=[int(tp[1]), int(tp[2])]

for l in j['objects']['seoul_municipalities_geo']['geometries'] :
	p = l['properties']
	p['population']=d[p['name']]

newfile = open('map.json','w')
json.dump(j, newfile, ensure_ascii=False)
