from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Employee
from .models import Paycheck
from .serializers import PaycheckSerializer
from django.shortcuts import get_object_or_404


#@api_view(['GET'])
#@permission_classes([IsAuthenticated])
#def paycheck_home(request, fk):
    #paycheck = get_object_or_404(Paycheck, fk=fk)
    #serializer = PaycheckSerializer(paycheck)
    #return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def paycheck_display(request, pk):
    paycheck = get_object_or_404(Paycheck, pk=pk)
    serializer = PaycheckSerializer(paycheck)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get__all_paychecks_for_employee(request, employee_id):
    paychecks = Paycheck.objects.filter(employee_id=employee_id)
    if request.method == 'GET':
        serializer = PaycheckSerializer(paychecks, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_paycheck(request):
    if request.method == 'POST':
        serializer = PaycheckSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)