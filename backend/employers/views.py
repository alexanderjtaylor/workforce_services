from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from employees.models import Employee
from .models import Employer
from .serializers import EmployerSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Q 
from authentication.models import User
from authentication.serializers import UserSerializer



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def employer_details(request, pk):
    employer = get_object_or_404(Employer, user_id=pk)
    employee_count = Employee.objects.filter(employer_id=pk).count()
    if request.method == 'GET':
        serializer = EmployerSerializer(employer)
        custom_response = {
            "employer": serializer.data,
            "employee_count": employee_count
        }
        return Response(custom_response)
    
@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_employer(request):
    serializer = EmployerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_employer(request, pk):
    employee = get_object_or_404(Employer, pk=pk)
    employee.delete()
    return Response(status = status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def find_employees_not_assigned(request):
    unused_users = User.objects.filter(~Q(pk__in=Employee.objects.values('user_id')))
    users_seralized = UserSerializer(unused_users, many=True)
    return Response(users_seralized.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_user(request, pk):
    user = get_object_or_404(User, pk=pk)
    user.delete()
    return Response(status = status.HTTP_204_NO_CONTENT)