
infile = open('C_FC_list.txt','r')
outfile = open('CCD.tsv','w')
outfile2 = open('CUU.tsv','w')

outfile.write('geneName\tgeneID\thour\tvalue\n')
outfile2.write('geneName\tgeneID\thour\tvalue\n')
i = 0
j = 0

for l in infile.readlines() :
	tp = l.rstrip().split()
	if tp[0] == 'CCD' and i<25:
		i+=1
		for k in range(3) :
			outfile.write(tp[1]+'\t'+str(i)+'\t'+str(k+1)+'\t'+str(tp[2+k])+'\n')
	elif tp[0]== 'CUU' and j<25 :
		j+=1
		for k in range(3) :
                        outfile2.write(tp[1]+'\t'+str(j)+'\t'+str(k+1)+'\t'+str(tp[2+k])+'\n')
	

