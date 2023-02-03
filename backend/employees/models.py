from django.db import models
from authentication.models import User
from employers.models import Employer

class Employee(models.Model):
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    jobTitle = models.CharField(max_length=50)
    yearsWithCompany = models.IntegerField(default=0)
    payRate = models.DecimalField(max_digits=8, decimal_places=2, default=15.00)
    OTPayRate = models.DecimalField(max_digits=8, decimal_places=2, default=15.00)
    sickTime = models.DecimalField(max_digits=8, decimal_places=2, default=40.00)
    vacationTime = models.DecimalField(max_digits=8, decimal_places=2, default=40.00)