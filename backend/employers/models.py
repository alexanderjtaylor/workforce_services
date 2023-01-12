from django.db import models
from authentication.models import User

class Employer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    companyName = models.CharField(max_length=255)