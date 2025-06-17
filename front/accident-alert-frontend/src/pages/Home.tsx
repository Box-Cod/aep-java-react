import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AccidentCarousel from "../components/AccidentCarousel"; // seu carrossel original
import AccidentList from "../components/AccidentList"; // a lista com cards
import AccidentFormModal from "../components/AccidentFormModal";
import LoginModal from "../components/LoginModal";
import type { Accident } from "../api/accidentService";
import { deleteAccident } from "../api/accidentService";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedAccident, setSelectedAccident] = useState<Accident | null>(null);

  const handleSuccess = () => {
    setRefresh((prev) => prev + 1);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    alert("Login realizado com sucesso!");
    setOpenLoginModal(false);
  };

  const handleEdit = (accident: Accident) => {
    setSelectedAccident(accident);
    setOpenModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este acidente?")) {
      deleteAccident(id);
      alert("Acidente excluído com sucesso!");
      setRefresh((prev) => prev + 1);
    }
  };

  const handleModalSuccess = () => {
    setOpenModal(false);
    setSelectedAccident(null);
    setRefresh((prev) => prev + 1);
  };

  const handleCreate = () => {
    setSelectedAccident(null);
    setOpenModal(true);
  };

  return (
    <Box p={10}>
      {/* Botão Login */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        {!isLoggedIn && (
          <Button
            variant="outlined"
            sx={{
              color: "#3dadff",
              borderColor: "#3dadff",
              "&:hover": {
                backgroundColor: "#e6f0ff",
                borderColor: "#3dadff",
              },
            }}
            onClick={() => setOpenLoginModal(true)}
          >
            Login
          </Button>
        )}
        {isLoggedIn && (
          <Typography variant="subtitle1" color="primary" sx={{ mr: 2 }}>
            Bem vindo!
          </Typography>
        )}
      </Box>

      {/* Título */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h4">HOME</Typography>
      </Box>

      {/* Carrossel */}
      <AccidentCarousel refresh={refresh} />

      {/* Botão Reportar (agora logo abaixo do carrossel) */}
      {isLoggedIn && (
        <Box display="flex" justifyContent="center" mt={3} mb={5}>
          <Button
            variant="contained"
            size="large"
            onClick={handleCreate}
            sx={{
              backgroundColor: "#ffc943",
              color: "#000",
              "&:hover": {
                backgroundColor: "#e6b338",
              },
            }}
          >
            + Reportar acidente
          </Button>
        </Box>
      )}

      {/* Lista de acidentes */}
      <AccidentList
        refresh={refresh}
        isLoggedIn={isLoggedIn}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal para criar/editar acidente */}
      <AccidentFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleModalSuccess}
        accident={selectedAccident}
      />

      {/* Modal Login */}
      <LoginModal
        open={openLoginModal}
        onClose={() => setOpenLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </Box>
  );

}
