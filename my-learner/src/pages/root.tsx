import { Outlet } from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from "../app/theme";

export function RootPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Outlet/>
    </ThemeProvider>
  );
}