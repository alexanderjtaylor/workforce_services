from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Employee
from .serializers import EmployeeSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def test_try(request):
    return Response('ok')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_employees(request):
    employees = Employee.objects.all()
    serializer = EmployeeSerializer(employees, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def search_employees(request):
    print(
        'Employee ', f"{request.employee.id} {request.employee.firstName} {request.employee.lastName} {request.employee.jobTitle} {request.employee.yearsWithCompany} {request.employee.dob} {request.employee.address} {request.employee.phoneNumber}")
    if request.method == 'POST':
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(employee=request.employee)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        employees = Employee.objects.filter(employee_id=request.employee.id)
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)
    
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def employee_details(request, pk):
    employee = get_object_or_404(Employee, pk=pk)
    if request.method == 'GET':
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = EmployeeSerializer(employee, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        employee.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)