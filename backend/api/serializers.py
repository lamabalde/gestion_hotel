from rest_framework import serializers
from .models import User, Hotel


# ========================
#  SERIALIZER INSCRIPTION
# ========================
class UserRegisterSerializer(serializers.ModelSerializer):
    mot_de_passe = serializers.CharField(write_only=True, required=True, min_length=6)

    class Meta:
        model = User
        fields = ['nom', 'email', 'mot_de_passe']

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            nom=validated_data['nom'],
            mot_de_passe=validated_data['mot_de_passe']
        )
        return user


# ========================
#  SERIALIZER LOGIN
# ========================
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    mot_de_passe = serializers.CharField(write_only=True)


# ========================
#  SERIALIZER HOTEL
# ========================
class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'
