from django.db import models
from employees.models import Employee

class Clock(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    clockIn = models.DecimalField(max_digits=8, decimal_places=2)
    clockOut = models.DecimalField(max_digits=8, decimal_places=2)
    startLunch = models.DecimalField(max_digits=8, decimal_places=2)
    returnLunch = models.DecimalField(max_digits=8, decimal_places=2)