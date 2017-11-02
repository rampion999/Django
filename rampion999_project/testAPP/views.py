from __future__ import unicode_literals
from django.shortcuts import render
from datetime import datetime
from .models import Man

# Create your views here.
def sleep(request):
	man_list = Man.objects.all()
	return render(request, 'test_page.html', {
		'current_time': str(datetime.now()),
		'man_list': man_list
	})

