from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Clock
from .serializers import ClockSerializer
from django.shortcuts import get_object_or_404


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def time_punch(request, pk):
    clock = get_object_or_404(Clock, pk=pk)
    serializer = ClockSerializer(clock, data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)