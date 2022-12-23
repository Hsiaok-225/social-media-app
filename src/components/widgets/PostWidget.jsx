import {
  ChatBubbleOutlineOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import Friend from "components/Friend";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "redux/reducers/authSlice";
import { BASE_URL } from "Web_API";

export default function PostWidget(props) {
  const {
    _id,
    userId,
    firstName,
    lastName,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  } = props || {};

  const [isComments, setIsComments] = useState(false);
  const { token } = useSelector((store) => store.auth);
  const user = useSelector((store) => store.auth.user);
  const loggedUserId = user._id;
  const dispatch = useDispatch();

  const { palette } = useTheme();
  const main = palette.primary.main;
  const primary = palette.primary.main;
  const likeCount = Object.keys(likes).length;
  const isLike = Boolean(likes[loggedUserId]);

  const handlePatchLike = () => {
    // _id = postId
    // userId = loggedUserId
    fetch(`${BASE_URL}/posts/${_id}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedUserId,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        dispatch(setPost({ post: data }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={userId}
        name={`${firstName} ${lastName}`}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          src={`${BASE_URL}/assets/${picturePath}`}
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          alt="post"
        />
      )}
      {/* LIKE, COMMENTS & SHARE */}
      <FlexBetween mt="0.25rem">
        {/* LIKE, COMMENTS */}
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={handlePatchLike}>
              {isLike ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {/* SHARE */}
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {/* COMMENTS */}
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={i}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
}
