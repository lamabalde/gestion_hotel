from django.urls import path
from .views import RegisterView, LoginView, HotelListCreateView, HotelDetailView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('hotels/', HotelListCreateView.as_view(), name='hotel_list'),
    path('hotels/<int:pk>/', HotelDetailView.as_view(), name='hotel_detail'),
]
