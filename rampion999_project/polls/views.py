from django.http import HttpResponse
from django.shortcuts import render
from .models import Post

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def post_list(request):
    posts = Post.objects.filter(published_date__isnull=False).order_by('published_date')
    return render(request, 'post_list.html', {'posts': posts})