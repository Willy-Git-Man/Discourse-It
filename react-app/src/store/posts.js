const GET_ALL_POSTS = "posts/GET_ALL_POSTS";
// const POST_POSTS = "posts/POST_POSTS";
// const DELETE_POSTS = "posts/DELETE_POSTS";
// const UPDATE_POSTS = "posts/UPDATE_POSTS";

const getAllPosts = (post) => ({
  type: GET_ALL_POSTS,
  post,
});

// const createPost = (post) => ({
//   type: POST_POSTS,
//   post,
// });

// const deletePost = (post) => ({
//   type: DELETE_POSTS,
//   post,
// });

// const updateUpdate = (post) => ({
//   type: UPDATE_POSTS,
//   post,
// });

export const getAllPostsThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${1}`);

  if (response.ok) {
    const postRes = await response.json();
    console.log("postRes:", postRes);
    dispatch(getAllPosts(postRes));
  }
  return response;
};

const initialState = { posts: {} };

const postsReducer = (state = initialState, action) => {
  let newState;
  console.log('action:', action)

  switch (action.type) {
    case GET_ALL_POSTS:
      newState = { ...state };
      // action.post.channels.forEach((pos) => newState.channels[pos.id] = pos);
      return newState;

    default:
      return state;
  }
};

export default postsReducer;
