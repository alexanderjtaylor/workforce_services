from django.db import models
from employees.models import Employee

class Paycheck(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    payRate = models.DecimalField(max_digits=8, decimal_places=2)
    OTPayRate = models.DecimalField(max_digits=8, decimal_places=2)
    hoursWorked = models.DecimalField(max_digits=8, decimal_places=2)
    OTHoursWorked = models.DecimalField(max_digits=8, decimal_places=2)
    sickTimeUsed = models.DecimalField(max_digits=8, decimal_places=2)
    vacationTimeUsed = models.DecimalField(max_digits=8, decimal_places=2)
    taxes = models.DecimalField(max_digits=8, decimal_places=2)