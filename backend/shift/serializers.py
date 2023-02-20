from rest_framework import serializers
from .models import Shift

class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = ['id', 'workDate', 'scheduledStart', 'scheduledEnd', 'actualStart', 'actualEnd', 'sickTimeUsed', 'vacationTimeUsed', 'isHoliday', 'isClockedIn', 'employee', 'employee_id']
        depth = 1
    employee_id = serializers.IntegerField(write_only=True)