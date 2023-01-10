from django.urls import path, include
from employees import views

urlpatterns = [
    path('search/', views.search_employees),
    path('<int:pk>', views.employee_details),
    path('all/', views.get_all_employees),
    path('<int:employer_id>/employees', views.get_employers_employees),
]
