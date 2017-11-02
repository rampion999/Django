from django.shortcuts import render, get_object_or_404, redirect, HttpResponse, render_to_response, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.contrib.auth import authenticate, login
from multiprocessing import Process, Lock, Queue ,JoinableQueue, active_children
import time
import csv
from django.http import JsonResponse
import json
import os
import re
import math
import operator
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie

# Create your views here.
def piRNA(request):
	return render(request, 'piRNA_demo.html')

def update(request):
	return render(request, 'update_demo.html')

def create_data(request):
	module_dir = os.path.dirname(__file__)
	with open(os.path.join(module_dir,'modify.csv'),'w',encoding='utf8') as f1:
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

def CDS():
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
	module_dir = os.path.dirname(__file__)
	# x = request.POST.get('sth')
	if request.POST.get('data1') == '':
		data = {'state':'nothing'}
	elif re.search("^>[A-Za-z0-9|_,+.\s]+\s[A-Za-z\s]+$",request.POST.get('data1')) == None:
		data = {'state':'notfasta'}
	elif request.POST.get('nematodeType') == 'C.remanei' or request.POST.get('nematodeType') == 'C.brenneri':
		data = {'state':'nematode'}
	else:
		global Arr2,options,CDS1,CDS2,RNA
		Gene_OK = request.POST.get('data1').replace('>','').strip().split('\n')
		RNA = strtr(Gene_OK[1].upper(),{'T':'U'}) #將輸入基因T轉成U
		Arr2 = list(RNA)
		name = Gene_OK[0]
		options = {'core_non_GU':request.POST.get('opt1'),'core_GU':request.POST.get('opt2'),'non_core_non_GU':request.POST.get('opt3'),'non_core_GU':request.POST.get('opt4'),'total':request.POST.get('opt5'),'nematodeType':request.POST.get('nematodeType')}
		with open(os.path.join(module_dir,'piRNA/{0}/info_name.csv'.format(options['nematodeType'])),'r') as f2:
			reader2 = csv.reader(f2)
			info_names = []
			for x in reader2:
				info_names.append(x[0])
		if request.POST.get('CDS_1')!='' : 
			CDS1 = int(request.POST.get('CDS_1'))
		else: 
			CDS1 = 0
		if request.POST.get('CDS_2')!='' :
			CDS2 = int(request.POST.get('CDS_2'))
		else: 
			CDS2 = 0
		# print(CDS1)
		# print(CDS2)
		# print('Arr2:'+len(Arr2))
		if (CDS1==0 and CDS2!=0) or (CDS2==0 and CDS1!=0) or ((CDS1!= 0 and CDS2!= 0) and (CDS1 >= CDS2 or (CDS2-CDS1-2)%3 !=0 or CDS2 > len(Arr2) or CDS1 < 1)):
			data = {'state':'CDSX'}
		else:
			mission_count = {'C.elegans':357,'C.briggsae':290}
			result=[]
			start_time = time.time()
			q = JoinableQueue()
			for num in range(mission_count[options['nematodeType']]):
				Process(target=scan, args=(q, num)).start()
			for t in range(mission_count[options['nematodeType']]):
				a = q.get()
				if a != 'N/A':
					for x in a:
						result.append(x)
				q.task_done()
			q.join()
			outForAdvice = result
			CDSout = CDS()
			sug = suggestion(result)
			sug['inCDS'] = sorted(sug['inCDS'], key=operator.itemgetter(1))
			sug['notInCDS'] = sorted(sug['notInCDS'], key=operator.itemgetter(1))
			data = {
				'CDS':[CDSout],
				'advice':[],
				'gene':RNA,
				'name':name,
				'newout':result,
				'options':options,
				'piRNA_info_name':info_names,
				'suggestion':sug,
				'csrf':request.POST.get('csrfmiddlewaretoken'),
			}
	return JsonResponse(data)

def scan(q,num):
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
			#   print(Arr4)

			b = a +len(Arr1)-2
			c = len(Arr1)-2
			d = 0
			e = 0
			m = 0
			n = 0
			o = 0
			while(b>=a):
				if c >= len(Arr1)-7 and Arr2[b] != Arr1[c]:
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
				elif d + e + m + n > int(options['total']):
					#錯誤總數大於total
					b-=1
					c-=1
					break
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
							Arr5[len(Arr1)-1] = "<mark id='b'>"+Arr5[len(Arr1)-1]+"</mark>"
							Arr4.insert(0,"<mark id='b'>1</mark>")
						else:
							#沒對到的不是GU
							Arr5[len(Arr1)-1] = "<mark id='g'>"+Arr5[len(Arr1)-1]+"</mark>"
							Arr4.insert(0,"<mark id='b'>1</mark>")
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
					# print(Arr4)
				
				
					outArr.append([key[0],str(a+1)+'~'+str(a+21),o+d+e+m+n,','.join(Arr4),','.join(ArryxGU),d,m,e,n,"5' "+''.join(Arr3)+" 3'","3' "+''.join(Arr5)+" 5'",key[2],key[1][::-1]])
					GG+=1
					b-=1
					c-=1
	if outArr==[]:
		outArr = 'N/A'
	q.put(outArr)

def suggestion(data):
	# data: 0:名字，1:mismatch位置(x~x+長度)，2:#mismatch，3:mismatch position(含tag)
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
		fir = int(piRNA[1].split('~')[0])
		seq = piRNA[12]
		length = len(seq)
		mis_pos = re.sub('<[^>]*>', '', piRNA[3]).split(',')
		mis_xGU = piRNA[4].split(',')
		mis_GU = list(set(mis_pos) - set(mis_xGU))
		CDSSS = []
		result = []

		if fir <= CDS1 - 21 or fir > CDS2:
			seeds = range(2,8)
			seqs = ['A','U','G','C']
			for h in seeds:
				for k in seqs:
					nowCheckSeq = RNA[fir+length-1-h]
					nowCheckPi = seq[length-h]
					if nowCheckSeq != k and k!= complement(nowCheckPi) and not((k=='G' and nowCheckPi=='U') or (k=='U' and nowCheckPi=='G')):
						result.append([fir+length-h,nowCheckSeq.lower(),k.lower(),[sxGU+1,sGU,nsxGU,nsGU],0])
			over = 3
			new_RNA = RNA[fir-1:fir-1+length]
			collect = [name,fir,length,sxGU,sGU,nsxGU,nsGU,result,seq,mis_xGU,mis_GU,new_RNA.lower()]
			output['notInCDS'].append(collect)
			continue
		# print('**********************')
		# print(name)
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

		first_CDS_one = (length-1-mission)-1
		if stop_num == 0:
			CDS_seq = RNA[fir+(first_CDS_one)-1:fir+(first_CDS_one)-1+3]
			CDS_right = CDS_ori[CDS_seq][0]
			CDSSS.append(CDS_right)
		CDS_plot_first = fir+(first_CDS_one)-1
		# print('name : {0}, fir: {1}, mission :{2}, CDSs :{3}, CDS_right :{4} ,piRNA[5]:{5}'.format(name,fir,mission,CDSs,CDS_right,piRNA[5]))
		# print('mis_pos: {0}'.format(mis_pos))
		result = []

		
		if (mission == 0 or mission == 1) and stop_num == 0:
			# 只有CUG改UUG和CGA改AGA兩個情況
			if CDS_seq == 'CUG':
				if seq[first_CDS_one] != 'G': #改完後不是GU，原本是C所以不可能是GU對，如果本來就是xGU的話就根本沒動所以不列出
					if str(length-first_CDS_one) not in mis_xGU:
						result.append([CDS_right,fir+(first_CDS_one),'C','U',[sxGU+1,sGU,nsxGU,nsGU],0])
				else: #改完變成GU
					a = 0
					if str(length-first_CDS_one) in mis_xGU: #如果原本就沒對到，要扣掉
						a = 1
					result.append([CDS_right,fir+first_CDS_one,'C','U',[sxGU-a,sGU+1,nsxGU,nsGU],1])

			elif CDS_seq == 'CGA':
				if str(length-first_CDS_one) not in mis_xGU:
					result.append([CDS_right,fir+first_CDS_one,'C','A',[sxGU+1,sGU,nsxGU,nsGU],0])


		elif mission == 2 and stop_num == 0:
			if CDS_right == 'L' or CDS_right == 'S' or CDS_right == 'R' :
				#-------------------定住後兩碼，看'第一碼'--------------
				if CDS_seq == 'CUG':
					if seq[first_CDS_one] != 'G':
						if str(length-first_CDS_one) not in mis_xGU:
							result.append([CDS_right,fir+first_CDS_one,'C','U',[sxGU+1,sGU,nsxGU,nsGU],0])
					else:
						a = 0
						if str(length-first_CDS_one) in mis_xGU: #如果原本就沒對到，要扣掉
							a = 1
						result.append([CDS_right,fir+first_CDS_one,'C','U',[sxGU-a,sGU+1,nsxGU,nsGU],1])

				elif CDS_seq == 'CGA':
					if str(length-first_CDS_one) not in mis_xGU:
						result.append([CDS_right,fir+first_CDS_one,'C','A',[sxGU+1,sGU,nsxGU,nsGU],0])
				#-------------------定住後兩碼，看'第一碼'--------------

				#-------------------定住前兩碼，看'第三碼'--------------
				for third in CDScodonDict[CDS_right]:
					if third[0:2] != CDS_seq[0:2] or third == CDS_seq:
						continue
					# 下面是會對到GU的情形
					elif (third[2] == 'G' and seq[first_CDS_one+2] =='U') or (third[2] == 'U' and seq[first_CDS_one+2] =='G'):
						a = 0
						if str(length-(first_CDS_one+2)) in mis_xGU: #如果原本就沒對到，要扣掉
							a = 1
						result.append([CDS_right,fir+first_CDS_one+2,RNA[fir+first_CDS_one+2-1],third[2],[sxGU-a,sGU+1,nsxGU,nsGU],1])
					# 下面是'不會'對到GU的情形
					else: #如果原本是GU變成nonGU要把GU數量扣1
						if str(length-(first_CDS_one+2)) not in mis_xGU :
							b = 0
							if str(length-(first_CDS_one+2)) in mis_GU:
								b = 1
							result.append([CDS_right,fir+first_CDS_one+2,RNA[fir+first_CDS_one+2-1],third[2],[sxGU+1,sGU-b,nsxGU,nsGU],0])

				#-------------------定住前兩碼，看'第三碼'--------------

			elif CDS_right == 'M' or CDS_right == 'W':
				pass
			else:
				for third in CDScodonDict[CDS_right]:
					if third == CDS_seq[2]:
						continue
					elif (third == 'G' and seq[first_CDS_one+2]=='U') or (third == 'U' and seq[first_CDS_one+2]=='G'):
						a = 0
						if str(length-(first_CDS_one+2)) in mis_xGU: #如果原本就沒對到，要扣掉
							a = 1
						result.append([CDS_right,fir+first_CDS_one+2,RNA[fir+first_CDS_one+2-1],third,[sxGU-a,sGU+1,nsxGU,nsGU],1])
					else:
						if str(length-(first_CDS_one+2)) not in mis_xGU :
							b = 0
							if str(length-(first_CDS_one+2)) in mis_GU:
								b = 1
							result.append([CDS_right,fir+first_CDS_one+2,RNA[fir+first_CDS_one+2-1],third,[sxGU+1,sGU-b,nsxGU,nsGU],0])



		#掃他媽的中段
		for x in range(CDSs-2):
			if x < stop_num-1:
				continue
			move = 3*(x+1) 	#每一步都少一個move
			CDS_seq = RNA[(fir+(first_CDS_one)-1)-move:(fir+(first_CDS_one)-1)-move+3]
			CDS_right = CDS_ori[CDS_seq][0]
			CDSSS.append(CDS_right)
			if CDS_right == 'L' or CDS_right == 'S' or CDS_right == 'R' :
				#-------------------定住後兩碼，看'第一碼'--------------
				if CDS_seq == 'CUG':
					if seq[first_CDS_one-move] != 'G':
						if str(length-(first_CDS_one-move)) not in mis_xGU :
							a = 0
							c = 0
							if length-(first_CDS_one-move) <= 7:
								a = 1
							else:
								c = 1
							result.append([CDS_right,fir+(first_CDS_one)-move,'C','U',[sxGU+a,sGU,nsxGU+c,nsGU],0])
					else:
						b = 0
						d = 0
						if length-(first_CDS_one-move) <= 7:
							b = 1
						else:
							d = 1
						a = 0
						c = 0
						if str(length-(first_CDS_one-move)) in mis_xGU: #如果原本就沒對到，要扣掉
							if length-(first_CDS_one-move) <= 7:
								a = 1
							else:
								c = 1
						result.append([CDS_right,fir+first_CDS_one-move,'C','U',[sxGU-a,sGU+b,nsxGU-c,nsGU+d],1])


				elif CDS_seq == 'CGA':
					if str(length-(first_CDS_one-move)) not in mis_xGU:
						a = 0
						c = 0
						if length-(first_CDS_one-move) <= 7:
							a = 1
						else:
							c = 1
						result.append([CDS_right,fir+first_CDS_one-move,'C','A',[sxGU+a,sGU,nsxGU+c,nsGU],0])
				#-------------------定住後兩碼，看'第一碼'--------------

				#-------------------定住前兩碼，看'第三碼'--------------
				for third in CDScodonDict[CDS_right]:
					if third[0:2] != CDS_seq[0:2] or third == CDS_seq:
						continue
					elif (third[2] == 'G' and seq[first_CDS_one+2-move] =='U') or (third[2] == 'U' and seq[first_CDS_one+2-move] =='G'):
						b = 0
						d = 0
						if length-(first_CDS_one-move+2) <= 7:
							b+=1
						else:
							d+=1
						a = 0
						c = 0
						if str(length-(first_CDS_one-move+2)) in mis_xGU:
							if length-(first_CDS_one-move+2) <= 7:
								a = 1
							else:
								c = 1
						result.append([CDS_right,fir+first_CDS_one+2-move,RNA[fir+first_CDS_one+2-1-move],third[2],[sxGU-a,sGU+b,nsxGU-c,nsGU+d],1])
					else:
						if str(length-(first_CDS_one+2-move)) not in mis_xGU :
							a = 0
							b = 0
							c = 0
							d = 0
							if length-(first_CDS_one-move+2) <= 7:
								if str(length-(first_CDS_one-move+2)) in mis_GU:
									b = 1
								a= 1
							else:
								if str(length-(first_CDS_one-move+2)) in mis_GU:
									d = 1
								c = 1
							result.append([CDS_right,fir+first_CDS_one+2-move,RNA[fir+first_CDS_one+2-move-1],third[2],[sxGU+a,sGU-b,nsxGU+c,nsGU-d],0])

				#-------------------定住前兩碼，看'第三碼'--------------


			elif CDS_right == 'M' or CDS_right == 'W':
				pass
			else:
				for third in CDScodonDict[CDS_right]:
					if third == CDS_seq[2]:
						continue
					elif (third == 'G' and seq[first_CDS_one+2-move]=='U') or (third == 'U' and seq[first_CDS_one+2-move]=='G'):
						b = 0
						d = 0
						if length-(first_CDS_one-move+2) <= 7:
							b = 1
						else:
							d = 1
						a = 0
						c = 0
						if str(length-(first_CDS_one-move+2)) in mis_xGU:
							if length-(first_CDS_one-move+2) <= 7:
								a = 1
							else:
								c = 1
						result.append([CDS_right,fir+first_CDS_one+2-move,RNA[fir+first_CDS_one+2-move-1],third,[sxGU-a,sGU+b,nsxGU-c,nsGU+d],1])

					else:
						if str(length-(first_CDS_one+2-move)) not in mis_xGU :
							a = 0
							b = 0
							c = 0
							d = 0
							if length-(first_CDS_one-move+2) <= 7:
								if str(length-(first_CDS_one-move+2)) in mis_GU:
									b = 1
								a= 1
							else:
								if str(length-(first_CDS_one-move+2)) in mis_GU:
									d = 1
								c = 1
							result.append([CDS_right,fir+first_CDS_one+2-move,RNA[fir+first_CDS_one+2-move-1],third,[sxGU+a,sGU-b,nsxGU+c,nsGU-d],0])
		
		#掃他媽的後段
		if fir < CDS1 :
			last_state = 0
		else:
			last_state = (length - 2 - mission)%3

		try:
			move
		except NameError:
			move = 3
		else:
			move += 3
		
		if (last_state == 1 or last_state == 2) and CDSs >= 2:
			CDS_seq = RNA[(fir+(first_CDS_one)-1)-move:(fir+(first_CDS_one)-1)-move+3]
			CDS_right = CDS_ori[CDS_seq][0]
			CDSSS.append(CDS_right)
			if CDS_right == 'L' or CDS_right == 'S' or CDS_right == 'R' :
				#-------------------定住前兩碼，看'第三碼'--------------
				for third in CDScodonDict[CDS_right]:
					if third[0:2] != CDS_seq[0:2] or third == CDS_seq:
						continue
					elif (third[2] == 'G' and seq[first_CDS_one+2-move] =='U') or (third[2] == 'U' and seq[first_CDS_one+2-move] =='G'):
						b = 0
						d = 0
						if length-(first_CDS_one-move+2) <= 7:
							b+=1
						else:
							d+=1
						a = 0
						c = 0
						if str(length-(first_CDS_one-move+2)) in mis_xGU:
							if length-(first_CDS_one-move+2) <= 7:
								a = 1
							else:
								c = 1
						result.append([CDS_right,fir+first_CDS_one+2-move,RNA[fir+first_CDS_one+2-1-move],third[2],[sxGU-a,sGU+b,nsxGU-c,nsGU+d],1])
					else:
						if str(length-(first_CDS_one+2-move)) not in mis_xGU :
							a = 0
							b = 0
							c = 0
							d = 0
							if length-(first_CDS_one-move+2) <= 7:
								if str(length-(first_CDS_one-move+2)) in mis_GU:
									b = 1
								a= 1
							else:
								if str(length-(first_CDS_one-move+2)) in mis_GU:
									d = 1
								c = 1
							result.append([CDS_right,fir+first_CDS_one+2-move,RNA[fir+first_CDS_one+2-move-1],third[2],[sxGU+a,sGU-b,nsxGU+c,nsGU-d],0])

				#-------------------定住前兩碼，看'第三碼'--------------
			elif CDS_right == 'M' or CDS_right == 'W':
				pass
			else:
				for third in CDScodonDict[CDS_right]:
					if third == CDS_seq[2]:
						continue
					elif (third == 'G' and seq[(length+1-mission)-1-move]=='U') or (third == 'U' and seq[(length+1-mission)-1-move]=='G'):
						b = 0
						d = 0
						if length-(first_CDS_one-move+2) <= 7:
							b = 1
						else:
							d = 1
						a = 0
						c = 0
						if str(length-(first_CDS_one-move+2)) in mis_xGU:
							if length-(first_CDS_one-move+2) <= 7:
								a = 1
							else:
								c = 1
						result.append([CDS_right,fir+first_CDS_one+2-move,RNA[fir+first_CDS_one+2-move-1],third,[sxGU-a,sGU+b,nsxGU-c,nsGU+d],1])
					else:
						if str(length-(first_CDS_one+2-move)) not in mis_xGU :
							a = 0
							b = 0
							c = 0
							d = 0
							if length-(first_CDS_one-move+2) <= 7:
								if str(length-(first_CDS_one-move+2)) in mis_GU:
									b = 1
								a= 1
							else:
								if str(length-(first_CDS_one-move+2)) in mis_GU:
									d = 1
								c = 1
							result.append([CDS_right,fir+first_CDS_one+2-move,RNA[fir+first_CDS_one+2-move-1],third,[sxGU+a,sGU-b,nsxGU+c,nsGU-d],0])

		elif last_state == 0 and CDSs >= 2:
			if CDSs == 2:
				move = 3
			CDS_seq = RNA[(fir+(first_CDS_one)-1)-move:(fir+(first_CDS_one)-1)-move+3]
			CDS_right = CDS_ori[CDS_seq][0]
			CDSSS.append(CDS_right)
			if CDS_right == 'L' or CDS_right == 'S' or CDS_right == 'R' :
				#-------------------定住後兩碼，看'第一碼'--------------
				if CDS_seq == 'CUG':
					if seq[first_CDS_one-move] != 'G':
						if str(length-(first_CDS_one-move)) not in mis_xGU :
							a = 0
							c = 0
							if length-(first_CDS_one-move) <= 7:
								a = 1
							else:
								c = 1
							result.append([CDS_right,fir+(first_CDS_one)-move,'C','U',[sxGU+a,sGU,nsxGU+c,nsGU],0])
					else:
						b = 0
						d = 0
						if length-(first_CDS_one-move) <= 7:
							b = 1
						else:
							d = 1
						a = 0
						c = 0
						if str(length-(first_CDS_one-move)) in mis_xGU: #如果原本就沒對到，要扣掉
							if length-(first_CDS_one-move) <= 7:
								a = 1
							else:
								c = 1
						result.append([CDS_right,fir+first_CDS_one-move,'C','U',[sxGU-a,sGU+b,nsxGU-c,nsGU+d],1])


				elif CDS_seq == 'CGA':
					if str(length-(first_CDS_one-move)) not in mis_xGU:
						a = 0
						c = 0
						if length-(first_CDS_one-move) <= 7:
							a = 1
						else:
							c = 1
						result.append([CDS_right,fir+first_CDS_one-move,'C','A',[sxGU+a,sGU,nsxGU+c,nsGU],0])
				#-------------------定住後兩碼，看'第一碼'--------------

				#-------------------定住前兩碼，看'第三碼'--------------
				for third in CDScodonDict[CDS_right]:
					if third[0:2] != CDS_seq[0:2] or third == CDS_seq:
						continue
					elif (third[2] == 'G' and seq[first_CDS_one+2-move] =='U') or (third[2] == 'U' and seq[first_CDS_one+2-move] =='G'):
						b = 0
						d = 0
						if length-(first_CDS_one-move+2) <= 7:
							b+=1
						else:
							d+=1
						a = 0
						c = 0
						if str(length-(first_CDS_one-move+2)) in mis_xGU:
							if length-(first_CDS_one-move+2) <= 7:
								a = 1
							else:
								c = 1
						result.append([CDS_right,fir+first_CDS_one+2-move,RNA[fir+first_CDS_one+2-1-move],third[2],[sxGU-a,sGU+b,nsxGU-c,nsGU+d],1])
					else:
						if str(length-(first_CDS_one+2-move)) not in mis_xGU :
							a = 0
							b = 0
							c = 0
							d = 0
							if length-(first_CDS_one-move+2) <= 7:
								if str(length-(first_CDS_one-move+2)) in mis_GU:
									b = 1
								a= 1
							else:
								if str(length-(first_CDS_one-move+2)) in mis_GU:
									d = 1
								c = 1
							result.append([CDS_right,fir+first_CDS_one+2-move,RNA[fir+first_CDS_one+2-move-1],third[2],[sxGU+a,sGU-b,nsxGU+c,nsGU-d],0])

				#-------------------定住前兩碼，看'第三碼'--------------


			elif CDS_right == 'M' or CDS_right == 'W':
				pass
			else:
				for third in CDScodonDict[CDS_right]:
					if third == CDS_seq[2]:
						continue
					elif (third == 'G' and seq[(length+1-mission)-1-move]=='U') or (third == 'U' and seq[(length+1-mission)-1-move]=='G'):
						b = 0
						d = 0
						if length-(first_CDS_one-move+2) <= 7:
							b = 1
						else:
							d = 1
						a = 0
						c = 0
						if str(length-(first_CDS_one-move+2)) in mis_xGU:
							if length-(first_CDS_one-move+2) <= 7:
								a = 1
							else:
								c = 1
						result.append([CDS_right,fir+first_CDS_one+2-move,RNA[fir+first_CDS_one+2-move-1],third,[sxGU-a,sGU+b,nsxGU-c,nsGU+d],1])

					else:
						if str(length-(first_CDS_one+2-move)) not in mis_xGU :
							a = 0
							b = 0
							c = 0
							d = 0
							if length-(first_CDS_one-move+2) <= 7:
								if str(length-(first_CDS_one-move+2)) in mis_GU:
									b = 1
								a= 1
							else:
								if str(length-(first_CDS_one-move+2)) in mis_GU:
									d = 1
								c = 1
							result.append([CDS_right,fir+first_CDS_one+2-move,RNA[fir+first_CDS_one+2-move-1],third,[sxGU+a,sGU-b,nsxGU+c,nsGU-d],0])
		over = 3
		if fir > len(RNA) - length+1 -2:
			over = 0
		front = 3
		if fir < 3:
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
				# print(someNC)
				seqs = ['A','U','G','C']
				for h in someNC:
					for k in seqs:
						nowCheckSeq = RNA[fir+length-1-h]
						nowCheckPi = seq[length-h]
						if nowCheckSeq != k and k!= complement(nowCheckPi) and not((k=='G' and nowCheckPi=='U') or (k=='U' and nowCheckPi=='G')):
							result.insert(0,['',fir+length-h,nowCheckSeq.lower(),k.lower(),[sxGU+1,sGU,nsxGU,nsGU],0])
				

		if fir < CDS1:
			if last_state == 0 and CDSs == 1:
				move = 0
			firstCDSPos = (front+(first_CDS_one)-1)-move+1
			if CDS1 > fir + length - 7:
				someNC = range((fir + length)-CDS1 + 1,8)
				seqs = ['A','U','G','C']
				for h in someNC:
					for k in seqs:
						nowCheckSeq = RNA[fir+length-1-h]
						nowCheckPi = seq[length-h]
						if nowCheckSeq != k and k!= complement(nowCheckPi) and not((k=='G' and nowCheckPi=='U') or (k=='U' and nowCheckPi=='G')):
							result.append(['',fir+length-h,nowCheckSeq.lower(),k.lower(),[sxGU+1,sGU,nsxGU,nsGU],0])

		else:
			firstCDSPos = (front+(first_CDS_one)-1)-move+1
		collect = [name,fir,length,sxGU,sGU,nsxGU,nsGU,result,seq,mis_xGU,mis_GU,new_RNA,firstCDSPos,list(reversed(CDSSS)),front]
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
		qq.append(spanDict)

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
	return output
	# print('CDS1:{0}, CDS2:{1}'.format(CDS1,CDS2))
	# print("CDS:{0}".format(CDS_ori))
	# print("CDScodonDict: {0}".format(CDScodonDict))
	# print(RNA)



def myajaxview(request):
	test = request.POST["val1"]
	return render(request, 'CNZ.html',{'test':test})

def test(request):
	proc = subprocess.call("php ~/public_html/test.php", shell=True)
	script_response = subprocess.check_output(["php", "~/public_html/test.php"])
	return render(request, 'test.html',{'test':script_response})

def modify(request):
	module_dir = os.path.dirname(__file__)
	global Arr2,options,CDS1,CDS2,RNA
	with open(os.path.join(module_dir,'modify.csv'),'r') as f1:
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
				CDS1 = int(mmm[0])
				count+=1
			elif count == 9:
				CDS2 = int(mmm[0])
				count+=1
	# Gene_OK = request.POST.get('data1').replace('>','').strip().split('\n')
	# RNA = strtr(Gene_OK[1].upper(),{'T':'U'}) #將輸入基因T轉成U
	Arr2 = list(RNA)
	# name = Gene_OK[0]
	# options = {'core_non_GU':request.POST.get('opt1'),'core_GU':request.POST.get('opt2'),'non_core_non_GU':request.POST.get('opt3'),'non_core_GU':request.POST.get('opt4'),'total':request.POST.get('opt5'),'nematodeType':request.POST.get('nematodeType')}
	with open(os.path.join(module_dir,'piRNA/{0}/info_name.csv'.format(options['nematodeType'])),'r') as f2:
		reader2 = csv.reader(f2)
		info_names = []
		for x in reader2:
			info_names.append(x[0])
	# if request.POST.get('CDS_1')!='' : 
	# 	CDS1 = int(request.POST.get('CDS_1'))
	# else: 
	# 	CDS1 = 0
	# if request.POST.get('CDS_2')!='' :
	# 	CDS2 = int(request.POST.get('CDS_2'))
	# else: 
	# 	CDS2 = 0
	# print(CDS1)
	# print(CDS2)
	# print('Arr2:'+len(Arr2))
	if (CDS1==0 and CDS2!=0) or (CDS2==0 and CDS1!=0) or ((CDS1!= 0 and CDS2!= 0) and (CDS1 >= CDS2 or (CDS2-CDS1-2)%3 !=0 or CDS2 > len(Arr2) or CDS1 < 1)):
		data = {'state':'CDSX'}
	else:
		mission_count = {'C.elegans':357,'C.briggsae':290}
		result=[]
		start_time = time.time()
		q = JoinableQueue()
		for num in range(mission_count[options['nematodeType']]):
			Process(target=scan, args=(q, num)).start()
		for t in range(mission_count[options['nematodeType']]):
			a = q.get()
			if a != 'N/A':
				for x in a:
					result.append(x)
			q.task_done()
		q.join()
		outForAdvice = result
		CDSout = CDS()
		sug = suggestion(result)
		newsug = sorted(sug, key=operator.itemgetter(1))
		data = {
			'CDS':[CDSout],
			'advice':[],
			'gene':RNA,
			'name':name,
			'newout':result,
			'options':options,
			'piRNA_info_name':info_names,
			'suggestion':newsug,
			'CDS1':CDS1,
			'CDS2':CDS2,
		}
	return JsonResponse(data)

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

def selectedPreData(request):
	module_dir = os.path.dirname(__file__)
	global Arr2,options,CDS1,CDS2,RNA
	with open(os.path.join(module_dir,'modify.csv'),'r') as f1:
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
	Arr2 = list(RNA)
	with open(os.path.join(module_dir,'piRNA/{0}/info_name.csv'.format(options['nematodeType'])),'r') as f2:
			reader2 = csv.reader(f2)
			info_names = []
			for x in reader2:
				info_names.append(x[0])
	predata = {
		# 'CDS':[CDSout],
		'advice':[],
		'gene':RNA,
		'name':name,
		# 'newout':result,
		'options':options,
		'piRNA_info_name':info_names,
		# 'suggestion':newsug,
		'CDS1':CDS1,
		'CDS2':CDS2,
		'changed_pos':changed_pos,
	}
	return JsonResponse(predata)