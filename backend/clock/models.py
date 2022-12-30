from django.db import models
from employees.models import Employee

class Clock(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    clockIn = models.DecimalField(decimal_places=2)
    clockOut = models.DecimalField(decimal_places=2)
    startLunch = models.DecimalField(decimal_places=2)
    returnLunch = models.DecimalField(decimal_places=2)