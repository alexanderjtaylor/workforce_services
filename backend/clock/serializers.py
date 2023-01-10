from rest_framework import serializers
from .models import Clock

class ClockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clock
        fields = ['id', 'clockIn', 'clockOut', 'startLunch', 'returnLunch', 'employee', 'employee_id', 'shift', 'shift_id']
        depth = 1
    employee_id = serializers.IntegerField(write_only=True)
    shift_id = serializers.IntegerField(write_only=True)