from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Clock
from .serializers import ClockSerializer
from django.shortcuts import get_object_or_404

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_all_time_punches(request):
#     time_punches = Clock.objects.all()
#     serializer = ClockSerializer(time_punches, many=True)
#     return Response(serializer.data)

# from datetime import datetime, timedelta
# startDate = datetime.today()
# endDate = startDate - timedelta(days=6)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_all_punches_for_employee_paycheck(request, employee_id):
#     punches = Clock.objects.filter(employee_id=employee_id)
#     punches = punches.filter('startDate', 'endDate')
#     if request.method == 'GET':
#         serializer = ClockSerializer(punches, many=True)
#         return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_punches_for_employee(request, employee_id):
    punches = Clock.objects.filter(employee_id=employee_id)
    if request.method == 'GET':
        serializer = ClockSerializer(punches, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_time_punch(request, pk):
    if request.method == 'POST':
        serializer = ClockSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def time_punch(request, pk):
    clock = get_object_or_404(Clock, pk=pk)
    if request.method == 'GET':
        serializer = ClockSerializer(clock)
        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = ClockSerializer(clock, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        clock.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)