import { Dialog, DialogTitle, DialogContent, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Accident } from "../api/accidentService";

export default function AccidentDetailsModal({ open, onClose, accident }: {
  open: boolean;
  onClose: () => void;
  accident?: Accident;
}) {
  if (!accident) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {accident.title}
        <IconButton sx={{ position: "absolute", right: 8, top: 8 }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <img src={accident.photoUrl} alt={accident.title} style={{ width: "100%", marginBottom: 16 }} />
        <Typography variant="body2"><strong>Local:</strong> {accident.location}</Typography>
        <Typography variant="body2"><strong>Data & hora:</strong> {new Date(accident.datetime).toLocaleString()}</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>{accident.description}</Typography>
      </DialogContent>
    </Dialog>
  );
}
