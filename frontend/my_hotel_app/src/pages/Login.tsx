import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Sauvegarde token dans localStorage
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);

        // Redirige vers le dashboard
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
