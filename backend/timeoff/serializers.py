from rest_framework import serializers
from .models import TimeOff

class TimeOffSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeOff
        fields = ['id', 'workDate', 'requestedSickTime', 'requestedVacationTime', 'employee', 'employee_id']
        depth = 1
    employee_id = serializers.IntegerField(write_only=True)