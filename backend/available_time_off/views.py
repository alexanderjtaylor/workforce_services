from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import AvailableTimeOff
from .serializers import AvailableTimeOffSerializer
from django.shortcuts import get_object_or_404


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def request_time_off(request, pk):
    timeOff = get_object_or_404(AvailableTimeOff, pk=pk)
    serializer = AvailableTimeOffSerializer(timeOff)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_time_off(request, pk):
    timeOff = get_object_or_404(AvailableTimeOff, pk=pk)
    serializer = AvailableTimeOffSerializer(timeOff, data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)