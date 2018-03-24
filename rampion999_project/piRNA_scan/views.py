from django.shortcuts import render, get_object_or_404, redirect, HttpResponse, render_to_response, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.contrib.auth import authenticate, login
from multiprocessing import Process, Lock, Queue ,JoinableQueue, active_children
import time
import csv
from django.http import JsonResponse
from django.utils.encoding import smart_str
import json
import os
import re
import math
import operator
# import pandas as pd
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie

# Create your views here.

def readUserNum(request):
	module_dir = os.path.dirname(__file__)
	userNum = int(request.POST.get('userNum'))
	if os.path.isfile(os.path.join(module_dir,'temp/userNum{0}.csv'.format(userNum))):
		out = userNum
	else:
		out = 'nonono'
	return JsonResponse({'out':out})

def deleteUserNum(request):
	module_dir = os.path.dirname(__file__)
	userNum = request.POST.get('userNum')
	liCount = int(request.POST.get('qq')) - 1
	lastqq = int(request.POST.get('lastqq'))
	os.remove(os.path.join(module_dir,'temp/userNum{0}.csv'.format(userNum)))
	os.remove(os.path.join(module_dir,'temp/tableData0_{0}.csv'.format(userNum)))
	os.remove(os.path.join(module_dir,'temp/ori_result{0}.json'.format(userNum)))
	os.remove(os.path.join(module_dir,'temp/ori_base_result{0}.json'.format(userNum)))
	TTT = 1
	while liCount:
		if TTT < liCount:	
			os.remove(os.path.join(module_dir,'temp/modify{0}_{1}.csv'.format(TTT,userNum)))
			os.remove(os.path.join(module_dir,'temp/tableData{0}_{1}.csv'.format(TTT,userNum)))
			os.remove(os.path.join(module_dir,'temp/picked_{0}_{1}.json'.format(TTT,userNum)))
			os.remove(os.path.join(module_dir,'temp/posToDiv_{0}_{1}.json'.format(TTT,userNum)))
			os.remove(os.path.join(module_dir,'temp/sucResult_{0}_{1}.txt'.format(TTT,userNum)))
			TTT += 1		
		elif TTT == liCount and lastqq == 1:
			os.remove(os.path.join(module_dir,'temp/modify{0}_{1}.csv'.format(TTT,userNum)))
			os.remove(os.path.join(module_dir,'temp/tableData{0}_{1}.csv'.format(TTT,userNum)))
			os.remove(os.path.join(module_dir,'temp/picked_{0}_{1}.json'.format(TTT,userNum)))
			os.remove(os.path.join(module_dir,'temp/posToDiv_{0}_{1}.json'.format(TTT,userNum)))
			os.remove(os.path.join(module_dir,'temp/sucResult_{0}_{1}.txt'.format(TTT,userNum)))
			break
		elif TTT == liCount and lastqq == 0:
			os.remove(os.path.join(module_dir,'temp/modify{0}_{1}.csv'.format(TTT,userNum)))
			os.remove(os.path.join(module_dir,'temp/picked_{0}_{1}.json'.format(TTT,userNum)))
			os.remove(os.path.join(module_dir,'temp/posToDiv_{0}_{1}.json'.format(TTT,userNum)))
			break
	# with open(os.path.join(module_dir,'userNum.csv'),'w') as f1:
	# 	w1 = csv.writer(f1)
	# 	w1.writerow([userNum])
	# 	w1.writerow(['reset'])
	return JsonResponse({'OK':'OK'})

def preeeCheck(request):
	module_dir = os.path.dirname(__file__)
	if os.path.exists(os.path.join(module_dir,'temp/ruleInfo.json')):
		with open(os.path.join(module_dir,'temp/ruleInfo.json'),'r') as w1:
			data = json.load(w1)
		os.remove(os.path.join(module_dir,'temp/ruleInfo.json'))
	else:
		data = {'OK':'OK'}
	return JsonResponse(data)

def piRNA(request):
	return render(request, 'piRNA/home.html')

def update(request):
	return render(request, 'piRNA/update.html')

def goScan(request):
	return render(request, 'piRNA/scan.html')

def goTutorial(request):
	return render(request, 'piRNA/tutorial.html')

def goContact(request):
	return render(request, 'piRNA/contact.html')

def goResult(request):
	return render(request, 'piRNA/result.html')


def create_data(request):
	module_dir = os.path.dirname(__file__)
	userNum = request.POST.get('userNum')
	modifyCount = request.POST.get('modifyCount')
	print('!!!!!!!!!!!!!!!')
	print(userNum)
	with open(os.path.join(module_dir,'temp/modify'+modifyCount+'_'+userNum+'.csv'),'w',encoding='utf8') as f1:
		mod = csv.writer(f1)
		s1 = request.POST.get('name').strip()
		s2 = request.POST.get('data1').strip()
		mod.writerow([s1])
		mod.writerow([s2])
		mod.writerow([request.POST.get('opt1')])
		mod.writerow([request.POST.get('opt2')])
		mod.writerow([request.POST.get('opt3')])
		mod.writerow([request.POST.get('opt4')])
		mod.writerow([request.POST.get('opt5')])
		mod.writerow([request.POST.get('nematodeType')])
		mod.writerow([request.POST.get('CDS_1')])
		mod.writerow([request.POST.get('CDS_2')])
		mod.writerow([request.POST.get('posString')])
		mod.writerow([request.POST.get('selectInfoStr')])
		mod.writerow([request.POST.get('posToDivNumStr')])
		mod.writerow([request.POST.get('pickedStr')])
	with open(os.path.join(module_dir,'selected.csv'),'w',encoding='utf8') as f1:
		ww = csv.writer(f1)
		for j in range(int(request.POST.get('select_num'))):
			ww.writerow([request.POST.get('selected[{0}]'.format(j)),request.POST.get('ori_piRNA[{0}]'.format(j))])
	return JsonResponse({'OK':'OK'})

def strtr(text, dic):
	# Create a regular expression  from the dictionary keys
	import re
	regex = re.compile("(%s)" % "|".join(map(re.escape, dic.keys())))
	# For each match, look-up corresponding value in dictionary
	return regex.sub(lambda mo: str(dic[mo.string[mo.start():mo.end()]]), text)

def complement(seq):
	replacements = {
	"A" : "U",
	"U" : "A",
	"G" : 'C',
	"C" : 'G'
	}
	out = strtr(seq,replacements)
	return out

def rreplace(s, old, new, occurrence):
	li = s.rsplit(old, occurrence)
	return new.join(li)

def CDS(RNA,CDS1,CDS2):
	module_dir = os.path.dirname(__file__)
	with open(os.path.join(module_dir,'piRNA/CDS/CDS2.csv'),'r',encoding='utf8') as f1:
		reader1 = csv.reader(f1)
		global CDS_ori
		CDS_ori={}
		key=''
		key_check=[]
		value=''
		for i in reader1:
			if i[0]!='':
				value=i[0].replace(u'\ufeff', '')
				CDS_ori[i[1].replace('*','')]=value
			else:
				CDS_ori[i[1].replace('*','')]=value
	CDS_str = ''
	if CDS1==0 or CDS2==0:
		CDS_str='QQQQQ'
	else:
		start=CDS1
		while start < CDS2:
			CDS_str+=CDS_ori[RNA[start-1:start+2]].upper()
			start+=3
	with open(os.path.join(module_dir,'piRNA/CDS/CDS_OK.csv'),'r',encoding='utf8') as f2:
		global CDScodonDict
		reader2 = csv.reader(f2)
		CDScodonDict = {}
		for x in reader2:
			value = x[0].replace(u'\ufeff', '')
			x.pop(0)
			CDScodonDict[value]=[]
			for y in x:
				if value == 'L' or value == 'R' or value == 'S':
					CDScodonDict[value].append(y)
				else:
					CDScodonDict[value].append(y[2])
	return CDS_str

def scan_main(request):
	global scoreA,scoreB,scoreC,scoreD
	scoreA = 7
	scoreB = 1.5
	scoreC = 2
	scoreD = 1.5
	module_dir = os.path.dirname(__file__)
	userNum = int(request.POST.get('userNum'))
	operationTimes = int(request.POST.get('operationTimes'))		
	# x = request.POST.get('sth')
	if request.POST.get('data1') == '':
		data = {'state':'nothing'}
	# elif re.search("^\s?>[A-Za-z0-9|_,+#)(.\s]+\s[A-Za-z\s]+$",request.POST.get('data1')) == None:
	# 	data = {'state':'notfasta'}
	# elif request.POST.get('nematodeType') == 'C.remanei' or request.POST.get('nematodeType') == 'C.brenneri':
	# 	data = {'state':'nematode'}
	else:
		with open(os.path.join(module_dir,'temp/userNum{0}.csv'.format(userNum)),'w') as f1:
			w1 = csv.writer(f1)
			w1.writerow([userNum])

		# 紀錄今天掃描第幾次
		# with open(os.path.join(module_dir,'temp/date.csv'),'r') as r1:
		# 	read1 = csv.reader(r1)
		# 	for x in read1:
		# 		if x[0] == time.strftime("%m%d%Y", time.localtime()):
		# 			day = x[0]
		# 			role = int(x[1]) + 1
		# 		else:
		# 			day = time.strftime("%m%d%Y", time.localtime())
		# 			role = 1
		# with open(os.path.join(module_dir,'temp/date.csv'),'w') as w1:
		# 	wri1 = csv.writer(w1)
		# 	wri1.writerow([day,role])


		seqName = request.POST.get('seqName')
		if seqName == '':
			data = {'state':'noSeqName'}
			return JsonResponse(data)

		originalSeq = request.POST.get('data1')
		Gene_OK = originalSeq.strip().split('\n')
		name = seqName
		Gene_OK_Str = ''.join(Gene_OK)
		RNA = strtr(Gene_OK_Str.upper(),{'T':'U'}) #將輸入基因T轉成U
		if re.search("^[AUCG]+$",RNA) == None:
			data = {'state':'weridType'}
			return JsonResponse(data)
		
		Arr2 = list(RNA)
		options = {'core_non_GU':request.POST.get('opt1'),'core_GU':request.POST.get('opt2'),'non_core_non_GU':request.POST.get('opt3'),'non_core_GU':request.POST.get('opt4'),'total':request.POST.get('opt5'),'nematodeType':request.POST.get('nematodeType')}
		with open(os.path.join(module_dir,'piRNA/{0}/info_name.csv'.format(options['nematodeType'])),'r') as f2:
			reader2 = csv.reader(f2)
			info_names = []
			for x in reader2:
				info_names.append(x[0])
		if request.POST.get('CDS_1') == '-555':
			CDS1 = 1
		elif request.POST.get('CDS_1')is'0' : 
			return JsonResponse({'state':'CDSX'})
		elif request.POST.get('CDS_1')!='' : 
			CDS1 = int(request.POST.get('CDS_1'))	
		else: 
			CDS1 = 0




		if request.POST.get('CDS_2') == '-555':
			CDS2 = len(Arr2)
			CDS_region = 'Whole input sequence'
		elif request.POST.get('CDS_2')is'0' : 
			return JsonResponse({'state':'CDSX'})
		elif request.POST.get('CDS_2')!='' :
			CDS2 = int(request.POST.get('CDS_2'))
			CDS_region = str(CDS1)+' - '+str(CDS2)
		else: 
			CDS2 = 0
			CDS_region = 'None'

		if (CDS1==0 and CDS2!=0) or (CDS2==0 and CDS1!=0) or ((CDS1!= 0 and CDS2!= 0) and ((CDS1 >= CDS2) or ((CDS2-CDS1-2)%3 !=0) or (CDS2 > len(Arr2)) or (CDS1 < 1))):
			data = {'state':'CDSX'}
		else:
			mission_count = {'C.elegans':357, 'C.briggsae':290, 'C.brenneri':1157, 'C.remanei':813}
			
			result=[]
			start_time = time.time()
			q = JoinableQueue()
			for num in range(mission_count[options['nematodeType']]):
				Process(target=scan, args=(q, num ,Arr2 ,options)).start()
			for t in range(mission_count[options['nematodeType']]):
				a = q.get()
				if a != 'N/A':
					for x in a:
						result.append(x)
				q.task_done()
			q.join()
			outForAdvice = result
			CDSout = CDS(RNA,CDS1,CDS2)
			sug = suggestion(result,CDS1,CDS2,RNA,options)
			sug['inCDS'] = sorted(sug['inCDS'], key=operator.itemgetter(1))
			sug['notInCDS'] = sorted(sug['notInCDS'], key=operator.itemgetter(1))
			for i in sug['inCDS']:				
				i[7] = sorted(i[7], key=operator.itemgetter(1),reverse=False)
				i[7] = sorted(i[7], key=operator.itemgetter(7),reverse=False)
			for i in sug['notInCDS']:				
				i[7] = sorted(i[7], key=operator.itemgetter(0),reverse=False)
				i[7] = sorted(i[7], key=operator.itemgetter(5),reverse=True)
			example1 = 'atgagtaaaggagaagaacttttcactggagttgtcccaattcttgttgaattagatggtgatgttaatgggcacaaattttctgtcagtggagagggtgaaggtgatgcaacatacggaaaacttacccttaaatttatttgcactactggaaaactacctgttccatggccaacacttgtcactactctcacttatggtgttcaatgcttctcgagatacccagatcatatgaaacagcatgactttttcaagagtgccatgcccgaaggttatgtacaggaaagaactatatttttcaaagatgacgggaactacaagacacgtgctgaagtcaagtttgaaggtgatacccttgttaatagaatcgagttaaaaggtattgattttaaagaagatggaaacattcttggacacaaattggaatacaactataactcacacaatgtatacatcatggcagacaaacaaaagaatggaatcaaagttaacttcaaaattagacacaacattgaagatggaagcgttcaactagcagaccattatcaacaaaatactccaattggcgatggccctgtccttttaccagacaaccattacctgtccacacaatctgccctttcgaaagatcccaacgaaaagagagaccacatggtccttcttgagtttgtaacagctgctgggattacacatggcatggatgaactatacaaatag'.upper().replace("T","U")
			example2 = 'agttttactttttcgcttttcgATGGCACCTCCACAAGTAAGAAGGTCCGCTAGGTTAAGCAAGAGATGCCAAGAAGAAAAGGTTAAGCTTCAGAAGAAAAATGTCGGATTTAAGGCAAAATCTAAGTCGGCTAAAAAGAGTAATAAGAAATTCAAGAAAGCTGCCGCTCAAAGACAAAGCCCAATTGACATCGTCCCACAACACGTGTGCTGTGACACAGACGTTTGCAAGGCTGATGCCTTGAACATTGACTACAAATCAGGTGACTGTTGCGATGTCCTTGTCTCCGAAGGAGGTTTCCTTGTGAATGTCAAGAGAAATTGTGGCACATTCCTTACCGCCAACCATTTACCATCATCAAAATTCGCGTTGGCTCAGTTCCATGCTCATTGGGGAAGCAACTCGAAAGAAGGATCCGAGCACTTTTTGGACGGAAAACAACTTAGCGGAGAGGTTCACTTTGTATTCTGGAACACCAGCTATGAGTCGTTTAATGTGGCACTCAGCAAGCCCGATGGATTGGCGGTTGTTGGAGTCTTCTTGAAGGAAGGAAAATACAATGACAATTACCATGGCCTGATCGACACAGTGCGCAAAGCCACCGGAAATGCCACACCAATTGCCATGCCAAAAGACTTCCACATTGAGCATCTTCTCCCATCCCCGGACAAGAGAGAATTCGTTACATACCTCGGATCCCTTACCACCCCACCATACAACGAGTGTGTTATCTGGACCTTGTTCACAGAGCCTGTGGAGGTCTCCTTCGGACAGCTCAACGTGCTCCGTAATATCATCCCCGCCAATCATCGCGCCTGCCAAGACAGATGCGACCGTGAAATCCGATCTTCCTTCAACTTTTAAatttcttatttttttcccttctcaatggttttttctatttagtttttctgtacgagaacaactcacaatcatcatgtaaaaaacaagttcacacccccgtgccgatgtaagtatgaaacgtctctttcccctcagaacatacatgtacgaagaagagcttaacactcttttctgctttctcattataaataatttagtattcaactggaataaaaagtttttcgctt'.upper().replace("T","U")
			if RNA == example1 :
				EX = 'ex1'
			elif RNA == example2 :
				EX = 'ex2'
			else:
				EX = 'noEx'
			data = {
				'CDS':[CDSout],
				'advice':[],
				'gene':RNA,
				'name':name,
				'newout':result,
				'options':options,
				'piRNA_info_name':info_names,
				'suggestion':sug,
				'CDS1':CDS1,
				'CDS2':CDS2,
				'EX':EX,
				'csrf':request.POST.get('csrfmiddlewaretoken'),
				'userNum':userNum,
				'CDS_region':CDS_region,
				'Tscore':[scoreA,scoreB,scoreC,scoreD],
				'originalSeq':originalSeq
			}

			if options['nematodeType'] == 'C.elegans':
				with open(os.path.join(module_dir,'elegansNameToId.json'),'r') as w1:
					e_NameToId = json.load(w1)
				data['e_NameToId'] = e_NameToId

			result = sorted(result, key = lambda l:int(l[1].split('-')[0]))
			result = sorted(result, key=operator.itemgetter(14),reverse=True)

			#存table資料 
			with open(os.path.join(module_dir,'temp/tableData{0}_{1}.csv'.format(operationTimes,userNum)),'w') as w1:
				wr1 = csv.writer(w1)
				wr1.writerow(['Sequence name: '+ seqName])
				wr1.writerow(['Specify coding sequence (CDS) region: '+ CDS_region])
				wr1.writerow(['piRNA targeting rules: '])
				wr1.writerow(['Seed region: non-GU: up to {0}, GU: up to {1}'.format(options['core_non_GU'],options['core_GU'])])
				wr1.writerow(['Non-seed region: nonGU: up to {0}, GU: up to {1}'.format(options['non_core_non_GU'],options['non_core_GU'])])
				wr1.writerow(['Total mismatches: up to {0}'.format(options['total'])])
				wr1.writerow([''])
				wr1.writerow(['piRNA','piRNA targeting score','targeted region in input sequence','# mismatches','position in piRNA','# non-GU mismatches in seed region','# GU mismatches in seed region','# non-GU mismatches in non-seed region','# GU mismatches in non-seed region','5\' Input sequence 3\'','3\' piRNA 5\''])
				for td in result:
					detailTopStr = re.sub("<.*?>", "", td[9]).replace("5' ",'').replace(" 3'",'').replace("|",'')
					detailBotStr = re.sub("<.*?>", "", td[10]).replace("3' ",'').replace(" 5'",'').replace("|",'')
					detail = detailTopStr + '\n' + detailBotStr
					wr1.writerow([td[0],10-int(td[5])*scoreA-int(td[6])*scoreB-int(td[7])*scoreC-int(td[8])*scoreD,td[1],td[2],re.sub("<.*?>", "", td[3]),td[5],td[6],td[7],td[8],detailTopStr,detailBotStr])


			ori_result = data
			with open(os.path.join(module_dir,'temp/ori_result{0}.json'.format(userNum)),'w') as w1:
				json.dump(data,w1,indent=4)
	return JsonResponse(data)

def keepOld(request):
	module_dir = os.path.dirname(__file__)
	userNum = request.POST.get('userNum')
	with open(os.path.join(module_dir,'temp/ori_result'+userNum+'.json'),'r') as w1:
		data = json.load(w1)
	with open(os.path.join(module_dir,'temp/ori_base_result'+userNum+'.json'),'w') as w1:
		json.dump(data,w1,indent=4)
	return JsonResponse(data)	

def goBack(request):
	module_dir = os.path.dirname(__file__)
	# rules
	data = {
		'originalSeq':request.POST.get('originalSeq'),
		'name':request.POST.get('name'),
		'CDS_region':request.POST.get('CDS_region'),
		'a':request.POST.get('a'),
		'b':request.POST.get('b'),
		'c':request.POST.get('c'),
		'd':request.POST.get('d'),
		'e':request.POST.get('e'),
	}
	with open(os.path.join(module_dir,'temp/ruleInfo.json'),'w') as w1:
		json.dump(data,w1,indent=4)
	return JsonResponse(data)

def scan(q,num,Arr2,options):
	global piRNA_Length
	module_dir = os.path.dirname(__file__)
	with open(os.path.join(module_dir,'piRNA/{0}/piRNA{1}.txt'.format(options['nematodeType'],num+1)),'r') as f1:
		reader1 = csv.reader(f1)
		ArrPiRNA = []
		piRNA_information = []
		for x in reader1:
			ArrPiRNA.append([x[0],x[1].strip()])
			piRNA_Length = len(x[1])
			x.pop(0)
			x.pop(0)
			ArrPiRNA[len(ArrPiRNA)-1].append(x)
			# piRNA_information.append(x)

	#掃起來
	outArr = []
	for key in ArrPiRNA:
		Arr1 = list(complement(key[1][::-1]))   #piRNA做reverse compliment然後將字符切成21個陣列
		for a in range(len(Arr2)-len(Arr1)+1): # a=大RNA的次序 a次數不會大於(總長-piRNA長)，用range所以+1
			GG = 1   #q=同一個序列第幾次結果
			Arr4 = []
			ArryxGU = []  #$Arr4存沒對到的位置 $ArryxGU存不是GU的錯誤位置
			Arr3 = list(key[1][::-1])
			Arr5 = list(key[1][::-1])  #Arr5存piRNA的Reverse秀結果用 

			"""RNA reverse compliment後從第一位開始掃，也就是序列後方開始 
				$d計算core_non_GU $e計算non_core_non_GU $m計算core_GU 
				$n計算non_core_GU $o計算第一位"""
			# if key[0]=='21ur-9758':   


			b = a +len(Arr1)-2
			c = len(Arr1)-2
			d = 0
			e = 0
			m = 0
			n = 0
			o = 0
			while(b>=a):
				if d + e + m + n > int(options['total']):
					#錯誤總數大於total
					b-=1
					c-=1
					break
				elif c >= len(Arr1)-7 and Arr2[b] != Arr1[c]:
					# core區沒對到
					if (Arr2[b]=='G' and Arr1[c]=='A') or (Arr2[b]=='U' and Arr1[c]=='C'):
						#沒對到的是GU    
						if m == int(options['core_GU']):
							b-=1
							c-=1
							break
						Arr3[c] = Arr2[b]
						Arr5[c] = "<mark id='b'>"+Arr5[c]+"</mark>"
						Arr4.append("<mark id='b'>"+str(len(Arr1)-c)+"</mark>")
						m+=1
					else:
						#沒對到的不是GU
						if d == int(options['core_non_GU']):
							b-=1
							c-=1
							break
						Arr3[c] = Arr2[b]
						Arr5[c] = "<mark>"+Arr5[c]+"</mark>"
						ArryxGU.append(str(len(Arr1)-c))
						Arr4.append("<mark>"+str(len(Arr1)-c)+"</mark>")
						d+=1
					b-=1
					c-=1
				elif Arr2[b] == Arr1[c] and b != a :
					# 對到的情況
					Arr3[c] = Arr2[b]
					b-=1
					c-=1
				elif c<len(Arr1)-7 and Arr2[b] != Arr1[c] and b != a:
					# non_core區沒對到的情況
					if (Arr2[b]=='G' and Arr1[c]=='A') or (Arr2[b]=='U' and Arr1[c]=='C'):
						#沒對到的是GU    
						if n == int(options['non_core_GU']):
							b-=1
							c-=1
							break
						Arr3[c] = Arr2[b]
						Arr5[c] = "<mark id='b'>"+Arr5[c]+"</mark>"
						Arr4.append("<mark id='b'>"+str(len(Arr1)-c)+"</mark>")
						n+=1
					else:
						#沒對到的不是GU
						if e == int(options['non_core_non_GU']):
							b-=1
							c-=1
							break
						Arr3[c] = Arr2[b]
						Arr5[c] = "<mark>"+Arr5[c]+"</mark>"
						ArryxGU.append(str(len(Arr1)-c))
						Arr4.append("<mark>"+str(len(Arr1)-c)+"</mark>")
						e+=1
					b-=1
					c-=1
				# elif d + e + m + n > int(options['total']):
				# 	#錯誤總數大於total
				# 	b-=1
				# 	c-=1
				# 	break
				elif b == a:
					# 掃到第一位的情況
					if Arr2[b] != Arr1[c]:
						if (Arr2[b]=='G' and Arr1[c]=='A') or (Arr2[b]=='U' and Arr1[c]=='C'):
							#沒對到的是GU    
							if n == int(options['non_core_GU']):
								b-=1
								c-=1
								break
							Arr3[c] = Arr2[b]
							Arr5[c] = "<mark id='b'>"+Arr5[c]+"</mark>"
							Arr4.append("<mark id='b'>"+str(len(Arr1)-c)+"</mark>")
							n+=1
						else:
							#沒對到的不是GU
							if e == int(options['non_core_non_GU']):
								b-=1
								c-=1
								break
							Arr3[c] = Arr2[b]
							Arr5[c] = "<mark>"+Arr5[c]+"</mark>"
							ArryxGU.append(str(len(Arr1)-c))
							Arr4.append("<mark>"+str(len(Arr1)-c)+"</mark>")
							e+=1
					elif Arr2[b] == Arr1[c] :
						Arr3[c] = Arr2[b]
					Arr3[len(Arr1)-1] = Arr2[a+len(Arr1)-1]
					if Arr2[a+len(Arr1)-1] != Arr1[len(Arr1)-1] :
						if (Arr2[a+len(Arr1)-1]=='G' and Arr1[len(Arr1)-1]=='A') or (Arr2[a+len(Arr1)-1]=='U' and Arr1[len(Arr1)-1]=='C'):
							#沒對到的是GU    
							Arr5[len(Arr1)-1] = "<mark id='g'>"+Arr5[len(Arr1)-1]+"</mark>"
							Arr4.insert(0,"<mark id='g'>1</mark>")
						else:
							#沒對到的不是GU
							Arr5[len(Arr1)-1] = "<mark id='g'>"+Arr5[len(Arr1)-1]+"</mark>"
							Arr4.insert(0,"<mark id='g'>1</mark>")
							ArryxGU.insert(0,'1')
						o+=1
					if d + e + m + n > int(options['total']):
						b-=1
						c-=1
						break
					Arr3[len(Arr1)-2] = Arr3[len(Arr1)-2]+"<span id='L'>|</span>"
					Arr5[len(Arr1)-2] = Arr5[len(Arr1)-2]+"<span id='L'>|</span>"
					Arr3[len(Arr1)-8] = Arr3[len(Arr1)-8]+"<span id='L'>|</span>"
					Arr5[len(Arr1)-8] = Arr5[len(Arr1)-8]+"<span id='L'>|</span>"
					if Arr4 == [] :
						Arr4 = 'N/A'
					if ArryxGU == [] :
						ArryxGU = 'N/A'
				
					
					outArr.append([key[0],str(a+1)+'-'+str(a+21),o+d+e+m+n,','.join(Arr4),','.join(ArryxGU),d,m,e,n,"<span style=\"white-space:nowrap\">5' "+''.join(Arr3)+" 3'","3' "+''.join(Arr5)+" 5'</span>",key[2],key[1][::-1],str(a+1).zfill(5),10-d*scoreA-m*scoreB-e*scoreC-n*scoreD])
					GG+=1
					b-=1
					c-=1
	if outArr==[]:
		outArr = 'N/A'
	q.put(outArr)

def suggestion(data,CDS1,CDS2,RNA,options):
	# data: 0:名字，1:mismatch位置(x-x+長度)，2:#mismatch，3:mismatch position(含tag)
	# 		4:xGU position，5:seed region non-GU#，6:seed region GU#，7:non-seed non-GU#
	# 		8:non-seed GU#，9:input gene detail，10:piRNA detail，11:[piRNA資訊陣列]，12:piRNA序列
	output = {'inCDS':[],'notInCDS':[]}
	for piRNA in data:
		sxGU = int(piRNA[5])
		sGU = int(piRNA[6])
		nsxGU = int(piRNA[7])
		nsGU = int(piRNA[8])
		total_mis = int(piRNA[5]) + int(piRNA[6]) + int(piRNA[7]) + int(piRNA[8])
		name = piRNA[0]
		fir = int(piRNA[1].split('-')[0])
		piRNAseq = piRNA[12]
		length = len(piRNAseq)
		mis_pos = re.sub('<[^>]*>', '', piRNA[3]).split(',')
		mis_xGU = piRNA[4].split(',')
		mis_GU = list(set(mis_pos) - set(mis_xGU))
		CDSSS = []
		result = []

		if fir <= CDS1 - 21 or fir > CDS2:
			seeds = range(2,8)
			seqs = ['A','U','G','C'] #能換成
			for h in seeds:    #掃seed-region
				for k in seqs:
					nowCheckSeq = RNA[fir+length-1-h] #mRNA上被check的字符
					nowCheckPi = piRNAseq[length-h]	#對應位置的piRNA字符
					#能換成的不相同且不會match且不是GU情況
					if nowCheckSeq != k and k!= complement(nowCheckPi) and not((k=='G' and nowCheckPi=='U') or (k=='U' and nowCheckPi=='G')):
						result.append([fir+length-h,nowCheckSeq.lower(),k.lower(),[sxGU+1,sGU,nsxGU,nsGU],0])
			over = 3
			new_RNA = RNA[fir-1:fir-1+length]
			# 照Rule評分
			for Rule in result:
				score = 0
				if Rule[3][0] > int(options['core_non_GU']):
					score += 3
				if Rule[3][1] > int(options['core_GU']):
					score += 1
				if Rule[3][2] > int(options['non_core_non_GU']):
					score += 1
				if Rule[3][3] > int(options['non_core_GU']):
					score += 1
				if Rule[3][0]+Rule[3][1]+Rule[3][2]+Rule[3][3] > int(options['total']):
					score += 1
				Rule.append(score)
			collect = [name,fir,length,sxGU,sGU,nsxGU,nsGU,result,piRNAseq,mis_xGU,mis_GU,new_RNA.lower()]
			output['notInCDS'].append(collect)
			continue


		#確認最右邊第1組CDS狀態
		mission = (fir+(length-2)-CDS1)%3

		#待確認的CDS組數，算總共有機顆包到CDS，再除3取無條件進位，
		stop_num = 0
		if fir < CDS1 :
			CDSs = math.ceil((length + 1 - mission - (CDS1 - fir)) / 3)
		elif CDS2-length < fir :			
			CDSs = math.ceil((length + 1 - mission) / 3)
			stop_num = math.ceil((length + 1 - mission) / 3) - math.ceil((CDS2 - fir +1) / 3)
		else:
			CDSs = math.ceil((length + 1 - mission) / 3)
		can_method = 0
		#檢查最右邊CDS

		first_CDS_leftPos = (length-1-mission)-1  #最右邊的CDS的左邊字符的位置，也就是第一組CDS的第一碼
		if stop_num == 0:
			CDS_seq_of_mRNA = RNA[fir+(first_CDS_leftPos)-1:fir+(first_CDS_leftPos)-1+3]
			CDS_codon = CDS_ori[CDS_seq_of_mRNA][0]
			CDSSS.append(CDS_codon)
		CDS_plot_first = fir+(first_CDS_leftPos)-1
		result = []

		# 只有CUG改UUG和CGA改AGA兩個情況
		if (mission == 0 or mission == 1) and stop_num == 0:
			#CDS序列是CUG要改成UUG且對到的piRNA第一個位置不能是A，不然會match
			if CDS_seq_of_mRNA == 'CUG' and piRNAseq[first_CDS_leftPos] != 'A':
				#改完後不是GU，原本是C所以不可能是GU對，如果本來就是xGU的話就根本沒動所以不列出 
				if piRNAseq[first_CDS_leftPos] != 'G': 
					if str(length-first_CDS_leftPos) not in mis_xGU:
						result.append([CDS_codon,fir+(first_CDS_leftPos),'C','U',[sxGU+1,sGU,nsxGU,nsGU],0])
				#改完變成GU
				else: 
					a = 0
					if str(length-first_CDS_leftPos) in mis_xGU: #如果原本就沒對到，要扣掉
						a = 1
					result.append([CDS_codon,fir+first_CDS_leftPos,'C','U',[sxGU-a,sGU+1,nsxGU,nsGU],1])

			#CDS序列是CGA要改成AGA且對到的piRNA第一個位置不能是U，不然會match
			elif CDS_seq_of_mRNA == 'CGA' and piRNAseq[first_CDS_leftPos] != 'U':
				#改完後字符是A所以不可能是GU對，因此只要判斷他不是xGU就可以達成建議
				if str(length-first_CDS_leftPos) not in mis_xGU:
					result.append([CDS_codon,fir+first_CDS_leftPos,'C','A',[sxGU+1,sGU,nsxGU,nsGU],0])


		elif mission == 2 and stop_num == 0:
			if CDS_codon == 'L' or CDS_codon == 'S' or CDS_codon == 'R' :
				#-------------------定住後兩碼，看'第一碼'--------------
				if CDS_seq_of_mRNA == 'CUG' and piRNAseq[first_CDS_leftPos] != 'A':
					if piRNAseq[first_CDS_leftPos] != 'G':
						if str(length-first_CDS_leftPos) not in mis_xGU:
							result.append([CDS_codon,fir+first_CDS_leftPos,'C','U',[sxGU+1,sGU,nsxGU,nsGU],0])
					else:
						a = 0
						if str(length-first_CDS_leftPos) in mis_xGU: #如果原本就沒對到，要扣掉
							a = 1
						result.append([CDS_codon,fir+first_CDS_leftPos,'C','U',[sxGU-a,sGU+1,nsxGU,nsGU],1])

				elif CDS_seq_of_mRNA == 'CGA' and piRNAseq[first_CDS_leftPos] != 'U':
					if str(length-first_CDS_leftPos) not in mis_xGU:
						result.append([CDS_codon,fir+first_CDS_leftPos,'C','A',[sxGU+1,sGU,nsxGU,nsGU],0])
				#-------------------定住後兩碼，看'第一碼'--------------

				#-------------------定住前兩碼，看'第三碼'--------------
				for third in CDScodonDict[CDS_codon]:
					if third[0:2] != CDS_seq_of_mRNA[0:2] or third == CDS_seq_of_mRNA or (third[2] == complement(piRNAseq[first_CDS_leftPos+2])):
						continue
					# 下面是會對到GU的情形
					elif (third[2] == 'G' and piRNAseq[first_CDS_leftPos+2] =='U') or (third[2] == 'U' and piRNAseq[first_CDS_leftPos+2] =='G'):
						a = 0
						if str(length-(first_CDS_leftPos+2)) in mis_xGU: #如果原本就沒對到，要扣掉
							a = 1
						result.append([CDS_codon,fir+first_CDS_leftPos+2,RNA[fir+first_CDS_leftPos+2-1],third[2],[sxGU-a,sGU+1,nsxGU,nsGU],1])
					# 下面是'不會'對到GU的情形
					else: #如果原本是GU變成nonGU要把GU數量扣1
						if str(length-(first_CDS_leftPos+2)) not in mis_xGU :
							b = 0
							if str(length-(first_CDS_leftPos+2)) in mis_GU:
								b = 1
							result.append([CDS_codon,fir+first_CDS_leftPos+2,RNA[fir+first_CDS_leftPos+2-1],third[2],[sxGU+1,sGU-b,nsxGU,nsGU],0])

				#-------------------定住前兩碼，看'第三碼'--------------

			elif CDS_codon == 'M' or CDS_codon == 'W':
				pass
			else:
				for third in CDScodonDict[CDS_codon]:
					if third == CDS_seq_of_mRNA[2]:
						continue
					elif third == complement(piRNAseq[first_CDS_leftPos+2]):
						continue
					elif (third == 'G' and piRNAseq[first_CDS_leftPos+2]=='U') or (third == 'U' and piRNAseq[first_CDS_leftPos+2]=='G'):
						a = 0
						if str(length-(first_CDS_leftPos+2)) in mis_xGU: #如果原本就沒對到，要扣掉
							a = 1
						result.append([CDS_codon,fir+first_CDS_leftPos+2,RNA[fir+first_CDS_leftPos+2-1],third,[sxGU-a,sGU+1,nsxGU,nsGU],1])
					else:
						if str(length-(first_CDS_leftPos+2)) not in mis_xGU :
							b = 0
							if str(length-(first_CDS_leftPos+2)) in mis_GU:
								b = 1
							result.append([CDS_codon,fir+first_CDS_leftPos+2,RNA[fir+first_CDS_leftPos+2-1],third,[sxGU+1,sGU-b,nsxGU,nsGU],0])


		move = None
		#掃他媽的中段
		for x in range(CDSs-2):
			if x < stop_num-1:
				continue
			move = 3*(x+1) 	#每一步都少一個move
			CDS_seq_of_mRNA = RNA[(fir+(first_CDS_leftPos)-1)-move:(fir+(first_CDS_leftPos)-1)-move+3] #CDS_seq_of_mRNA代表mRNA上的CDS組合
			CDS_codon = CDS_ori[CDS_seq_of_mRNA][0] #CDS_codon代表codon代號 比如:'K'
			CDSSS.append(CDS_codon)
			if CDS_codon == 'L' or CDS_codon == 'S' or CDS_codon == 'R' :
				#-------------------定住後兩碼，看'第一碼'--------------
				if CDS_seq_of_mRNA == 'CUG' and piRNAseq[first_CDS_leftPos-move] != 'A':
					if piRNAseq[first_CDS_leftPos-move] != 'G':
						if str(length-(first_CDS_leftPos-move)) not in mis_xGU :
							a = 0
							c = 0
							if length-(first_CDS_leftPos-move) <= 7:
								a = 1
							else:
								c = 1
							result.append([CDS_codon,fir+(first_CDS_leftPos)-move,'C','U',[sxGU+a,sGU,nsxGU+c,nsGU],0])
					else:
						b = 0
						d = 0
						if length-(first_CDS_leftPos-move) <= 7:
							b = 1
						else:
							d = 1
						a = 0
						c = 0
						if str(length-(first_CDS_leftPos-move)) in mis_xGU: #如果原本就沒對到，要扣掉
							if length-(first_CDS_leftPos-move) <= 7:
								a = 1
							else:
								c = 1
						result.append([CDS_codon,fir+first_CDS_leftPos-move,'C','U',[sxGU-a,sGU+b,nsxGU-c,nsGU+d],1])


				elif CDS_seq_of_mRNA == 'CGA' and piRNAseq[first_CDS_leftPos-move] != 'U':
					if str(length-(first_CDS_leftPos-move)) not in mis_xGU:
						a = 0
						c = 0
						if length-(first_CDS_leftPos-move) <= 7:
							a = 1
						else:
							c = 1
						result.append([CDS_codon,fir+first_CDS_leftPos-move,'C','A',[sxGU+a,sGU,nsxGU+c,nsGU],0])
				#-------------------定住後兩碼，看'第一碼'--------------

				#-------------------定住前兩碼，看'第三碼'--------------
				for third in CDScodonDict[CDS_codon]:
					if third[0:2] != CDS_seq_of_mRNA[0:2] or third == CDS_seq_of_mRNA or (third[2] == complement(piRNAseq[first_CDS_leftPos+2-move])):
						continue
					elif (third[2] == 'G' and piRNAseq[first_CDS_leftPos+2-move] =='U') or (third[2] == 'U' and piRNAseq[first_CDS_leftPos+2-move] =='G'):
						b = 0
						d = 0
						if length-(first_CDS_leftPos-move+2) <= 7:
							b+=1
						else:
							d+=1
						a = 0
						c = 0
						if str(length-(first_CDS_leftPos-move+2)) in mis_xGU:
							if length-(first_CDS_leftPos-move+2) <= 7:
								a = 1
							else:
								c = 1
						result.append([CDS_codon,fir+first_CDS_leftPos+2-move,RNA[fir+first_CDS_leftPos+2-1-move],third[2],[sxGU-a,sGU+b,nsxGU-c,nsGU+d],1])
					else:
						if str(length-(first_CDS_leftPos+2-move)) not in mis_xGU :
							a = 0
							b = 0
							c = 0
							d = 0
							if length-(first_CDS_leftPos-move+2) <= 7:
								if str(length-(first_CDS_leftPos-move+2)) in mis_GU:
									b = 1
								a= 1
							else:
								if str(length-(first_CDS_leftPos-move+2)) in mis_GU:
									d = 1
								c = 1
							result.append([CDS_codon,fir+first_CDS_leftPos+2-move,RNA[fir+first_CDS_leftPos+2-move-1],third[2],[sxGU+a,sGU-b,nsxGU+c,nsGU-d],0])

				#-------------------定住前兩碼，看'第三碼'--------------


			elif CDS_codon == 'M' or CDS_codon == 'W':
				pass
			else:
				for third in CDScodonDict[CDS_codon]:
					if third == CDS_seq_of_mRNA[2]:
						continue
					elif third == complement(piRNAseq[first_CDS_leftPos+2-move]):
						continue
					elif (third == 'G' and piRNAseq[first_CDS_leftPos+2-move]=='U') or (third == 'U' and piRNAseq[first_CDS_leftPos+2-move]=='G'):
						b = 0
						d = 0
						if length-(first_CDS_leftPos-move+2) <= 7:
							b = 1
						else:
							d = 1
						a = 0
						c = 0
						if str(length-(first_CDS_leftPos-move+2)) in mis_xGU:
							if length-(first_CDS_leftPos-move+2) <= 7:
								a = 1
							else:
								c = 1
						result.append([CDS_codon,fir+first_CDS_leftPos+2-move,RNA[fir+first_CDS_leftPos+2-move-1],third,[sxGU-a,sGU+b,nsxGU-c,nsGU+d],1])

					else:
						if str(length-(first_CDS_leftPos+2-move)) not in mis_xGU :
							a = 0
							b = 0
							c = 0
							d = 0
							if length-(first_CDS_leftPos-move+2) <= 7:
								if str(length-(first_CDS_leftPos-move+2)) in mis_GU:
									b = 1								
								a= 1
							else:
								if str(length-(first_CDS_leftPos-move+2)) in mis_GU:
									d = 1
								c = 1
							result.append([CDS_codon,fir+first_CDS_leftPos+2-move,RNA[fir+first_CDS_leftPos+2-move-1],third,[sxGU+a,sGU-b,nsxGU+c,nsGU-d],0])
		
		#掃他媽的後段
		if fir < CDS1 :
			last_state = 0
		else:
			last_state = (length - 2 - mission)%3

		if move == None:
			if stop_num != 0:
				move = stop_num*3
			else:
				move = 3
		else:
			move += 3
		# try:
		# 	move
		# except NameError:
		# 	try:
		# 		stop_num
		# 	except NameError:
		# 		move = 3
		# 	else:
		# 		print(name)
		# 		move = 0
		# else:
		# 	move += 3
		# 	print(name)
		# 	print(move)
		
		if (last_state == 1 or last_state == 2) and CDSs >= 2:
			CDS_seq_of_mRNA = RNA[(fir+(first_CDS_leftPos)-1)-move:(fir+(first_CDS_leftPos)-1)-move+3]
			CDS_codon = CDS_ori[CDS_seq_of_mRNA][0]
			CDSSS.append(CDS_codon)
			if CDS_codon == 'L' or CDS_codon == 'S' or CDS_codon == 'R' :
				#-------------------定住前兩碼，看'第三碼'--------------
				for third in CDScodonDict[CDS_codon]:
					# print('!!!!!!!!!!!!!!!!!!!!!!!!!!')
					# print(third)
					if third[0:2] != CDS_seq_of_mRNA[0:2] or third == CDS_seq_of_mRNA or (third[2] == complement(piRNAseq[first_CDS_leftPos+2-move])):
						continue
					elif (third[2] == 'G' and piRNAseq[first_CDS_leftPos+2-move] =='U') or (third[2] == 'U' and piRNAseq[first_CDS_leftPos+2-move] =='G'):
						b = 0
						d = 0
						if length-(first_CDS_leftPos-move+2) <= 7:
							b+=1
						else:
							d+=1
						a = 0
						c = 0
						if str(length-(first_CDS_leftPos-move+2)) in mis_xGU:
							if length-(first_CDS_leftPos-move+2) <= 7:
								a = 1
							else:
								c = 1
						result.append([CDS_codon,fir+first_CDS_leftPos+2-move,RNA[fir+first_CDS_leftPos+2-1-move],third[2],[sxGU-a,sGU+b,nsxGU-c,nsGU+d],1])
					else:
						if str(length-(first_CDS_leftPos+2-move)) not in mis_xGU :
							a = 0
							b = 0
							c = 0
							d = 0
							if length-(first_CDS_leftPos-move+2) <= 7:
								if str(length-(first_CDS_leftPos-move+2)) in mis_GU:
									b = 1
								a= 1
							else:
								if str(length-(first_CDS_leftPos-move+2)) in mis_GU:
									d = 1
								c = 1
							result.append([CDS_codon,fir+first_CDS_leftPos+2-move,RNA[fir+first_CDS_leftPos+2-move-1],third[2],[sxGU+a,sGU-b,nsxGU+c,nsGU-d],0])

				#-------------------定住前兩碼，看'第三碼'--------------
			elif CDS_codon == 'M' or CDS_codon == 'W':
				pass
			else:
				for third in CDScodonDict[CDS_codon]:
					if third == CDS_seq_of_mRNA[2]:
						continue
					elif third == complement(piRNAseq[(length+1-mission)-1-move]):
						continue
					elif (third == 'G' and piRNAseq[(length+1-mission)-1-move]=='U') or (third == 'U' and piRNAseq[(length+1-mission)-1-move]=='G'):
						b = 0
						d = 0
						if length-(first_CDS_leftPos-move+2) <= 7:
							b = 1
						else:
							d = 1
						a = 0
						c = 0
						if str(length-(first_CDS_leftPos-move+2)) in mis_xGU:
							if length-(first_CDS_leftPos-move+2) <= 7:
								a = 1
							else:
								c = 1
						result.append([CDS_codon,fir+first_CDS_leftPos+2-move,RNA[fir+first_CDS_leftPos+2-move-1],third,[sxGU-a,sGU+b,nsxGU-c,nsGU+d],1])
					else:
						if str(length-(first_CDS_leftPos+2-move)) not in mis_xGU :
							a = 0
							b = 0
							c = 0
							d = 0
							if length-(first_CDS_leftPos-move+2) <= 7:
								if str(length-(first_CDS_leftPos-move+2)) in mis_GU:
									b = 1
								a= 1
							else:
								if str(length-(first_CDS_leftPos-move+2)) in mis_GU:
									d = 1
								c = 1
							result.append([CDS_codon,fir+first_CDS_leftPos+2-move,RNA[fir+first_CDS_leftPos+2-move-1],third,[sxGU+a,sGU-b,nsxGU+c,nsGU-d],0])

		elif last_state == 0 and CDSs >= 2:
			if CDSs == 2:
				move = 3
			CDS_seq_of_mRNA = RNA[(fir+(first_CDS_leftPos)-1)-move:(fir+(first_CDS_leftPos)-1)-move+3]
			CDS_codon = CDS_ori[CDS_seq_of_mRNA][0]
			CDSSS.append(CDS_codon)
			if CDS_codon == 'L' or CDS_codon == 'S' or CDS_codon == 'R' :
				#-------------------定住後兩碼，看'第一碼'--------------
				if CDS_seq_of_mRNA == 'CUG' and piRNAseq[first_CDS_leftPos-move] != 'A':
					if piRNAseq[first_CDS_leftPos-move] != 'G':
						if str(length-(first_CDS_leftPos-move)) not in mis_xGU :
							a = 0
							c = 0
							if length-(first_CDS_leftPos-move) <= 7:
								a = 1
							else:
								c = 1
							result.append([CDS_codon,fir+(first_CDS_leftPos)-move,'C','U',[sxGU+a,sGU,nsxGU+c,nsGU],0])
					else:
						b = 0
						d = 0
						if length-(first_CDS_leftPos-move) <= 7:
							b = 1
						else:
							d = 1
						a = 0
						c = 0
						if str(length-(first_CDS_leftPos-move)) in mis_xGU: #如果原本就沒對到，要扣掉
							if length-(first_CDS_leftPos-move) <= 7:
								a = 1
							else:
								c = 1
						result.append([CDS_codon,fir+first_CDS_leftPos-move,'C','U',[sxGU-a,sGU+b,nsxGU-c,nsGU+d],1])


				elif CDS_seq_of_mRNA == 'CGA' and piRNAseq[first_CDS_leftPos-move] != 'U':
					if str(length-(first_CDS_leftPos-move)) not in mis_xGU:
						a = 0
						c = 0
						if length-(first_CDS_leftPos-move) <= 7:
							a = 1
						else:
							c = 1
						result.append([CDS_codon,fir+first_CDS_leftPos-move,'C','A',[sxGU+a,sGU,nsxGU+c,nsGU],0])
				#-------------------定住後兩碼，看'第一碼'--------------

				#-------------------定住前兩碼，看'第三碼'--------------
				for third in CDScodonDict[CDS_codon]:
					if third[0:2] != CDS_seq_of_mRNA[0:2] or third == CDS_seq_of_mRNA or (third[2] == complement(piRNAseq[first_CDS_leftPos+2-move])):
						continue
					# elif third == complement(piRNAseq[first_CDS_leftPos+2-move]):
					# 	continue
					elif (third[2] == 'G' and piRNAseq[first_CDS_leftPos+2-move] =='U') or (third[2] == 'U' and piRNAseq[first_CDS_leftPos+2-move] =='G'):
						b = 0
						d = 0
						if length-(first_CDS_leftPos-move+2) <= 7:
							b+=1
						else:
							d+=1
						a = 0
						c = 0
						if str(length-(first_CDS_leftPos-move+2)) in mis_xGU:
							if length-(first_CDS_leftPos-move+2) <= 7:
								a = 1
							else:
								c = 1
						result.append([CDS_codon,fir+first_CDS_leftPos+2-move,RNA[fir+first_CDS_leftPos+2-1-move],third[2],[sxGU-a,sGU+b,nsxGU-c,nsGU+d],1])
					else:
						if str(length-(first_CDS_leftPos+2-move)) not in mis_xGU :
							a = 0
							b = 0
							c = 0
							d = 0
							if length-(first_CDS_leftPos-move+2) <= 7:
								if str(length-(first_CDS_leftPos-move+2)) in mis_GU:
									b = 1
								a= 1
							else:
								if str(length-(first_CDS_leftPos-move+2)) in mis_GU:
									d = 1
								c = 1
							result.append([CDS_codon,fir+first_CDS_leftPos+2-move,RNA[fir+first_CDS_leftPos+2-move-1],third[2],[sxGU+a,sGU-b,nsxGU+c,nsGU-d],0])

				#-------------------定住前兩碼，看'第三碼'--------------


			elif CDS_codon == 'M' or CDS_codon == 'W':
				pass
			else:
				for third in CDScodonDict[CDS_codon]:
					if third == CDS_seq_of_mRNA[2]:
						continue
					elif third == complement(piRNAseq[(length+1-mission)-1-move]):
						continue
					elif (third == 'G' and piRNAseq[(length+1-mission)-1-move]=='U') or (third == 'U' and piRNAseq[(length+1-mission)-1-move]=='G'):
						b = 0
						d = 0
						if length-(first_CDS_leftPos-move+2) <= 7:
							b = 1
						else:
							d = 1
						a = 0
						c = 0
						if str(length-(first_CDS_leftPos-move+2)) in mis_xGU:
							if length-(first_CDS_leftPos-move+2) <= 7:
								a = 1
							else:
								c = 1
						result.append([CDS_codon,fir+first_CDS_leftPos+2-move,RNA[fir+first_CDS_leftPos+2-move-1],third,[sxGU-a,sGU+b,nsxGU-c,nsGU+d],1])

					else:
						if str(length-(first_CDS_leftPos+2-move)) not in mis_xGU :
							a = 0
							b = 0
							c = 0
							d = 0
							if length-(first_CDS_leftPos-move+2) <= 7:
								if str(length-(first_CDS_leftPos-move+2)) in mis_GU:
									b = 1
								a= 1
							else:
								if str(length-(first_CDS_leftPos-move+2)) in mis_GU:
									d = 1
								c = 1
							result.append([CDS_codon,fir+first_CDS_leftPos+2-move,RNA[fir+first_CDS_leftPos+2-move-1],third,[sxGU+a,sGU-b,nsxGU+c,nsGU-d],0])
		over = 3
		if fir > len(RNA) - length+1 -2:
			over = 0
		front = 3
		if fir <= 3:
			front = 0
		new_RNA = RNA[fir-1-front:fir-1+21+over]
		if fir < CDS1:
			new_RNA = new_RNA.replace(new_RNA[0:0+(CDS1-fir)+front],new_RNA[0:0+(CDS1-fir)+front].lower(),1)
		if CDS2 - fir < length - 1:
			new_RNA = new_RNA[0:CDS2-fir+1+front] + new_RNA[front+CDS2-fir+1:].lower()
			if CDS2 < fir + length - 2:
				if (fir + length - 2)- CDS2 + 1 > 7:
					outCDS = 7
				else:
					outCDS = (fir + length - 2)- CDS2 + 1
				someNC = range(outCDS,1,-1)
				seqs = ['A','U','G','C']
				for h in someNC:
					for k in seqs:
						nowCheckSeq = RNA[fir+length-1-h]
						nowCheckPi = piRNAseq[length-h]
						if nowCheckSeq != k and k!= complement(nowCheckPi) and not((k=='G' and nowCheckPi=='U') or (k=='U' and nowCheckPi=='G')):
							result.insert(0,['',fir+length-h,nowCheckSeq.lower(),k.lower(),[sxGU+1,sGU,nsxGU,nsGU],0])
				

		if fir < CDS1:
			if last_state == 0 and CDSs == 1:
				move = 0
			firstCDSPos = (front+(first_CDS_leftPos)-1)-move+1
			if CDS1 > fir + length - 7:
				someNC = range((fir + length)-CDS1 + 1,8)
				seqs = ['A','U','G','C']
				for h in someNC:
					for k in seqs:
						nowCheckSeq = RNA[fir+length-1-h]
						nowCheckPi = piRNAseq[length-h]
						if nowCheckSeq != k and k!= complement(nowCheckPi) and not((k=='G' and nowCheckPi=='U') or (k=='U' and nowCheckPi=='G')):
							result.append(['',fir+length-h,nowCheckSeq.lower(),k.lower(),[sxGU+1,sGU,nsxGU,nsGU],0])

		else:
			firstCDSPos = (front+(first_CDS_leftPos)-1)-move+1
		# 照Rule給分  rule1直接給3分就會排在最前面
		for Rule in result:
			score = 0
			if Rule[4][0] > int(options['core_non_GU']):
				score += 3
			if Rule[4][1] > int(options['core_GU']):
				score += 1
			if Rule[4][2] > int(options['non_core_non_GU']):
				score += 1
			if Rule[4][3] > int(options['non_core_GU']):
				score += 1
			if Rule[4][0]+Rule[4][1]+Rule[4][2]+Rule[4][3] > int(options['total']):
				score += 1
			Rule.append(score)
		collect = [name,fir,length,sxGU,sGU,nsxGU,nsGU,result,piRNAseq,mis_xGU,mis_GU,new_RNA,firstCDSPos,list(reversed(CDSSS)),front]
		output['inCDS'].append(collect)
	for qq in output['inCDS']:
		now = 0
		spanCount = 1
		spanDict = {}
		for tt in qq[7]:
			if tt[1] == now:
				spanCount += 1
				spanDict[str(tt[1])] = spanCount
			else:
				now = tt[1]
				spanCount = 1
			tt.append(10-tt[4][0]*scoreA-tt[4][1]*scoreB-tt[4][2]*scoreC-tt[4][3]*scoreD)
		qq.append(spanDict)
		qq.append(10-qq[3]*scoreA-qq[4]*scoreB-qq[5]*scoreC-qq[6]*scoreD)

	for qq in output['notInCDS']:
		now = 0
		spanCount = 1
		spanDict = {}
		for tt in qq[7]:
			if tt[0] == now:
				spanCount += 1
				spanDict[str(tt[0])] = spanCount
			else:
				now = tt[0]
				spanCount = 1
		qq.append(spanDict)
		qq.append(10-qq[3]*scoreA-qq[4]*scoreB-qq[5]*scoreC-qq[6]*scoreD)
	return output



def myajaxview(request):
	test = request.POST["val1"]
	return render(request, 'CNZ.html',{'test':test})


def showDaTable(request):
	module_dir = os.path.dirname(__file__)
	out = []
	with open(os.path.join(module_dir,'selected.csv'),'r') as f1:
		mod = csv.reader(f1)
		for i in mod:
			tempList = i[0].split('@@@')
			bigList = []
			for ss in tempList:
				bigList.append(ss.split('##'))
			out.append([i[1].split('@@@'),bigList])
	return JsonResponse({'out':out})

def firstResult(request):	
	module_dir = os.path.dirname(__file__)
	userNum = request.POST.get('userNum')
	# with open(os.path.join(module_dir,'userNum.csv'),'r') as f1:
	# 	r1 = csv.reader()
	# 	for x in r1:
	# 		userNum = x[0]
	with open(os.path.join(module_dir,'temp/ori_base_result'+userNum+'.json'),'r') as r1:
		data = json.load(r1)
	return JsonResponse(data)


def selectedPreData(request):
	modifyCount = request.POST.get('modifyCount')
	userNum = request.POST.get('userNum')
	module_dir = os.path.dirname(__file__)
	with open(os.path.join(module_dir,'temp/ori_result'+userNum+'.json'),'r') as r1:
		ori_result = json.load(r1)
	with open(os.path.join(module_dir,'temp/modify'+modifyCount+'_'+userNum+'.csv'),'r') as f1:
		options = {}
		mod = csv.reader(f1)
		count = 0
		for mmm in mod:
			if count == 0:
				name = mmm[0]
				count+=1
			elif count == 1:
				RNA = mmm[0]
				count+=1
			elif count == 2:
				options['core_non_GU'] = mmm[0]
				count+=1
			elif count == 3:
				options['core_GU'] = mmm[0]
				count+=1
			elif count == 4:
				options['non_core_non_GU'] = mmm[0]
				count+=1
			elif count == 5:
				options['non_core_GU'] = mmm[0]
				count+=1
			elif count == 6:
				options['total'] = mmm[0]
				count+=1
			elif count == 7:
				options['nematodeType'] = mmm[0]
				count+=1
			elif count == 8:
				if mmm[0] == '':
					CDS1 = -7
					count+=1
				else:
					CDS1 = int(mmm[0])
					count+=1
			elif count == 9:
				if mmm[0] == '':
					CDS2 = -4
					count+=1
				else:
					CDS2 = int(mmm[0])
					count+=1
			elif count == 10:
				changed_pos = mmm[0].split('@')
				count+=1
			elif count == 11:
				selectedInfo = mmm[0].split('##')
				selectedInfoOut = []
				for x in selectedInfo:
					temp = x.split('@@')
					temp[0] = int(temp[0])
					selectedInfoOut.append(temp)
				selectedInfoOut = sorted(selectedInfoOut, key=operator.itemgetter(0))
				count+=1
			elif count == 12:
				posToDiv = mmm[0].split('@-@')
				posToDivDict = {}
				for x in posToDiv:
					tempPosList = x.split(',')
					tempPosList[0] = int(tempPosList[0])
					tempPosList[1] = int(tempPosList[1])
					if tempPosList[0] in posToDivDict.keys():
						posToDivDict[tempPosList[0]].append(tempPosList[1])
					else:
						posToDivDict[tempPosList[0]] = [tempPosList[1]]
				with open(os.path.join(module_dir,'temp/posToDiv_'+modifyCount+'_'+userNum+'.json'),'w') as w1:
					json.dump(posToDivDict,w1,indent=4)
				count+=1
			elif count == 13:
				picked = mmm[0].split('@-@')
				
				# for x in picked:
				# 	temppicked = x.split('_')
				# 	temppicked[0] = int(temppicked[0])
				# 	temppicked[1] = int(temppicked[1])
					# if temppicked[0] in pickedDict.keys():
					# 	pickedDict[temppicked[0]].append(temppicked[1])
					# else:
					# 	pickedDict[temppicked[0]] = [temppicked[1]]
				pickedDict = {'picked':picked}
				with open(os.path.join(module_dir,'temp/picked_'+modifyCount+'_'+userNum+'.json'),'w') as w1:
					json.dump(pickedDict,w1,indent=4)
				count+=1
	Arr2 = list(RNA)
	with open(os.path.join(module_dir,'piRNA/{0}/info_name.csv'.format(options['nematodeType'])),'r') as f2:
		reader2 = csv.reader(f2)
		info_names = []
		for x in reader2:
			info_names.append(x[0])
	predata = {
		'modifyCount':modifyCount,
		'advice':[],
		'gene':RNA,
		'name':name,
		# 'newout':result,
		'options':options,
		'piRNA_info_name':info_names,
		# 'suggestion':newsug,
		'selectedInfo':selectedInfoOut,
		'CDS1':CDS1,
		'CDS2':CDS2,
		'changed_pos':changed_pos,
		'ori_result':ori_result,
		'posToDiv':posToDivDict,
		'picked':picked,
	}
	return JsonResponse(predata)

# re-scan成功之後要跑的資料
def sucData(request):
	modifyCount = request.POST.get('modifyCount')
	module_dir = os.path.dirname(__file__)
	userNum = request.POST.get('userNum')
	with open(os.path.join(module_dir,'temp/modify'+modifyCount+'_'+userNum+'.csv'),'r') as f1:
		options = {}
		mod = csv.reader(f1)
		count = 0
		for mmm in mod:
			if count == 0:
				name = mmm[0]
				count+=1
			elif count == 1:
				RNA = mmm[0]
				count+=1
			elif count == 2:
				options['core_non_GU'] = mmm[0]
				count+=1
			elif count == 3:
				options['core_GU'] = mmm[0]
				count+=1
			elif count == 4:
				options['non_core_non_GU'] = mmm[0]
				count+=1
			elif count == 5:
				options['non_core_GU'] = mmm[0]
				count+=1
			elif count == 6:
				options['total'] = mmm[0]
				count+=1
			elif count == 7:
				options['nematodeType'] = mmm[0]
				count+=1
			elif count == 8:
				if mmm[0] == '':
					CDS1 = -7
					count+=1
				else:
					CDS1 = int(mmm[0])
					count+=1
			elif count == 9:
				if mmm[0] == '':
					CDS2 = -4
					count+=1
				else:
					CDS2 = int(mmm[0])
					count+=1
			elif count == 10:
				changed_pos = mmm[0].split('@')
				count+=1
			elif count == 11:
				selectedInfo = mmm[0].split('##')
				selectedInfoOut = []
				for x in selectedInfo:
					temp = x.split('@@')
					temp[0] = int(temp[0])
					selectedInfoOut.append(temp)
				selectedInfoOut = sorted(selectedInfoOut, key=operator.itemgetter(0))
				count+=1
	SCdata = {
		'modifyCount':modifyCount,
		'gene':RNA,
		'name':name,
		'options':options,
		# 'piRNA_info_name':info_names,
		'selectedInfo':selectedInfoOut,
		'CDS1':CDS1,
		'CDS2':CDS2,
		'changed_pos':changed_pos,
	}
	def rreplace(s, old, new, occurrence):
		li = s.rsplit(old, occurrence)
		return new.join(li)
	newCDS1 = int(request.POST.get('CDS1'))
	newCDS2 = int(request.POST.get('CDS2'))
	CDS_region = request.POST.get('CDS_region')

	with open(os.path.join(module_dir,'temp/sucResult_'+modifyCount+'_'+userNum+'.txt'),'w') as f1:
		newRNA = RNA.replace(RNA[0:newCDS1-1],RNA[0:newCDS1-1].lower(),1)
		if newCDS2 != len(RNA):
			newRNA = rreplace(newRNA,newRNA[newCDS2:len(RNA)],newRNA[newCDS2:len(RNA)].lower(),1)		
		tttList = []
		tttList.append('{0} modified sequence #{1}'.format(name,modifyCount))
		# tttList.append('Sequence name: Modified Sequence #'+modifyCount+'(from the original input seq: '+name+')')
		tttList.append('Specify coding sequence (CDS) region: '+CDS_region)
		tttList.append('piRNA targeting rules: ')
		
		tttList.append('Seed region: non-GU: up to {0}, GU: up to {1}'.format(request.POST.get('a'),request.POST.get('b')))
		tttList.append('Non-seed region: non-GU: up to {0}, GU: up to {1}'.format(request.POST.get('c'),request.POST.get('d')))
		tttList.append('Total mismatches: up to {0}'.format(request.POST.get('e')))
		tttList.append('')
		# tttList.append('Lowercase/Uppercase text indicates UTRs/CDS')
		tttList.append('RNA sequence(Lowercase/Uppercase text indicates UTRs/CDS):')
		tttList.append(newRNA)
		tttList.append('')
		tttList.append('DNA sequence(Lowercase/Uppercase text indicates UTRs/CDS):')
		tttList.append(newRNA.replace('u','t').replace('U','T'))
		f1.write('\r\n'.join(tttList))
		# w1 = csv.writer(f1)
		# w1.writerow(['>Modified Sequence #'+modifyCount+', lowercase (uppercase) text indicates UTR (CDS)\n\r'+newRNA])

	return JsonResponse(SCdata)

# re-scan失敗之後要跑的資料
def failData(request):
	modifyCount = request.POST.get('modifyCount')
	userNum = request.POST.get('userNum')
	CDS_region = request.POST.get('CDS_region')
	module_dir = os.path.dirname(__file__)
	with open(os.path.join(module_dir,'temp/modify'+modifyCount+'_'+userNum+'.csv'),'r') as f1:
		options = {}
		mod = csv.reader(f1)
		count = 0
		for mmm in mod:
			if count == 0:
				name = mmm[0]
				count+=1
			elif count == 1:
				RNA = mmm[0]
				count+=1
			elif count == 2:
				options['core_non_GU'] = mmm[0]
				count+=1
			elif count == 3:
				options['core_GU'] = mmm[0]
				count+=1
			elif count == 4:
				options['non_core_non_GU'] = mmm[0]
				count+=1
			elif count == 5:
				options['non_core_GU'] = mmm[0]
				count+=1
			elif count == 6:
				options['total'] = mmm[0]
				count+=1
			elif count == 7:
				options['nematodeType'] = mmm[0]
				count+=1
			elif count == 8:
				if mmm[0] == '':
					CDS1 = -7
					count+=1
				else:
					CDS1 = int(mmm[0])
					count+=1
			elif count == 9:
				if mmm[0] == '':
					CDS2 = -4
					count+=1
				else:
					CDS2 = int(mmm[0])
					count+=1
			elif count == 10:
				changed_pos = mmm[0].split('@')
				count+=1
			elif count == 11:
				selectedInfo = mmm[0].split('##')
				selectedInfoOut = []
				for x in selectedInfo:
					temp = x.split('@@')
					temp[0] = int(temp[0])
					selectedInfoOut.append(temp)
				selectedInfoOut = sorted(selectedInfoOut, key=operator.itemgetter(0))
				count+=1
	with open(os.path.join(module_dir,'temp/ori_base_result'+userNum+'.json'),'r') as w1:
		oldResult = json.load(w1)
	with open(os.path.join(module_dir,'temp/posToDiv_'+modifyCount+'_'+userNum+'.json'),'r') as w1:
		posToDiv = json.load(w1)
	with open(os.path.join(module_dir,'temp/picked_'+modifyCount+'_'+userNum+'.json'),'r') as w1:
		picked = json.load(w1)
	SCdata = {
		'modifyCount':modifyCount,
		'gene':RNA,
		'name':name,
		'options':options,
		'oldResult':oldResult,
		'selectedInfo':selectedInfoOut,
		'CDS1':CDS1,
		'CDS2':CDS2,
		'changed_pos':changed_pos,
		'posToDiv':posToDiv,
		'picked':picked['picked'],
	}
	def rreplace(s, old, new, occurrence):
		li = s.rsplit(old, occurrence)
		return new.join(li)
	newCDS1 = int(request.POST.get('CDS1'))
	newCDS2 = int(request.POST.get('CDS2'))
	with open(os.path.join(module_dir,'temp/sucResult_'+modifyCount+'_'+userNum+'.txt'),'w') as f1:
		newRNA = RNA.replace(RNA[0:newCDS1-1],RNA[0:newCDS1-1].lower(),1)
		if newCDS2 != len(RNA):
			newRNA = rreplace(newRNA,newRNA[newCDS2:len(RNA)],newRNA[newCDS2:len(RNA)].lower(),1)
		
		# f1.write('>Modified Sequence #'+modifyCount+', lowercase (uppercase) text indicates UTR (CDS)\n\r'+newRNA)
		tttList = []
		tttList.append('{0} modified sequence #{1}'.format(name,modifyCount))
		# tttList.append('Sequence name: Modified Sequence #'+modifyCount+'(from the original input seq: '+name+')')
		tttList.append('Specify coding sequence (CDS) region: '+CDS_region)
		tttList.append('piRNA targeting rules: ')
		
		tttList.append('Seed region: non-GU: up to {0}, GU: up to {1}'.format(request.POST.get('a'),request.POST.get('b')))
		tttList.append('Non-seed region: non-GU: up to {0}, GU: up to {1}'.format(request.POST.get('c'),request.POST.get('d')))
		tttList.append('Total mismatches: up to {0}'.format(request.POST.get('e')))
		tttList.append('')
		tttList.append('Lowercase/Uppercase text indicates UTRs/CDS')
		tttList.append('RNA sequence(Lowercase/Uppercase text indicates UTRs/CDS):')
		tttList.append(newRNA)
		tttList.append('')
		tttList.append('DNA sequence(Lowercase/Uppercase text indicates UTRs/CDS):')
		tttList.append(newRNA.replace('u','t').replace('U','T'))
		f1.write('\r\n'.join(tttList))

	return JsonResponse(SCdata)


def download_course(request,count,userNum):
	module_dir = os.path.dirname(__file__)
	with open(os.path.join(module_dir,'temp/sucResult_'+count+'_{0}.txt'.format(userNum)),'rb') as f1:
		response = HttpResponse(f1.read())
		response['content_type'] = 'text/txt'
		response['Content-Disposition'] = 'attachment;filename=modified_sequence.txt'
	return response

def download_table(request,count,userNum):
	module_dir = os.path.dirname(__file__)
	with open(os.path.join(module_dir,'temp/tableData'+count+'_{0}.csv'.format(userNum)),'rb') as f1:
		response = HttpResponse(f1.read())
		response['content_type'] = 'text/csv'
		response['Content-Disposition'] = 'attachment;filename=Identified_piRNA_table.csv'
	return response

