import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function MyAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Learner
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}