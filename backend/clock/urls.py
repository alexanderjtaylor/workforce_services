from django.urls import path
from clock import views

urlpatterns = [
    path('time-punch/<int:pk>/', views.time_punch),
]