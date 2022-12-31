from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Employer
from .serializers import EmployerSerializer
from django.shortcuts import get_object_or_404


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def employer_details(request, pk):
    employer = get_object_or_404(Employer, pk=pk)
    if request.method == 'GET':
        serializer = EmployerSerializer(employer)
        return Response(serializer.data)