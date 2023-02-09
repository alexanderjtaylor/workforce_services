from django.urls import path, include
from employees import views

urlpatterns = [
    path('create/', views.create_employee),
    path('<int:pk>', views.employee_details),
    path('employee/<int:pk>', views.employee_details_employee_id),
    path('edit/<int:pk>', views.edit_delete_employee),
    #path('all/', views.get_all_employees),
    path('<int:pk>/employees', views.get_employers_employees),
]
