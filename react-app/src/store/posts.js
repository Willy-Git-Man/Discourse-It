const GET_ALL_POSTS = "posts/GET_ALL_POSTS";
const POST_POSTS = "posts/POST_POSTS";
const DELETE_POSTS = "posts/DELETE_POSTS";
const UPDATE_POSTS = "posts/UPDATE_POSTS";

const getAllPosts = (post) => ({
  type: GET_ALL_POSTS,
  post,
});

const createPost = (post) => ({
  type: POST_POSTS,
  post,
});

const deletePost = (post) => ({
  type: DELETE_POSTS,
  post,
});

const updateUpdate = (post) => ({
  type: UPDATE_POSTS,
  post,
});

export const getAllPostsThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${id}`);

  if (response.ok) {
    const postRes = await response.json();
    console.log("response:", postRes);
    dispatch(getAllPosts(postRes));
  }
  return response;
};

const initialState = { posts: {} };

const postsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_ALL_POSTS:
      newState = { ...state };
      action.post.posts.forEach((pos) => newState.channels[pos.id] = pos);
      return newState;

    default:
      return state;
  }
};

export default postsReducer;
