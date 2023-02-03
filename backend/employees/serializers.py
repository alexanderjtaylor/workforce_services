from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'firstName', 'lastName', 'jobTitle', 'yearsWithCompany', 'payRate', 'OTPayRate', 'sickTime', 'vacationTime', 'employer', 'employer_id', 'user', 'user_id' ]
        depth = 1
    employer_id = serializers.IntegerField(write_only=True)
    user_id = serializers.IntegerField(write_only=True)