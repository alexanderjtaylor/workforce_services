from django.db import models
from employees.models import Employee

class TimeOff(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    workDate = models.DateField()
    requestedSickTime = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    requestedVacationTime = models.DecimalField(max_digits=8, decimal_places=2, default=0)