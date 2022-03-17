const GET_ALL_POSTS = "posts/GET_ALL_POSTS";
const POST_POSTS = "posts/POST_POSTS";
const DELETE_POSTS = "posts/DELETE_POSTS";
const UPDATE_POSTS = "posts/UPDATE_POSTS";

const getAllPosts = (post) => ({
  type: GET_ALL_POSTS,
  post
});

const createPost = (post) => ({
  type: POST_POSTS,
  post
});

const deletePost = (post) => ({
  type: DELETE_POSTS,
  post
})

const updateUpdate = (post) => ({
  type: UPDATE_POSTS,
  post
})
