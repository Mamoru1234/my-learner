import { Box, Button, Container } from "@mui/material";
import { MyAppBar } from "../../components/MyAppBar";
import { wordsRepository } from "../../store/repositories/words.repository";

function onClick() {
  wordsRepository.insert().then(() => console.log('Insert completed')).catch((e) => console.log(e));
}

export function NewWordPage() {
  return (
    <Container maxWidth = "sm">
      <MyAppBar/>
      <Box sx = {{ my: 4 }}>
        My test word add
        <Button onClick = {onClick}>Add new</Button>
      </Box>
    </Container>
  );
}