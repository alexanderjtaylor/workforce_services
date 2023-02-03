from rest_framework import serializers
from .models import Paycheck

class PaycheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paycheck
        fields = ['id', 'hoursWorked', 'OTHoursWorked', 'sickTimeUsed', 'vacationTimeUsed', 'taxes', 'employee', 'employee_id']
        depth = 1
    employee_id = serializers.IntegerField(write_only=True)