import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

export default function Register() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!acceptTerms) {
      setError("Vous devez accepter les termes et la politique.");
      return;
    }

    try {
      const response = await fetch("https://gestion-hotel-zmkv.onrender.com/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, mot_de_passe: motDePasse }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.detail || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setError("Erreur serveur, veuillez réessayer");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="logo">
          <div className="triangle"></div>
          <span className="logo-text">RED PRODUCT</span>
        </div>

        <h1 className="register-title">Inscrivez-vous en tant que Admin</h1>

        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              placeholder="Entrez votre nom..."
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Entrez votre email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="Votre mot de passe..."
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              Accepter les termes et la politique
            </label>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="btn-register">
            S'inscrire
          </button>
        </form>

        <p className="login-text">
          Déjà un compte ?{" "}
          <Link to="/login" className="link-amber">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
