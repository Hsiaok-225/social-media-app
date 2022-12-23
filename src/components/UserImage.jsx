import { Box } from "@mui/material";
import { BASE_URL } from "Web_API";

export default function UserImage({ picturePath, size = "60px" }) {
  return (
    <Box>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        src={`${BASE_URL}/assets/${picturePath}`}
        alt="user"
      />
    </Box>
  );
}
