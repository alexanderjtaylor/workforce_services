from django.db import models
from employees.models import Employee

class Shift(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    workDate = models.DateField()
    scheduledStart = models.DateTimeField()
    scheduledEnd = models.DateTimeField()
    actualStart = models.DateTimeField()
    actualEnd = models.DateTimeField()
    isHoliday = models.BooleanField()
    isClockedIn = models.BooleanField()
    