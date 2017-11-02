"""gene_scan_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from django.contrib import admin
from testAPP import views
from piRNA_scan import views as views_piRNA
from piRNA_demo import views as views_piRNA_demo
from bulge import views as bulge
from bulge_demo import views as bulge_d
from QT import views as QT

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^polls/', include('polls.urls')),
    url(r'^blog/', include('polls.blog.urls')),
    url(r'^sleep/$', views.sleep),
    url(r'^piRNA/$', views_piRNA.piRNA),
    url(r'^bulge/$', bulge.bulge),
    url(r'^bulge_demo/$', bulge_d.bulge_demo),
    url(r'^piRNA_demo/$', views_piRNA_demo.piRNA),
    url(r'^piRNA/Scan/$', views_piRNA.goScan),
    url(r'^piRNA/Help/$', views_piRNA.goHelp),
    url(r'^piRNA/Contact/$', views_piRNA.goContact),
    url(r'^piRNA/Result/$', views_piRNA.goResult),
    url(r'^piRNA/Scan/scanOperation/', views_piRNA.scan_main),
    url(r'^bulge/scan/', bulge.scan_main),  
    url(r'^piRNA/Scan(?:/update)*/create_data/', views_piRNA.create_data),
    url(r'^piRNA/Scan(?:/update)+/create_data/', views_piRNA.create_data),
    url(r'^piRNA/Scan(?:/update)+/selectedPreData/$', views_piRNA.selectedPreData),
    url(r'^piRNA/Scan(?:/update)+/showDaTable/', views_piRNA.showDaTable),
    url(r'^piRNA/Scan(?:/update)+/scanOperation/', views_piRNA.scan_main),
    url(r'^piRNA/Scan/update/', views_piRNA.update),
    url(r'^piRNA_demo(?:/update)*/create_data/', views_piRNA_demo.create_data),
    url(r'^piRNA_demo(?:/update)+/selectedPreData/', views_piRNA_demo.selectedPreData),
    url(r'^piRNA_demo(?:/update)+/showDaTable/', views_piRNA_demo.showDaTable),
    url(r'^piRNA_demo(?:/update)+/scan/', views_piRNA_demo.scan_main),
    url(r'^piRNA_demo/update/', views_piRNA_demo.update),
    url(r'^piRNA_demo/scan/', views_piRNA_demo.scan_main),
    url(r'^[^\t]*/CNZ/', views_piRNA.myajaxview),
    url(r'^[^\t]*/test/', views_piRNA.test),
    url(r'^QT/$', QT.QT),
]
