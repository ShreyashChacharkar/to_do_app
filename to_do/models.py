from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=255, default="default")
    desc = models.TextField(default="default")
    status = models.CharField(max_length=20, default='Active')

    def __str__(self):
        return self.title

