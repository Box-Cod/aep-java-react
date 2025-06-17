import { useEffect, useState } from "react";
import { getLastAccidents } from "../api/accidentService";
import type { Accident } from "../api/accidentService";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Pagination,
} from "@mui/material";

interface AccidentListProps {
  refresh?: number;
  isLoggedIn?: boolean;
  onEdit?: (accident: Accident) => void;
  onDelete?: (id: number) => void;
}

export default function AccidentList({
  refresh = 0,
  isLoggedIn = false,
  onEdit,
  onDelete,
}: AccidentListProps) {
  const [items, setItems] = useState<Accident[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetch = () => getLastAccidents().then(({ data }) => setItems(data));

  useEffect(() => {
    fetch();
  }, [refresh]);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box>
      <Grid container spacing={4} justifyContent="center" px={4}>
        {currentItems.map((it) => (
          <Grid>
            <Card sx={{ borderRadius: 2, border: "2px solid gray", height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Título: {it.title}
                </Typography>

                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Data e Hora: {new Date(it.datetime).toLocaleString()}
                </Typography>

                <Typography variant="body1" gutterBottom>
                  Localização: {it.location}
                </Typography>

                <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                  Descrição: {it.description}
                </Typography>

                {isLoggedIn && (
                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => onEdit && onEdit(it)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => onDelete && onDelete(it.id)}
                    >
                      Deletar
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Paginação */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}
