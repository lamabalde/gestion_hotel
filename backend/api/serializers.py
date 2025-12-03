from rest_framework import serializers
from .models import User, Hotel


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['nom', 'email', 'mot_de_passe']


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    mot_de_passe = serializers.CharField()


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'
