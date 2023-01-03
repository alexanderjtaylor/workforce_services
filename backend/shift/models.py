from django.db import models
from employees.models import Employee

class Shift(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    workDate = models.DateField()
    scheduledStart = models.TimeField()
    scheduledEnd = models.TimeField()
    actualStart = models.TimeField()
    actualEnd = models.TimeField()
    isHoliday = models.BooleanField()
    isClockedIn = models.BooleanField()
    