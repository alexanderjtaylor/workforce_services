from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from .models import Employee
from .models import Employer
from .models import PaidTimeOff
from .serializers import PaidTimeOffSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_pto_requests_for_employer(request, pk):
    employer = get_object_or_404(Employer, user_id=pk)
    ptoRequests = PaidTimeOff.objects.filter(employer_id=employer.id)
    if request.method == 'GET':
        serializer = PaidTimeOffSerializer(ptoRequests, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_requests_for_employee(request, employee_id):
    requests = PaidTimeOff.objects.filter(employee_id=employee_id)
    if request.method == 'GET':
        serializer = PaidTimeOffSerializer(requests, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_pto_request_by_request_id(request, pk):
    pto = PaidTimeOff.objects.filter(id=pk)
    if request.method == 'GET':
        serializer = PaidTimeOffSerializer(pto, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_pto_request(request, pk):
    employee = get_object_or_404(Employee, id=pk)
    if request.method == 'POST':
        serializer = PaidTimeOffSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAdminUser])
def respond_to_pto_request(request, pk):
    pto = get_object_or_404(PaidTimeOff, pk=pk)
    if request.method == 'DELETE':
        pto.delete()
        return Response(status = status.HTTP_204_NO_CONTENT) 
    
@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def pto_update(request, pk):
    pto = get_object_or_404(PaidTimeOff, pk=pk)
    if request.method == 'PUT':
        serializer = PaidTimeOffSerializer(pto, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'PATCH':
        serializer = PaidTimeOffSerializer(pto, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data) 