from rest_framework import serializers
from .models import Paycheck

class PaycheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paycheck
        fields = ['id', 'payRate', 'OTPayRate', 'hoursWorked', 'OTHoursWorked', 'sickTimeUsed', 'vacationTimeUsed', 'taxes', 'employee_id']
        depth = 1