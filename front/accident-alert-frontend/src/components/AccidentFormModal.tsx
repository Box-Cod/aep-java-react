import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { createAccident, updateAccident } from "../api/accidentService"; // Supondo que você já tenha createAccident
import type { Accident } from "../api/accidentService";

interface AccidentFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  accident: Accident | null;
}

export default function AccidentFormModal({
  open,
  onClose,
  onSuccess,
  accident,
}: AccidentFormModalProps) {
  const [formAccident, setFormAccident] = useState<Accident>({
    id: 0,
    title: "",
    description: "",
    location: "",
    datetime: new Date().toISOString(),
    photoUrl: "",
  });

  useEffect(() => {
    if (open) {
      if (accident) {
        setFormAccident(accident); // Edição: carrega os dados do acidente
      } else {
        // Criação: limpa os campos ao abrir modal
        setFormAccident({
          id: 0,
          title: "",
          description: "",
          location: "",
          datetime: new Date().toISOString(),
          photoUrl: "",
        });
      }
    }
  }, [open, accident]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormAccident({
      ...formAccident,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (accident) {
      await updateAccident(formAccident);  // Se for edição
    } else {
      const formData = new FormData();
      formData.append("title", formAccident.title);
      formData.append("description", formAccident.description);
      formData.append("location", formAccident.location);
      formData.append("datetime", formAccident.datetime);
      formData.append("photoUrl", formAccident.photoUrl); // ou anexe um arquivo real se for o caso

      await createAccident(formData);  // Se for criação
    }
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{accident ? "Editar Acidente" : "Criar Novo Acidente"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Título"
          value={formAccident.title}
          onChange={handleChange}
          name="title"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Local"
          value={formAccident.location}
          onChange={handleChange}
          name="location"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Data e Hora"
          type="datetime-local"
          value={formAccident.datetime.slice(0, 16)}  // Corrigido para funcionar no input datetime-local
          onChange={handleChange}
          name="datetime"
          fullWidth
          margin="normal"
        />
        {/* Campo TextArea para Descrição */}
        <TextField
          label="Descrição"
          value={formAccident.description}
          onChange={handleChange}
          name="description"
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
