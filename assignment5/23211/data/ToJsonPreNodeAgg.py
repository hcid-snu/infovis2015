#-*- coding: utf-8 -*-
import os
import simplejson
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
jsonObj = {}
nameCheck = {}
nodeId = 0
totalNodes = []
with open('json/jdjNode.json') as data:
	dataObj = simplejson.load(data)
	totalNodes = dataObj['nodes']
	for i in range(0, len(totalNodes)):
		nameCheck[totalNodes[i]['name'].decode('utf-8').encode('utf-8')] = i
		
for i in range(1, 51):
	nameCheckEpisode = {}
	node = []
	link = []
	nodeId = 0
	with open('json/jdj'+str(i)+'.json', 'w+') as wf:	
		fileName = 'jdj' + str(i) +'rep.csv'						
		with open(fileName, 'r') as rf:	
			while True:
				curr_line = rf.readline().rstrip().split(',')
				if len(curr_line) == 1:
					break
				for name in curr_line:
					# print len(curr_line)
					if(name not in nameCheckEpisode):
						# s = str(name).decode('utf-8').encode('EUC-KR')			
						obj = totalNodes[nameCheck[name]]	
						nameCheckEpisode[name] = nodeId
						nodeId = nodeId + 1
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
						obj['source'] = nameCheckEpisode[sourceName]
						obj['target'] = nameCheckEpisode[targetName]
						obj['value'] = value
						link.append(obj)
		jsonObj['nodes'] = node
		jsonObj['links'] = link	
		simplejson.dump(jsonObj, wf, ensure_ascii=False)


			# wf.write('%s' % (s[:-1]))
			# wf.write('\n')				







