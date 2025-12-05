import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Hotel {
  id: number;
  nom: string;
  email: string;
  adresse: string;
  telephone: string;
  prix_par_nuit: string;
  devise: string;
  photo?: string;
}

export default function Dashboard() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchHotels = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("https://gestion-hotel-zmkv.onrender.com/api/hotels/", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setHotels(data);
      } else {
        setError("Impossible de récupérer les hôtels.");
      }
    } catch (err) {
      setError("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-page" style={{ padding: "2rem", fontFamily: "'Geist', sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        <h1>Liste des Hôtels</h1>
        <button onClick={handleLogout} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>Déconnexion</button>
      </header>

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "1rem" }}>
        {hotels.map((hotel) => (
          <div key={hotel.id} style={{ border: "1px solid #d1d5db", borderRadius: "0.75rem", overflow: "hidden", background: "#f9fafb" }}>
            {hotel.photo && (
              <img src={hotel.photo} alt={hotel.nom} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            )}
            <div style={{ padding: "1rem" }}>
              <h2 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>{hotel.nom}</h2>
              <p>{hotel.adresse}</p>
              <p>{hotel.email}</p>
              <p>{hotel.telephone}</p>
              <p>
                {hotel.prix_par_nuit} {hotel.devise}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
