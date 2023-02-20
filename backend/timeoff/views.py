from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from .models import Employee
from .models import TimeOff
from .serializers import TimeOffSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_requests_for_employee(request, employee_id):
    requests = TimeOff.objects.filter(employee_id=employee_id)
    if request.method == 'GET':
        serializer = TimeOffSerializer(requests, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_pto_request(request, pk):
    employee = get_object_or_404(Employee, id=pk)
    if request.method == 'POST':
        serializer = TimeOffSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAdminUser])
def respond_to_pto_request(request, pk):
    pto = get_object_or_404(TimeOff, pk=pk)
    if request.method == 'DELETE':
        pto.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)   