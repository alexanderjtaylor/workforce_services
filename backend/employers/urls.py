from django.urls import path
from employers import views

urlpatterns = [
    path('<int:userId>', views.employer_details),
    path('', views.create_employer),
    path('delete/<int:pk>', views.delete_employer),
]
