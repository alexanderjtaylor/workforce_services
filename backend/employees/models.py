from django.db import models
from employers.models import Employer

class Employee(models.Model):
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    dob = models.DateField()
    address = models.CharField(max_length=255)
    phoneNumber = models.CharField(max_length=30)
    jobTitle = models.CharField(max_length=50)
    yearsWithCompany = models.IntegerField()