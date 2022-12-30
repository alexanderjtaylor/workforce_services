from rest_framework import serializers
from .models import Shift

class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = ['id', 'workDate', 'scheduledStart', 'scheduledEnd', 'actualStart', 'actualEnd', 'isHoliday', 'isClockedIn', 'employee_id']
        depth = 1