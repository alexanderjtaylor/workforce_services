from django.urls import path, include
from available_time_off import views

urlpatterns = [
    path('time-off-response/<int:pk>/', views.edit_time_off),
    path('time-off-request/<int:pk>/', views.request_time_off),
]
