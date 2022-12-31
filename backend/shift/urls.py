from django.urls import path
from shift import views

urlpatterns = [
    path('set-schedule/<int:pk>/', views.set_schedule),
    path('view-schedule', views.view_shifts),
]