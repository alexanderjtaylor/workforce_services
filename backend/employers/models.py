from django.db import models
from authentication.models import User
from employees.models import Employee

class Employer(models.Model):
    companyName = models.CharField(max_length=255)
    numberOfEmployees = models.IntegerField()
    
    def save(self, *args, **kwargs):
        employee_count = Employee.objects.filter(employer=self).count()
        self.numberOfEmployees = employee_count
        super(Employer, self).save(*args, **kwargs)