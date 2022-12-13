import { Box, Container, Paper } from "@mui/material";
import { Link } from 'react-router-dom';
import { MyAppBar } from "../../components/MyAppBar";

export function MainPage() {
  return (
    <Container maxWidth = "sm">
      <MyAppBar/>
      <Box sx = {{ my: 4 }}>
        <Paper sx = {{ p: 1 }}>
          <Link to = '/dictionaries/list'>Dictionaries</Link>
          <Link to = '/words/new'>New word</Link>
        </Paper>
      </Box>
    </Container>
  );
}
