import { Box } from "@mui/material";

export default function UserImage({ picturePath, size = "60px" }) {
  return (
    <Box>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        src={`http://localhost:5001/assets/${picturePath}`}
        alt="user"
      />
    </Box>
  );
}
