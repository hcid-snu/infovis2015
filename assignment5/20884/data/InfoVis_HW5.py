
import sys

pname = open('kegg_osa_pathway.txt','r')
pnameDict = {}
for l in pname.readlines() :
	tp = l.split('\t')
	fullname = tp[1].split(' - Oryza')[0]
	pnameDict[tp[0][8:]] = fullname 

hfile = open('kegg_hierarchy.txt','r')
pathDict = {}
groups = []
group = ''
for l in hfile.readlines() :
	if l[0]=='A' :
		group = l[3:].rstrip()
		groups.append(group)
	elif l[0]=='C' :
		pathDict[l[5:10]]=group
	else :
		continue
groups.append('Others')

jsonfile = open('TRAP.json','w')
nodef = open('TimeSeries_node.txt','r')
edgef = open('TimeSeries_edge.txt','r')

jsonfile.write('{ "nodes":[ \n')
nodef.readline()
nodes = []
nodeDict = {}
i =0
for l in nodef.readlines():
	tp = l.split()
	pathway = tp[0][3:]
	if pathway not in nodeDict :
		nodeDict[pathway]=i
		i+=1
	if pathway in pathDict :
		g = groups.index(pathDict[pathway])
	else :
		g = len(groups)-1
	if pathway not in pnameDict :
		print pathway
	fullname = pnameDict[pathway]
	nodes.append('{"name":"'+pathway+'", "group":'+str(g)+', "fullName":"'+fullname+'"}')

jsonfile.write(',\n'.join(nodes)+' ], \n"links":[ ')
edgef.readline()
edges = []
for l in edgef.readlines() :
	tp = l.split()
	n1 = tp[0][3:]
	n2 = tp[1][3:]
	v = tp[2]
	edges.append('{"source":'+str(nodeDict[n1])+', "target":'+str(nodeDict[n2])+', "value":'+v+'}')

jsonfile.write(',\n'.join(edges)+' ], \n "groups":[ ')
groupL = []
for i in range(len(groups)) :
	groupL.append('{"group":'+str(i)+', "groupName":"'+groups[i]+'"}')
jsonfile.write(',\n'.join(groupL)+' ]}')

