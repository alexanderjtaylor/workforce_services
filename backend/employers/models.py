from django.db import models
from authentication.models import User

class Employer(models.Model):
    companyName = models.CharField(max_length=255)