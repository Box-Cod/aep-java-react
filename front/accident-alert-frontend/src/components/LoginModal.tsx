import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  // Typography,
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function LoginModal({ open, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "teste@gmail.com" && password === "1234") {
      setError("");
      onLoginSuccess();
      onClose();
    } else {
      setError("Email ou senha inválidos.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            fullWidth
            required
          />

          <Box mt={2}>
            <Button type="submit" variant="contained" fullWidth>
              Entrar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
