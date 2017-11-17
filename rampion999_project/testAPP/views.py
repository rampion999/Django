from django.shortcuts import render
from django.http import JsonResponse
import json
import os

# Create your views here.
def table(request):
	return render(request, 'table.html')


def tableTest(request):
	module_dir = os.path.dirname(__file__)
	print('QQQQQQQQQQQQQQQQQQQQQ')
	with open(os.path.join(module_dir,'ori_result.json'),'r') as w1:
		data = json.load(w1)
	return JsonResponse(data)

