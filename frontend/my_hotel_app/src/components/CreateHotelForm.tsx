import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateHotelForm.css";

interface CreateHotelFormProps {
    onHotelCreated: (hotel: any) => void;
    onClose: () => void;
}

const CreateHotelForm: React.FC<CreateHotelFormProps> = ({ onHotelCreated, onClose }) => {
    const [hotelData, setHotelData] = useState({
        nom: "",
        email: "",
        adresse: "",
        telephone: "",
        prix_par_nuit: "",
        devise: "XOF",
        photo: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const token = localStorage.getItem("access");
        console.log("Access token:", token);
        if (!token) {
            navigate("/login");
            return;
        }

        const payload = {
            ...hotelData,
            prix_par_nuit: parseFloat(hotelData.prix_par_nuit),
        };

        try {
            const response = await fetch("http://localhost:8000/api/hotels/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const createdHotel = await response.json();
                onHotelCreated(createdHotel);
                onClose();
                setHotelData({
                    nom: "",
                    email: "",
                    adresse: "",
                    telephone: "",
                    prix_par_nuit: "",
                    devise: "XOF",
                    photo: "",
                });
            } else {
                const err = await response.json();
                setError(JSON.stringify(err)); // affichage complet de l'erreur
            }
        } catch {
            setError("Erreur serveur");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Créer un nouvel hôtel</h3>
                {error && <p className="error">{error}</p>}

                <input type="text" placeholder="Nom" value={hotelData.nom} onChange={e => setHotelData({...hotelData, nom: e.target.value})} />
                <input type="email" placeholder="Email" value={hotelData.email} onChange={e => setHotelData({...hotelData, email: e.target.value})} />
                <input type="text" placeholder="Adresse" value={hotelData.adresse} onChange={e => setHotelData({...hotelData, adresse: e.target.value})} />
                <input type="text" placeholder="Téléphone" value={hotelData.telephone} onChange={e => setHotelData({...hotelData, telephone: e.target.value})} />
                <input type="text" placeholder="Prix par nuit" value={hotelData.prix_par_nuit} onChange={e => setHotelData({...hotelData, prix_par_nuit: e.target.value})} />
                
                <select value={hotelData.devise} onChange={e => setHotelData({...hotelData, devise: e.target.value})}>
                    <option value="XOF">FCFA</option>
                    <option value="EUR">Euro</option>
                    <option value="USD">Dollar</option>
                </select>

                <input type="text" placeholder="URL de la photo" value={hotelData.photo} onChange={e => setHotelData({...hotelData, photo: e.target.value})} />

                <div className="modal-buttons">
                    <button className="btn-create" onClick={handleSubmit}>Créer</button>
                    <button className="btn-cancel" onClick={onClose}>Annuler</button>
                </div>
            </div>
        </div>
    );
};

export default CreateHotelForm;
