from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from employees.models import Employee
from .models import Employer
from .serializers import EmployerSerializer
from django.shortcuts import get_object_or_404


@api_view(['GET'])
@permission_classes([IsAuthenticated])#IsAdminUser
def employer_details(request, pk):
    employee_count = Employee.objects.filter(employer_id=pk).count()
    employer = get_object_or_404(Employer, pk=pk)
    if request.method == 'GET':
        serializer = EmployerSerializer(employer)
        custom_response = {
            "employer": serializer.data,
            "employee count": employee_count
        }
        return Response(custom_response)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])#IsAdminUser
def create_employer(request):
    serializer = EmployerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])#IsAdminUser
def delete_employer(request, pk):
    employee = get_object_or_404(Employer, pk=pk)
    employee.delete()
    return Response(status = status.HTTP_204_NO_CONTENT)