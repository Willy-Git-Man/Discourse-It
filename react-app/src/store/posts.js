const GET_ALL_POSTS = "posts/GET_ALL_POSTS";
const CREATE_POSTS = "posts/CREATE_POSTS";
// const DELETE_POSTS = "posts/DELETE_POSTS";
// const UPDATE_POSTS = "posts/UPDATE_POSTS";

const getAllPosts = (post) => ({
  type: GET_ALL_POSTS,
  post,
});

const createPost = (post) => ({
  type: CREATE_POSTS,
  post,
});

// const deletePost = (post) => ({
//   type: DELETE_POSTS,
//   post,
// });

// const updateUpdate = (post) => ({
//   type: UPDATE_POSTS,
//   post,
// });

export const getAllPostsThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/22`);

  if (response.ok) {
    const postRes = await response.json();
    console.log("postRes:", postRes);
    dispatch(getAllPosts(postRes));
  }
  return response;
};


export const createPostThunk = (post) => async(dispatch) => {
  const {user_id, channel_id, post_title, post_picture} = post
  const form = new FormData()
  form.append('user_id', user_id)
  form.append('channel_id', channel_id)
  form.append('post_title', post_title)
  form.append('post_picture', post_picture)

  const response = await fetch("/api/posts/", {
    method: "POST",
    body: form
  })
  if (response.ok) {
    const newPost = await response.json()
    dispatch(createPost(newPost))
    return newPost
  }
}



const initialState = { posts: {} };

const postsReducer = (state = initialState, action) => {
  let newState;
  console.log('action:', action)
  console.log('action post:', action.post)
  // console.log('action post channels:', action.post.channels)



  switch (action.type) {
    case GET_ALL_POSTS:
      newState = { ...state };
      action.post.channels.forEach((pos) => newState.posts[pos.id] = pos);
      return newState;

    case CREATE_POSTS:
      newState = {...state, posts: {...state.posts}}
      newState.posts[action.post.id] = {...action.post}
      return newState

    default:
      return state;
  }
};

export default postsReducer;
