from rest_framework import serializers
from .models import User, Hotel

class UserRegisterSerializer(serializers.ModelSerializer):
    mot_de_passe = serializers.CharField(write_only=True)  # mot de passe write_only

    class Meta:
        model = User
        fields = ['nom', 'email', 'mot_de_passe']

    def create(self, validated_data):
        mot_de_passe = validated_data.pop('mot_de_passe')
        user = User(**validated_data)
        user.set_password(mot_de_passe)  # hash du mot de passe
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    mot_de_passe = serializers.CharField()

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'
