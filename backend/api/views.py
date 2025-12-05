import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth.hashers import check_password
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BaseAuthentication

from .models import User, Hotel
from .serializers import UserRegisterSerializer, UserLoginSerializer, HotelSerializer


# =============================
# 🔹 JWT Authentication
# =============================
class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        try:
            token_type, token = auth_header.split(' ')
            if token_type.lower() != 'bearer':
                return None
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(id=payload['id'])
            return (user, None)
        except (jwt.ExpiredSignatureError, jwt.DecodeError, User.DoesNotExist):
            return None


# =============================
# 🔹 Register
# =============================
class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "Utilisateur créé avec succès",
                "user": {
                    "id": user.id,
                    "nom": user.nom,
                    "email": user.email
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =============================
# 🔹 Login + JWT
# =============================
class LoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            mot_de_passe = serializer.validated_data['mot_de_passe']

            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({"error": "Email ou mot de passe incorrect"}, status=status.HTTP_400_BAD_REQUEST)

            # ✅ Utilisation de verify_password
            if not user.verify_password(mot_de_passe):
                return Response({"error": "Email ou mot de passe incorrect"}, status=status.HTTP_400_BAD_REQUEST)

            payload = {
                "id": user.id,
                "email": user.email,
                "exp": datetime.utcnow() + timedelta(hours=24)
            }

            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
            if isinstance(token, bytes):
                token = token.decode('utf-8')

            return Response({
                "message": "Connexion réussie",
                "token": token,
                "user": {
                    "id": user.id,
                    "nom": user.nom,
                    "email": user.email
                }
            })

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# =============================
# 🔹 Liste + Création Hôtels
# =============================
class HotelListCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        hotels = Hotel.objects.all()
        serializer = HotelSerializer(hotels, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = HotelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =============================
# 🔹 Détail + Update + Delete Hôtels
# =============================
class HotelDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Hotel.objects.get(pk=pk)
        except Hotel.DoesNotExist:
            return None

    def get(self, request, pk):
        hotel = self.get_object(pk)
        if not hotel:
            return Response({"error": "Hôtel introuvable"}, status=status.HTTP_404_NOT_FOUND)

        serializer = HotelSerializer(hotel)
        return Response(serializer.data)

    def put(self, request, pk):
        hotel = self.get_object(pk)
        if not hotel:
            return Response({"error": "Hôtel introuvable"}, status=status.HTTP_404_NOT_FOUND)

        serializer = HotelSerializer(hotel, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        hotel = self.get_object(pk)
        if not hotel:
            return Response({"error": "Hôtel introuvable"}, status=status.HTTP_404_NOT_FOUND)

        hotel.delete()
        return Response({"message": "Hôtel supprimé"}, status=status.HTTP_204_NO_CONTENT)
