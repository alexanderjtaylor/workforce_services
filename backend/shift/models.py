from django.db import models
from employees.models import Employee

class Shift(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    workDate = models.DateField()
    scheduledStart = models.DecimalField(max_digits=8, decimal_places=2)
    scheduledEnd = models.DecimalField(max_digits=8, decimal_places=2)
    actualStart = models.DecimalField(max_digits=8, decimal_places=2)
    actualEnd = models.DecimalField(max_digits=8, decimal_places=2)
    isHoliday = models.BooleanField()
    isClockedIn = models.BooleanField()
    