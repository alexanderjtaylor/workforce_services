from rest_framework import serializers
from .models import Employer

class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = ['id', 'companyName', 'user', 'user_id']
        depth = 1
    user_id = serializers.IntegerField(write_only=True)