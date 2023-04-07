from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from .models import Employee
from .models import Employer
from .serializers import EmployeeSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def employee_details(request, pk):
    employee = get_object_or_404(Employee, user_id=pk)
    if request.method == 'GET':
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def employee_details_employee_id(request, pk):
    employee = get_object_or_404(Employee, id=pk)
    if request.method == 'GET':
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_employee(request):
    if request.method == 'POST':
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT', 'DELETE'])
@permission_classes([IsAdminUser])
def edit_delete_employee(request, pk):
    employee = get_object_or_404(Employee, pk=pk)
    if request.method == 'PUT':
        serializer = EmployeeSerializer(employee, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        employee.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_employers_employees(request, pk):
    employer = get_object_or_404(Employer, user_id=pk)
    employees = Employee.objects.filter(employer_id=employer.id)
    if request.method == 'GET':
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)