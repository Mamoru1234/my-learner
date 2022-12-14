import { Box, Container, Paper } from "@mui/material";
import { Link } from 'react-router-dom';
import { MyAppBar } from "../../components/MyAppBar";

export function MainPage() {
  return (
    <Container maxWidth = "sm">
      <MyAppBar/>
      <Box sx={{py: 1 }}>
        <Paper sx = {{ p: 1 }}>
          <div>
            <Link to = '/dictionaries/list'>Dictionaries</Link>
          </div>
          <div>
            <Link to = '/words/new'>New word</Link>
          </div>
        </Paper>
      </Box>
    </Container>
  );
}
