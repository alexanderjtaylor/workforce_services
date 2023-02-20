from django.db import models
from employees.models import Employee
from employers.models import Employer

class PaidTimeOff(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE)
    startWorkDate = models.DateField()
    endWorkDate = models.DateField()
    requestedSickTime = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    requestedVacationTime = models.DecimalField(max_digits=8, decimal_places=2, default=0)