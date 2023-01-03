from django.db import models
from employees.models import Employee
from shift.models import Shift

class Clock(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE, null=True)
    clockIn = models.TimeField()
    clockOut = models.TimeField()
    startLunch = models.TimeField()
    returnLunch = models.TimeField()