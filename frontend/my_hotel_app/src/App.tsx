// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardPage from "./pages/DashboardPage"; 
import HotelsListPage from "./pages/HotelsListPage"; // Importez la nouvelle page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes d'authentification */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Routes du Tableau de Bord (utilisent DashboardLayout) */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/hotels" element={<HotelsListPage />} /> {/* Nouvelle Route */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;