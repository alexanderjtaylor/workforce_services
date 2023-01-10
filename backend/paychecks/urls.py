from django.urls import path, include
from paychecks import views

urlpatterns = [
    path('home/<int:pk>', views.paycheck_display),
    #path('<int:pk>/paycheck-display', views.paycheck_display),
    path('create-paycheck/', views.create_paycheck),
    path('<int:employee_id>/paychecks', views.get__all_paychecks_for_employee),
]
