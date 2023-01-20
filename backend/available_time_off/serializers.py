from rest_framework import serializers
from .models import AvailableTimeOff

class AvailableTimeOffSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailableTimeOff
        fields = ['id', 'sickTime', 'vacationTime', 'employee', 'employee_id']
        depth = 1
    employee_id = serializers.IntegerField(write_only=True)