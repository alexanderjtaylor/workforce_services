from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Employee
from .models import Shift
from .serializers import ShiftSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_shifts(request):
    shifts = Shift.objects.all()
    serializer = ShiftSerializer(shifts, many=True)
    return Response(serializer.data)

@api_view(['POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def set_schedule(request, pk):
    shift = get_object_or_404(shift, pk=pk)
    #if request.method == 'GET':
        #serializer = ShiftSerializer(shift)
        #return Response(serializer.data)
    if request.method == 'POST':
        serializer = ShiftSerializer(data=request.data)
        serializer.is_valid()
        serializer.save(shift=request.shift)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    elif request.method == 'PUT':
        serializer = ShiftSerializer(shift, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        shift.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)