import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "redux/reducers/authSlice";
import PostWidget from "./PostWidget";

export default function PostsWidget({ userId, isProfile = false }) {
  const dispatch = useDispatch();
  const { posts, token } = useSelector((store) => store.auth);

  const getPosts = async () => {
    await fetch("http://localhost:5001/posts", {
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
    await fetch(`http://localhost:5001/posts/${userId}/posts`, {
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
  }, []);

  return (
    <>
      {posts.map((post) => (
        <PostWidget key={post._id} {...post} />
      ))}
    </>
  );
}
