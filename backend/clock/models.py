from django.db import models
from employees.models import Employee
from shift.models import Shift

class Clock(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE, null=True)
    clockIn = models.DateTimeField()
    clockOut = models.DateTimeField(default="2000-01-01 00:00:00")
    startLunch = models.DateTimeField(default="2000-01-01 00:00:00")
    returnLunch = models.DateTimeField(default="2000-01-01 00:00:00")