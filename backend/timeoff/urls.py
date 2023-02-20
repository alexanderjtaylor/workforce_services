from django.urls import path
from timeoff import views

urlpatterns = [
    path('request/<int:pk>', views.create_pto_request),
    path('respond/<int:pk>', views.respond_to_pto_request),
    path('<int:employee_id>/pto-requests', views.get_all_requests_for_employee),
]