// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/StatCard";
import "../styles/App.css";

interface StatData {
    id: number;
    icon: React.ReactNode;
    color: string;
    title: string;
    value: number;
    description: string;
}

const DashboardPage: React.FC = () => {
    const [stats, setStats] = useState<StatData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchStats = async () => {
        const token = localStorage.getItem("access");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch("https://lama-projet.onrender.com/api/hotels/", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 401) {
                navigate("/login");
                return;
            }

            const data = await response.json();

            // Exemple : data peut être soit un tableau d'hôtels, soit un objet avec d'autres stats
            const hotelsCount = Array.isArray(data) ? data.length : data.hotels_count || 0;
            const formsCount = data.forms_count || 0;
            const messagesCount = data.messages_count || 0;
            const usersCount = data.users_count || 0;
            const emailsCount = data.emails_count || 0;
            const emmesCount = data.emmes_count || 0;

            setStats([
                {
                    id: 1,
                    icon: "📄",
                    color: "#8A2BE2",
                    title: "Formulaires",
                    value: formsCount,
                    description: "Nombre total de formulaires",
                },
                {
                    id: 2,
                    icon: "💬",
                    color: "#20B2AA",
                    title: "Messages",
                    value: messagesCount,
                    description: "Messages reçus",
                },
                {
                    id: 3,
                    icon: "👥",
                    color: "#FFD700",
                    title: "Utilisateurs",
                    value: usersCount,
                    description: "Total utilisateurs",
                },
                {
                    id: 4,
                    icon: "📧",
                    color: "#8A2BE2",
                    title: "Emails",
                    value: emailsCount,
                    description: "Emails envoyés",
                },
                {
                    id: 5,
                    icon: "🏨",
                    color: "#8A2BE2",
                    title: "Hôtels",
                    value: hotelsCount,
                    description: "Hôtels enregistrés",
                },
                {
                    id: 6,
                    icon: "🚀",
                    color: "#00BFFF",
                    title: "Emmés",
                    value: emmesCount,
                    description: "Statistique personnalisée",
                },
            ]);
        } catch (err) {
            console.error(err);
            setError("Erreur lors du chargement des données");
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <DashboardLayout>
            <div className="dashboard-content">
                <div className="welcome-section">
                    <h2 className="title">Bienvenue sur RED Product</h2>
                    <p className="subtitle">Votre tableau de bord administratif</p>
                </div>

                {loading && <p>Chargement...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="stats-grid">
                    {stats.map((stat) => (
                        <StatCard
                            key={stat.id}
                            icon={stat.icon}
                            color={stat.color}
                            title={stat.title}
                            value={stat.value}
                            description={stat.description}
                        />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardPage;
