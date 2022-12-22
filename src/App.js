import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import RequireAuth from "components/RequireAuth";
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import ProfilePage from "pages/ProfilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { themeSettings } from "theme";

function App() {
  const mode = useSelector((store) => store.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* Reset CSS */}
        <CssBaseline />
        <Routes>
          <Route index element={<LoginPage />} />

          {/* PRIVATE ROUTES */}
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
