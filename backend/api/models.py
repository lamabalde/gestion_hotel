from django.db import models
from django.contrib.auth.hashers import make_password, check_password


class User(models.Model):
    nom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    mot_de_passe = models.CharField(max_length=255)

    def save(self, *args, **kwargs):
        # Hash password si ce n’est pas déjà hashé
        if not self.mot_de_passe.startswith('pbkdf2'):
            self.mot_de_passe = make_password(self.mot_de_passe)
        super().save(*args, **kwargs)

    def verify_password(self, raw_password):
        return check_password(raw_password, self.mot_de_passe)

    def __str__(self):
        return self.nom


class Hotel(models.Model):
    nom = models.CharField(max_length=150)
    email = models.EmailField()
    adresse = models.CharField(max_length=255)
    telephone = models.CharField(max_length=20)
    prix_par_nuit = models.DecimalField(max_digits=10, decimal_places=2)
    devise = models.CharField(max_length=10, choices=[('EUR', 'Euro'), ('USD', 'Dollar')])
    photo = models.ImageField(upload_to="hotels/", null=True, blank=True)

    def __str__(self):
        return self.nom
