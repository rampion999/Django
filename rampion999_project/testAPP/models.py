from django.db import models

# Create your models here.

class Man(models.Model):
    name = models.CharField(max_length=10, blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)
    alias = models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = 'man'