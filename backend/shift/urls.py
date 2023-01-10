from django.urls import path
from shift import views

urlpatterns = [
    path('set/<int:pk>', views.set_schedule),
    path('edit/<int:pk>', views.edit_schedule),
    path('view-all-shifts/', views.view_shifts),
    path('<int:employee_id>/shifts', views.get__all_shifts_for_employee),
]