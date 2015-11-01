
import re
import sys
infile = open(sys.argv[1],'r')
outfile = open(sys.argv[2],'w')


rowh = ['age']
colh = []
data = []
l = infile.readline()
for t in l.split(',') :
	nums = re.findall(r"[0-9]+",t)
	if len(nums)<1 :
		continue 
	nums = map(int, nums)
	colh.append(sum(nums)/float(len(nums)))
	data.append([])

for l in infile.readlines() :
	tp = l.split(',')
	if tp[2]=='Killed' :
		continue
	rowh.append(tp[1])
	i=0
	for n in tp[4:] :
		data[i].append(n.rstrip())
		i+=1

outfile.write(','.join(rowh)+'\n')
for i in range(len(colh)) :
	outfile.write(str(colh[i])+',')
	outfile.write(','.join(data[i])+'\n')

