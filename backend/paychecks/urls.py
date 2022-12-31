from django.urls import path, include
from paychecks import views

urlpatterns = [
    path('home/<int:pk>/', views.paycheck_home),
    path('<int:pk>/paycheck-display', views.paycheck_display),
]
