from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


# ========================
#  USER MANAGER
# ========================
class UserManager(BaseUserManager):
    def create_user(self, email, nom, mot_de_passe=None):
        """Créer un utilisateur normal"""
        if not email:
            raise ValueError("L'email est obligatoire")

        email = self.normalize_email(email)
        user = self.model(email=email, nom=nom)

        user.set_password(mot_de_passe)  # Hash automatique
        user.save(using=self._db)
        return user

    def create_superuser(self, email, nom, mot_de_passe):
        """Créer un super utilisateur"""
        user = self.create_user(email=email, nom=nom, mot_de_passe=mot_de_passe)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


# ========================
#  CUSTOM USER
# ========================
class User(AbstractBaseUser, PermissionsMixin):
    nom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    # Champs obligatoires pour Django admin
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["nom"]

    def __str__(self):
        return self.nom


# ========================
#  HOTEL MODEL
# ========================
class Hotel(models.Model):
    nom = models.CharField(max_length=150)
    email = models.EmailField()
    adresse = models.CharField(max_length=255)
    telephone = models.CharField(max_length=20)

    prix_par_nuit = models.DecimalField(max_digits=10, decimal_places=2)

    devise = models.CharField(
        max_length=10,
        choices=[
            ('EUR', 'Euro'),
            ('USD', 'Dollar'),
            ('XOF', 'FCFA'),
        ],
        default='XOF'
    )

    photo = models.URLField(max_length=500, blank=True, null=True)

    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom
