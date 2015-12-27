#-*- coding: utf-8 -*-
import os
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

for i in range(1, 51):
	fileName = 'jdj' + str(i) +'.csv'

	with open(fileName, 'r') as rf:
		with open('jdj' +str(i)+ 'rep.csv', 'w+') as wf:
			while True:
				curr_line = rf.readline().rstrip().split(',')
				if len(curr_line) == 1:
					break
				s = ''
				for name in curr_line:
					if(len(name) != 0):
						s = s + name +','

				wf.write('%s' % (s[:-1]))
				wf.write('\n')				







