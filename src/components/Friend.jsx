import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "redux/reducers/authSlice";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

export default function Friend({ friendId, name, subtitle, userPicturePath }) {
  const { user, token } = useSelector((store) => store.auth);
  const { _id } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = user.friends.find((friend) => friend._id === friendId);

  const handlePatchFriends = () => {
    fetch(`http://localhost:5001/users/${_id}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        dispatch(setFriends({ friends: data }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <FlexBetween>
      {/* PIC, NAME, LOCATION */}
      <FlexBetween gap="1rem">
        <UserImage picturePath={userPicturePath} />
        <Box onClick={() => navigate(`/profile/${friendId}`)}>
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      {/* BUTTON */}
      <IconButton
        onClick={handlePatchFriends}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
}
