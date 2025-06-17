import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AccidentList from "../src/components/AccidentList";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function App() {
  // const handleDelete = (accidentId: number) => {
  //   console.log("Excluir acidente com id:", accidentId);
  // };

  return (
    <BrowserRouter>
      <Routes>
        {/* Redireciona automaticamente de "/" para "/home" */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        <Route path="/home" element={<Home />} />
        <Route
          path="/acidentes"
          element={<AccidentList refresh={0} />}
        />
      </Routes>
    </BrowserRouter>
  );
}