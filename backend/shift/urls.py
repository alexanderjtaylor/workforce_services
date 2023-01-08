from django.urls import path
from shift import views

urlpatterns = [
    path('set/<int:pk>', views.set_schedule),
    path('edit/<int:pk>', views.edit_schedule),
    #path('view-schdule/<int:fk>', views.see_schedule),
    path('view-all-shifts/', views.view_shifts),
]