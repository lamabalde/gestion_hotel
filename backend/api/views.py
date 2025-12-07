from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, Hotel
from .serializers import UserRegisterSerializer, HotelSerializer


# =============================
# 🔹 REGISTER
# =============================
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Utilisateur créé avec succès",
            "user": {
                "id": user.id,
                "nom": user.nom,
                "email": user.email
            },
            "tokens": {
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            }
        }, status=status.HTTP_201_CREATED)


# =============================
# 🔹 LOGIN (JWT fourni par SimpleJWT)
# =============================
# SimpleJWT fournit déjà TokenObtainPairView pour login
# Tu peux créer un alias pour personnaliser la réponse

class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        # Ajouter user info à la réponse
        try:
            user = User.objects.get(email=request.data.get('email'))
            data = response.data
            data['user'] = {
                "id": user.id,
                "nom": user.nom,
                "email": user.email
            }
            return Response(data)
        except User.DoesNotExist:
            return Response({"error": "Utilisateur introuvable"}, status=status.HTTP_400_BAD_REQUEST)


# =============================
# 🔹 REFRESH TOKEN (SimpleJWT)
# =============================
class RefreshTokenView(TokenRefreshView):
    permission_classes = [AllowAny]


# =============================
# 🔹 CRUD HOTELS
# =============================
class HotelListCreateView(generics.ListCreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsAuthenticated]


class HotelDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsAuthenticated]
