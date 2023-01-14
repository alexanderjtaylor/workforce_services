from django.db import models
from authentication.models import User
from employers.models import Employer

class Employee(models.Model):
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    dob = models.DateField()
    address = models.CharField(max_length=255)
    phoneNumber = models.CharField(max_length=30)
    jobTitle = models.CharField(max_length=50)
    yearsWithCompany = models.IntegerField()
    sickTime = models.DecimalField(max_digits=8, decimal_places=2, default=40.00)
    vacationTime = models.DecimalField(max_digits=8, decimal_places=2, default=40.00)