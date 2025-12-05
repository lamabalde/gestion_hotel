import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://gestion-hotel-zmkv.onrender.com/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mot_de_passe: motDePasse }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.detail || "Identifiants incorrects");
      }
    } catch (err) {
      setError("Erreur de connexion, veuillez réessayer");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo">
          <div className="triangle"></div>
          <span className="logo-text">RED PRODUCT</span>
        </div>

        <h1 className="login-title">Connectez-vous en tant que Admin</h1>

        <form className="login-form" onSubmit={handleLogin}>
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
              <input type="checkbox" />
              Gardez-moi connecté
            </label>
            <Link to="/forgot-password" className="link-amber">
              Mot de passe oublié ?
            </Link>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="btn-login">
            Se connecter
          </button>
        </form>

        <p className="register-text">
          Pas encore de compte ?{" "}
          <Link to="/register" className="link-amber">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
