from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'firstName', 'lastName', 'dob', 'address', 'phoneNumber', 'jobTitle', 'yearsWithCompany', 'employer_id']
        depth = 1