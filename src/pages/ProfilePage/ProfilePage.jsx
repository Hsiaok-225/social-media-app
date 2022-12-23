import { Box, useMediaQuery } from "@mui/material";
import Navbar from "components/Navbar";
import FriendListWidget from "components/widgets/FriendListWidget";
import MyPostWidget from "components/widgets/MyPostWidget";
import PostsWidget from "components/widgets/PostsWidget";
import UserWidget from "components/widgets/UserWidget";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "Web_API";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const { token } = useSelector((store) => store.auth);
  const { userId } = useParams();

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = () => {
    fetch(`${BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user?.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
}
