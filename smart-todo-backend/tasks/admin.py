from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Task, Category

# Register your models here
admin.site.register(Task)
admin.site.register(Category)
