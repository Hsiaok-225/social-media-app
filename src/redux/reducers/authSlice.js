const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent");
      }
    },
    setPost: (state, action) => {
      /* UPDATE SINGLE POST */
      const updatePosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        }
        return post;
      });
      state.posts = updatePosts;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
  },
});

export const { setMode, login, logout, setFriends, setPosts, setPost } =
  authSlice.actions;

export default authSlice.reducer;
