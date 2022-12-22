import { Box, useMediaQuery } from "@mui/material";
import Navbar from "components/Navbar";
import AdvertWidet from "components/widgets/AdvertWidet";
import FriendListWidget from "components/widgets/FriendListWidget";
import MyPostWidget from "components/widgets/MyPostWidget";
import PostsWidget from "components/widgets/PostsWidget";
import UserWidget from "components/widgets/UserWidget";
import { useSelector } from "react-redux";

export default function HomePage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((store) => store.auth.user);
  return (
    <Box>
      <Navbar />
      <Box
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap=".5rem"
        justifyContent="space-between"
      >
        {/* USER INFO */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        {/* POST AND NEWS FEED */}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>

        {/* FRIENDLIST AND AD */}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidet />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
