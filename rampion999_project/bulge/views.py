from django.shortcuts import render
from django.core.urlresolvers import reverse
from django.http import JsonResponse
import csv
import json
import math
import os
import re


# Create your views here.

def bulge(request):
	return render(request, 'bulge.html')

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

def scan_main(request):
	module_dir = os.path.dirname(__file__)
	if request.POST.get('data1') == '':
		data = {'state':'nothing'}
	# elif re.search("^>[A-Za-z0-9|_,+.\s]+$",request.POST.get('data1')) == None:
	# 	data = {'state':'wrong'}
	else:
		with open(os.path.join(module_dir,'names.json'),'r') as f:
			res = json.load(f)
		if request.POST.get('data1').strip() not in res['names']:
			data = {'state':'not_in'}
		else:
			with open(os.path.join(module_dir,'new_input_genes.json'),'r') as f:
				seqs = json.load(f)	
			global RNAlist,options,CDS1,CDS2,RNA
			RNA = seqs[request.POST.get('data1').strip()]
			RNAlist = list(RNA)
			name = request.POST.get('data1').replace('>','')
			options = {'core_non_GU':30,'core_GU':30,'non_core_non_GU':30,'non_core_GU':30,'total':6,'nematodeType':'non'}
		# with open(os.path.join(module_dir,'piRNA/{0}/info_name.csv'.format(options['nematodeType'])),'r') as f2:
		# 	reader2 = csv.reader(f2)
		# 	info_names = []
		# 	for x in reader2:
		# 		info_names.append(x[0])
		# if request.POST.get('CDS_1')!='' : 
		# 	CDS1 = int(request.POST.get('CDS_1'))
		# else: 
		# 	CDS1 = 0
		# if request.POST.get('CDS_2')!='' :
		# 	CDS2 = int(request.POST.get('CDS_2'))
		# else: 
		# 	CDS2 = 0
		# # print(CDS1)
		# # print(CDS2)
		# # print('Arr2:'+len(Arr2))
		# if (CDS1==0 and CDS2!=0) or (CDS2==0 and CDS1!=0) or ((CDS1!= 0 and CDS2!= 0) and (CDS1 >= CDS2 or (CDS2-CDS1-2)%3 !=0 or CDS2 > len(Arr2) or CDS1 < 1)):
		# 	data = {'state':'CDSX'}
		# else:
		# 	mission_count = {'C.elegans':357,'C.briggsae':290}
			result=[]
		# 	start_time = time.time()
		# 	q = JoinableQueue()
		# 	for num in range(mission_count[options['nematodeType']]):
		# 		Process(target=scan, args=(q, num)).start()
		# 	for t in range(mission_count[options['nematodeType']]):
		# 		a = q.get()
		# 		if a != 'N/A':
		# 			for x in a:
		# 				result.append(x)
		# 		q.task_done()
		# 	q.join()
		# 	outForAdvice = result
		# 	CDSout = CDS()
		# 	sug = suggestion(result)
		# 	newsug = sorted(sug, key=operator.itemgetter(1))
			if request.POST.get('scanType') == 'TransformBTN1':
				result = scan()
			elif request.POST.get('scanType') == 'TransformBTN2':
				result = scan_original()
			# for asdf in result:
			# 	print(asdf[13])
			new_res = sorted(result,key=lambda x: (x[13]))
			# print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
			# for qqqqqqqqqqq in new_res:
			# 	print(qqqqqqqqqqq[13])
			data = {
				# 'CDS':[CDSout],
				'advice':[],
				'gene':RNA,
				'name':name,
				'newout':new_res,
				'options':options,
				# 'piRNA_info_name':info_names,
				# 'suggestion':newsug,
				# 'csrf':request.POST.get('csrfmiddlewaretoken'),
			}
	return JsonResponse(data)

def scan():
	global piRNA_Length
	module_dir = os.path.dirname(__file__)
	with open(os.path.join(module_dir,'piRNA/piRNA1.txt'),'r') as f1:
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
		for a in range(len(RNAlist)-len(Arr1)): # a=大RNA的次序 a次數不會大於(總長-piRNA長)，用range所以+1
			  #Arr5存piRNA的Reverse秀結果用 

			"""RNA reverse compliment後從第一位開始掃，也就是序列後方開始 
				$d計算core_non_GU $e計算non_core_non_GU $m計算core_GU 
				$n計算non_core_GU $o計算第一位"""
			for bulge in range(len(Arr1)+1):
				GG = 1   #q=同一個序列第幾次結果
				Arr4 = []
				ArryxGU = []  #$Arr4存沒對到的位置 $ArryxGU存不是GU的錯誤位置
				Arr3 = list(key[1][::-1])
				Arr5 = list(key[1][::-1])
				b = a +len(Arr1)-2
				c = len(Arr1)-2
				d = 0
				e = 0
				m = 0
				n = 0
				o = 0
				Arr2 = list(RNAlist)
				Arr2.pop(a +len(Arr1) -bulge)
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
								Arr5[len(Arr1)-1] = "<mark id>"+Arr5[len(Arr1)-1]+"</mark>"
								Arr4.insert(0,"<mark id='b'>1</mark>")
								ArryxGU.insert(0,'1')
							o+=1
						if d + e + m + n + o> int(options['total']):
							b-=1
							c-=1
							break
						Arr3[len(Arr1)-2] = Arr3[len(Arr1)-2]+"<span id='L'>|</span>"
						Arr5[len(Arr1)-2] = Arr5[len(Arr1)-2]+"<span id='L'>|</span>"
						Arr3[len(Arr1)-8] = Arr3[len(Arr1)-8]+"<span id='L'>|</span>"
						Arr5[len(Arr1)-8] = Arr5[len(Arr1)-8]+"<span id='L'>|</span>"
						Arr3.insert(len(Arr1) -bulge,RNAlist[a +len(Arr1) -bulge])
						if bulge == 0:
							Arr5[len(Arr1)-1] =  Arr5[len(Arr1)-1] + '-'
						else:	
							Arr5[len(Arr1) -bulge] = '-'+Arr5[len(Arr1) -bulge]
						if Arr4 == [] :
							Arr4 = 'N/A'
						if ArryxGU == [] :
							ArryxGU = 'N/A'
						# print(Arr4)
						outArr.append([key[0],str(a+1)+'~'+str(a+22),o+d+e+m+n,','.join(Arr4),','.join(ArryxGU),d,m,e,n,"5' "+''.join(Arr3)+" 3'","3' "+''.join(Arr5)+" 5'",key[2],key[1][::-1],a +len(Arr1) -bulge,bulge])
						GG+=1
						b-=1
						c-=1
	# if outArr==[]:
	# 	outArr = 'N/A'
	return(outArr)

def scan_original():
	global piRNA_Length
	module_dir = os.path.dirname(__file__)
	with open(os.path.join(module_dir,'piRNA/piRNA1.txt'),'r') as f1:
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
		for a in range(len(RNAlist)-len(Arr1)+1): # a=大RNA的次序 a次數不會大於(總長-piRNA長)，用range所以+1
			  #Arr5存piRNA的Reverse秀結果用 

			"""RNA reverse compliment後從第一位開始掃，也就是序列後方開始 
				$d計算core_non_GU $e計算non_core_non_GU $m計算core_GU 
				$n計算non_core_GU $o計算第一位"""
			for bulge in range(1):
				GG = 1   #q=同一個序列第幾次結果
				Arr4 = []
				ArryxGU = []  #$Arr4存沒對到的位置 $ArryxGU存不是GU的錯誤位置
				Arr3 = list(key[1][::-1])
				Arr5 = list(key[1][::-1])
				b = a +len(Arr1)-2
				c = len(Arr1)-2
				d = 0
				e = 0
				m = 0
				n = 0
				o = 0
				Arr2 = list(RNAlist)
				# Arr2.pop(a +len(Arr1) -bulge)
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
								Arr5[len(Arr1)-1] = "<mark id>"+Arr5[len(Arr1)-1]+"</mark>"
								Arr4.insert(0,"<mark id='b'>1</mark>")
								ArryxGU.insert(0,'1')
							o+=1
						if d + e + m + n + o> int(options['total']):
							b-=1
							c-=1
							break
						Arr3[len(Arr1)-2] = Arr3[len(Arr1)-2]+"<span id='L'>|</span>"
						Arr5[len(Arr1)-2] = Arr5[len(Arr1)-2]+"<span id='L'>|</span>"
						Arr3[len(Arr1)-8] = Arr3[len(Arr1)-8]+"<span id='L'>|</span>"
						Arr5[len(Arr1)-8] = Arr5[len(Arr1)-8]+"<span id='L'>|</span>"
						# Arr3.insert(len(Arr1) -bulge,RNAlist[a +len(Arr1) -bulge])
						# if bulge == 0:
						# 	Arr5[len(Arr1)-1] =  Arr5[len(Arr1)-1] + '-'
						# else:	
						# 	Arr5[len(Arr1) -bulge] = '-'+Arr5[len(Arr1) -bulge]
						if Arr4 == [] :
							Arr4 = 'N/A'
						if ArryxGU == [] :
							ArryxGU = 'N/A'
						# print(Arr4)
						outArr.append([key[0],str(a+1)+'~'+str(a+21),o+d+e+m+n,','.join(Arr4),','.join(ArryxGU),d,m,e,n,"5' "+''.join(Arr3)+" 3'","3' "+''.join(Arr5)+" 5'",key[2],key[1][::-1],a +len(Arr1) -bulge,bulge])
						GG+=1
						b-=1
						c-=1
	# if outArr==[]:
	# 	outArr = 'N/A'
	return(outArr)