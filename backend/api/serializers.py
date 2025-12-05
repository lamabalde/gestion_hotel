from rest_framework import serializers
from .models import User, Hotel

class UserRegisterSerializer(serializers.ModelSerializer):
    mot_de_passe = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['nom', 'email', 'mot_de_passe']

    def create(self, validated_data):
        # mot_de_passe sera hashé automatiquement dans User.save()
        user = User.objects.create(**validated_data)
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    mot_de_passe = serializers.CharField()


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'
