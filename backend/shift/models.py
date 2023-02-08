from django.db import models
from employees.models import Employee

class Shift(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    workDate = models.DateField()
    scheduledStart = models.DateTimeField()
    scheduledEnd = models.DateTimeField()
    actualStart = models.DateTimeField(default="2000-01-01 00:00:00")
    actualEnd = models.DateTimeField(default="2000-01-01 00:00:00")
    isHoliday = models.BooleanField(default=False)
    isClockedIn = models.BooleanField(default=False)
    