from django.urls import path
from employers import views

urlpatterns = [
    path('<int:userId>', views.employer_details),
    path('', views.create_employer),
    path('delete/<int:pk>', views.delete_employer),
    path('non_assigned/', views.find_employees_not_assigned),
    path('user/delete/<int:pk>', views.delete_user),
]
