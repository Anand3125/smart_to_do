from django.db import models

# Create your models here.
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50)
    usage_count = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Task(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in-progress', 'In Progress'),
        ('completed', 'Completed'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    priority_score = models.FloatField(default=0)
    deadline = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Context(models.Model):
    message = models.TextField()
    source = models.CharField(max_length=100, default='manual')  # e.g., 'email', 'whatsapp'
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.source}] {self.message[:50]}"
