const GET_ALL_POSTS = "posts/GET_ALL_POSTS";
const CREATE_POSTS = "posts/CREATE_POSTS";
const DELETE_POSTS = "posts/DELETE_POSTS";
const UPDATE_POSTS = "posts/UPDATE_POSTS";

const getAllPosts = (post) => ({
  type: GET_ALL_POSTS,
  post,
});

const createPost = (post) => ({
  type: CREATE_POSTS,
  post,
});

const deletePost = (post) => ({
  type: DELETE_POSTS,
  post,
});

const updatePost = (post) => ({
  type: UPDATE_POSTS,
  post,
});

export const getAllPostsThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${id}`);

  if (response.ok) {
    const postRes = await response.json();
    dispatch(getAllPosts(postRes));
  }
  return response;
};


export const createPostThunk = (post) => async(dispatch) => {
  const {user_id, channel_id, post_title, post_picture} = post
  console.log('post:', post)
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


export const deletePostThunk = (id) => async(dispatch) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const post = await response.json()
    dispatch(deletePost(post))
  }
}


export const updatePostThunk = (updatePostInfo) => async(dispatch) => {
  const {post_title, post_picture, user_id, channel_id, id} = updatePostInfo
  console.log('updatePostInfo:', post_title)
  const form = new FormData()
  form.append('user_id', user_id)
  form.append('channel_id', channel_id)
  form.append('post_title', post_title)
  form.append('post_picture', post_picture)
  const response = await fetch(`/api/posts/${updatePostInfo.id}`, {
    method: "POST",
    // headers: {'Content-Type': 'application/json'},
    body: form
  })
  if (response.ok) {
    const updatedPostRequest = await response.json()
    dispatch(updatePost(updatedPostRequest))
  }
}



const initialState = { posts: {} };

const postsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_ALL_POSTS:
      newState = { ...state };
      action.post.posts.forEach((pos) => newState.posts[pos.id] = pos);
      return newState;

    case CREATE_POSTS:
      newState = {...state, posts: {...state.posts}}
      newState.posts[action.post.id] = {...action.post}
      return newState

    case DELETE_POSTS:
      newState = {...state, posts: {...state.posts}}
      const id = action.post.id
      delete newState.posts[id]
      return newState

    case UPDATE_POSTS:
      newState = {...state, posts: {...state.posts}}
      newState.posts[action.post.id] = {...action.post}
      return newState

    default:
      return state;
  }
};

export default postsReducer;
