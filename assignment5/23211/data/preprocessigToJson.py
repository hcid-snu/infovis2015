#-*- coding: utf-8 -*-
import os
import json
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

for i in range(1, 51):
	fileName = 'jdj' + str(i) +'rep.csv'
	jsonObj = {}
	node = []
	link = []
	nameCheck = {}
	nodeId = 0
	with open('json/jdj' +str(i)+ '.json', 'w+') as wf:
		with open(fileName, 'r') as rf:	
			while True:
				curr_line = rf.readline().rstrip().split(',')
				if len(curr_line) == 1:
					break
				for name in curr_line:
					# print len(curr_line)
					if(name not in nameCheck):
						# s = str(name).decode('utf-8').encode('EUC-KR')
						s = name
						nameCheck[s] = nodeId
						nodeId = nodeId +1 
						obj = {}
						obj['name'] = s
						node.append(obj)
			jsonObj['nodes'] = node
		with open(fileName, 'r') as rf:	
			while True:
				curr_line = rf.readline().rstrip().split(',')
				if len(curr_line) == 1:
					break
				length = len(curr_line)
				value = 1.0 / (length*(length-1)/2)		
				for i in range(length):				
					sourceName = curr_line[i]
					for j in range(i+1, length):
						targetName = curr_line[j]
						obj = {}
						obj['source'] = nameCheck[sourceName]
						obj['target'] = nameCheck[targetName]
						obj['value'] = value
						link.append(obj)
			jsonObj['links'] = link
		json.dump(jsonObj, wf, ensure_ascii=False)


			# wf.write('%s' % (s[:-1]))
			# wf.write('\n')				







