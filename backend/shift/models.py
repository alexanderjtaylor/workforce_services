from django.db import models
from employees.models import Employee

class Shift(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    workDate = models.DateField()
    scheduledStart = models.DateTimeField()
    scheduledEnd = models.DateTimeField()
    actualStart = models.DateTimeField(default="2000-01-01 00:00:00")
    actualEnd = models.DateTimeField(default="2000-01-01 00:00:00")
    sickTimeUsed = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    vacationTimeUsed = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    isHoliday = models.BooleanField(default=False)
    isClockedIn = models.BooleanField(default=False)
    