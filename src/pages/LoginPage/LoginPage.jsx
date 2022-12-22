import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Form from "components/Form";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  });
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Hellopedia
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreen ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography>
          Welcome to Hellopedia, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
}
