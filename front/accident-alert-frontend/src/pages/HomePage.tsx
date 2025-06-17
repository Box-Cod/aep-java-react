import { useState } from "react";
import type { Accident } from "../api/accidentService";
import AccidentCarousel from "../components/AccidentCarousel";
import AccidentList from "../components/AccidentList";
import AccidentDetailsModal from "../components/AccidentDetailsModal";
import AccidentFormModal from "../components/AccidentFormModal";

export default function HomePage() {
  const [selected, setSelected] = useState<Accident | undefined>();
  const [openForm, setOpenForm] = useState(false);

  // Função para lidar com o sucesso ao salvar o acidente
  const handleSuccess = () => {
    // Exemplo: Você pode atualizar algum estado ou realizar alguma ação após o sucesso
    setOpenForm(false);  // Fechar o modal após o sucesso
  };

  return (
    <>
      <AccidentCarousel />
      <AccidentList onSelect={setSelected} onCreate={() => setOpenForm(true)} />
      <AccidentDetailsModal open={!!selected} accident={selected} onClose={() => setSelected(undefined)} />
      <AccidentFormModal
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSuccess={handleSuccess}  // Agora passando a função handleSuccess
      />
    </>
  );
}
