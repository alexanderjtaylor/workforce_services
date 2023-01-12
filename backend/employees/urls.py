from django.urls import path, include
from employees import views

urlpatterns = [
    path('search/', views.search_employees),
    path('<int:pk>', views.employee_details),
    path('edit/<int:pk>', views.edit_delete_employee),
    #path('all/', views.get_all_employees),
    path('<int:employer_id>/employees', views.get_employers_employees),
]
