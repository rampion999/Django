from django.shortcuts import render
import csv
import os

# Create your views here.
def bulge_demo(request):
	module_dir = os.path.dirname(__file__)
	names = []
	with open(os.path.join(module_dir,'compare_new.csv'),'r') as f:
		r1 = csv.reader(f)
		for i in r1:
			names.append(i)
	return render(request, 'bulge_demo.html',{'names':names})
	