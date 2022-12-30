from django.db import models
from employees.models import Employee

class AvailableTimeOff(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    sickTime = models.DecimalField(decimal_places=2)
    vacationTime = models.DecimalField(decimal_places=2)
    