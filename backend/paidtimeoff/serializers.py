from rest_framework import serializers
from .models import PaidTimeOff

class PaidTimeOffSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaidTimeOff
        fields = ['id', 'startWorkDate', 'endWorkDate', 'requestedSickTime', 'requestedVacationTime', 'employee', 'employee_id', 'employer', 'employer_id']
        depth = 1
    employee_id = serializers.IntegerField(write_only=True)