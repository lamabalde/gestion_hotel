import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import CreateHotelForm from "../components/CreateHotelForm";
import "../styles/App.css";

interface HotelData {
    id: number;
    nom: string;
    adresse: string;
    prix_par_nuit: string;
    devise: string;
    photo_url: string | null;
}

const HotelsListPage: React.FC = () => {
    const [hotels, setHotels] = useState<HotelData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const fetchHotels = async () => {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("access");
        if (!token) { navigate("/login"); return; }

        try {
            const response = await fetch("http://localhost:8000/api/hotels/", {
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
            });
            if (response.status === 401) { navigate("/login"); return; }
            const data = await response.json();
            if (!response.ok) setError("Erreur lors du chargement des hôtels");
            else setHotels(data);
        } catch {
            setError("Erreur serveur");
        }
        setLoading(false);
    };

    useEffect(() => { fetchHotels(); }, []);

    return (
        <DashboardLayout>
            <div className="hotels-list-content">
                <div className="top-section">
                    <div className="list-header">
                        <h1 className="main-title">Liste des hôtels</h1>
                        <h2 className="count">Hôtels <strong>{hotels.length}</strong></h2>
                    </div>
                    <button className="add-hotel-button" onClick={() => setShowForm(true)}>
                        + Créer un nouvel hôtel
                    </button>
                </div>

                {showForm && (
                    <CreateHotelForm
                        onHotelCreated={(hotel) => setHotels([...hotels, hotel])}
                        onClose={() => setShowForm(false)}
                    />
                )}

                {loading && <p>Chargement...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="hotels-grid">
                    {hotels.map((hotel) => (
                        <div key={hotel.id} className="hotel-card">
                            <div className="hotel-image-container" style={{ backgroundImage: `url(${hotel.photo_url})` }} />
                            <div className="hotel-info">
                                <p className="hotel-location">{hotel.adresse}</p>
                                <h3 className="hotel-name">{hotel.nom}</h3>
                                <p className="hotel-price">{hotel.prix_par_nuit}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default HotelsListPage;
