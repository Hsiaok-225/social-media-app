import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "redux/reducers/authSlice";
import { BASE_URL } from "Web_API";
import PostWidget from "./PostWidget";

export default function PostsWidget({ userId, isProfile = false }) {
  const dispatch = useDispatch();
  const { posts, token } = useSelector((store) => store.auth);

  const getPosts = async () => {
    await fetch(`${BASE_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((posts) => {
        dispatch(setPosts({ posts }));
      });
  };

  const getUserPosts = async () => {
    await fetch(`${BASE_URL}/posts/${userId}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((posts) => {
        dispatch(setPosts({ posts }));
      });
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [userId]);

  return (
    <>
      {posts?.map((post) => (
        <PostWidget key={post._id} {...post} />
      ))}
    </>
  );
}
