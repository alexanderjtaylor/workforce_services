from django.urls import path
from clock import views

urlpatterns = [
    path('create-time-punch/<int:pk>', views.create_time_punch),
    path('time-punch/<int:pk>', views.time_punch),
    #path('all-punches', views.get_all_time_punches),
    path('<int:employee_id>/punches', views.get_all_punches_for_employee),
    # path('<int:employee_id>/paycheck-punches', views.get_all_punches_for_employee_paycheck),
]