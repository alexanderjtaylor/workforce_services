from rest_framework import serializers
from .models import Clock

class ClockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clock
        fields = ['id', 'clockIn', 'clockOut', 'startLunch', 'returnLunch', 'employee_id', 'shift_id']
        depth = 1