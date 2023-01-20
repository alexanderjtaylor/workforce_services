from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from .models import Employee
from .serializers import EmployeeSerializer
from django.shortcuts import get_object_or_404

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_all_employees(request):
#     employees = Employee.objects.all()
#     serializer = EmployeeSerializer(employees, many=True)
#     return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def employee_details(request, user_id):
    employee = get_object_or_404(Employee, user_id=user_id)
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
    #elif request.method == 'GET':
        print('Employee ', f"{request.employee.id} {request.employee.firstName} {request.employee.lastName} {request.employee.employer} {request.employee.jobTitle} {request.employee.yearsWithCompany} {request.employee.dob} {request.employee.address} {request.employee.phoneNumber}")
        employees = Employee.objects.filter(employee_id=request.employee.id)
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)
    
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
def get_employers_employees(request, user_id):
    employees = Employee.objects.filter(user_id=user_id)
    if request.method == 'GET':
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)