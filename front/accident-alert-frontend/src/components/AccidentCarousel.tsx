// import { useEffect, useState } from "react";
// import { getLastAccidents } from "../api/accidentService";
// import type { Accident } from "../api/accidentService";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   Stack,
//   Grid,
// } from "@mui/material";
// import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

// interface AccidentCarouselProps {
//   refresh?: number;
// }

// export default function AccidentCarousel({ refresh = 0 }: AccidentCarouselProps) {
//   const [items, setItems] = useState<Accident[]>([]);
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     getLastAccidents().then(({ data }) => setItems(data));
//     setIndex(0);
//   }, [refresh]);

//   if (!items.length) return null;

//   const itemsPerPage = 4; // Alterado para 4 cards
//   const totalPages = Math.ceil(items.length / itemsPerPage);

//   const clampIndex = (newIndex: number) => {
//     if (newIndex < 0) return 0;
//     if (newIndex >= totalPages) return totalPages - 1;
//     return newIndex;
//   };

//   const startIndex = index * itemsPerPage;
//   const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//       gap={4} // espaçamento maior entre o título e o carrossel
//       mb={6} // mais margem embaixo do carrossel
//       px={2} // padding horizontal para evitar corte
//     >
//       {/* Aqui imagino que o título Home esteja neste componente pai, se não, coloque o título aqui antes do Stack */}

//       <Stack
//         direction="row"
//         spacing={2} // espaço maior entre botões e carrossel
//         alignItems="center"
//         justifyContent="center"
//         width="100%"
//       >
//         <IconButton
//           onClick={() => setIndex((prev) => clampIndex(prev - 1))}
//           disabled={index === 0}
//           sx={{ flexShrink: 0 }}
//         >
//           <ArrowBackIos />
//         </IconButton>

//         <Grid
//           container
//           spacing={3} // espaçamento entre as cards
//           justifyContent="center"
//           flexWrap="nowrap"
//           sx={{
//             overflow: "hidden",
//             paddingBottom: 2, // para evitar corte do contorno inferior da card
//           }}
//         >
//           {currentItems.map((it) => (
//             <Grid
//               key={it.id}
//               sx={{
//                 minWidth: 260,
//                 maxWidth: 280,
//                 paddingBottom: 1, // espaçamento inferior para não cortar borda
//               }}
//             >
//               <Card
//                 sx={{
//                   borderRadius: 2,
//                   border: "2px solid gray",
//                   height: "100%",
//                   boxSizing: "border-box",
//                   paddingBottom: "8px", // dá um espaço extra dentro para evitar corte
//                 }}
//                 elevation={3}
//               >
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>
//                     Título: {it.title}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" gutterBottom>
//                     Data e Hora: {new Date(it.datetime).toLocaleString()}
//                   </Typography>
//                   <Typography variant="body1" gutterBottom>
//                     Localização: {it.location}
//                   </Typography>
//                   <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
//                     Descrição: {it.description}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         <IconButton
//           onClick={() => setIndex((prev) => clampIndex(prev + 1))}
//           disabled={index >= totalPages - 1}
//           sx={{ flexShrink: 0 }}
//         >
//           <ArrowForwardIos />
//         </IconButton>
//       </Stack>
//     </Box>
//   );
// }

import { useEffect, useState } from "react";
import { getLastAccidents } from "../api/accidentService";
import type { Accident } from "../api/accidentService";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Grid,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

interface AccidentCarouselProps {
  refresh?: number;
}

export default function AccidentCarousel({ refresh = 0 }: AccidentCarouselProps) {
  const [items, setItems] = useState<Accident[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getLastAccidents().then(({ data }) => setItems(data));
    setIndex(0);
  }, [refresh]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const clampIndex = (newIndex: number) => {
    if (newIndex < 0) return 0;
    if (newIndex >= totalPages) return totalPages - 1;
    return newIndex;
  };

  const startIndex = index * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  if (items.length === 0) {
    return (
      <Box textAlign="center" my={4}>
        <Typography variant="h6" color="textSecondary">
          Nenhum acidente reportado.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={4}
      mb={6}
      px={2}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <IconButton
          onClick={() => setIndex((prev) => clampIndex(prev - 1))}
          disabled={index === 0}
          sx={{ flexShrink: 0 }}
        >
          <ArrowBackIos />
        </IconButton>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          flexWrap="nowrap"
          sx={{
            overflow: "hidden",
            paddingBottom: 2,
          }}
        >
          {currentItems.map((it) => (
            <Grid
              key={it.id}
              sx={{
                minWidth: 260,
                maxWidth: 280,
                paddingBottom: 1,
              }}
            >
              <Card
                sx={{
                  borderRadius: 2,
                  border: "2px solid gray",
                  height: "100%",
                  boxSizing: "border-box",
                  paddingBottom: "8px",
                }}
                elevation={3}
              >
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <IconButton
          onClick={() => setIndex((prev) => clampIndex(prev + 1))}
          disabled={index >= totalPages - 1}
          sx={{ flexShrink: 0 }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
    </Box>
  );
}
