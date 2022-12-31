from django.urls import path
from employers import views

urlpatterns = [
    path('<int:pk>', views.employer_details),
]
