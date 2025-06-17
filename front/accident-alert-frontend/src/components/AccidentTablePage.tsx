// src/pages/AccidentTablePage.tsx
import { useState } from "react";
import { Box, Button } from "@mui/material";
import AccidentList from "../components/AccidentList";
import AccidentFormModal from "../components/AccidentFormModal";
import { deleteAccident } from "../api/accidentService"; // Importando as funções
import type { Accident } from "../api/accidentService";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [selectedAccident, setSelectedAccident] = useState<Accident | null>(null);

  const handleSuccess = () => setRefresh((r) => r + 1);

  const handleSelect = (accident: Accident) => {
    setSelectedAccident(accident);
    setOpenModal(true);
  };

  const handleDelete = (accidentId: number) => {
    deleteAccident(accidentId);
    setRefresh((r) => r + 1);
  };

  const handleCreate = () => {
    setSelectedAccident(null);
    setOpenModal(true);
  };

  return (
    <Box p={4}>
      <AccidentList
        // onSelect={handleSelect}
        // onCreate={handleCreate}
        // onDelete={handleDelete}
        refresh={refresh}
      />

      <AccidentFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleSuccess}
        accident={selectedAccident} // Passando o acidente para o modal
      />

      <Box display="flex" justifyContent="center" mt={3}>
        <Button variant="contained" onClick={handleCreate}>
          + Reportar acidente
        </Button>
      </Box>
    </Box>
  );
}

