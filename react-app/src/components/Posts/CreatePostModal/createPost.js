import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "../index.css";
import { createPostThunk } from "../../../store/posts";

const CreatePostForm = ({setShowModal}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const {userId, channelId} = useParams();

  const [postTitle, setPostTitle] = useState("");
  const [postPicture, setPostPicture] = useState("");
  const [errors, setErrors] = useState([])
  const [img_src, setImg] = useState(null);

  const newPostTitle = (e) => setPostTitle(e.target.value);
  const newPostPicture = (e) => setPostPicture(e.target.value);
  useEffect(() => {
    const validationErrors = []

    if (postTitle.length === 0) validationErrors.push("Post Title required")
    // if (postPicture.length === 0) validationErrors.push("Picture required")
    if (postTitle.length > 50) validationErrors.push('Post Title must be less than 50 characters')
    // if (postPicture.length > 750) validationErrors.push('Picture must be less than 750 characters')
    // if (!postPicture.match(/\.(jpeg|jpg|gif|png)$/) || !postPicture.includes("https://")) validationErrors.push('Invalid Img URL')


    setErrors(validationErrors)
  }, [postTitle, postPicture])


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("user_id", sessionUser.id);
    formData.append("channel_id", +channelId);
    formData.append("post_title", postTitle);
    formData.append("img_src", img_src);

    console.log("formdata:", formData)
    const results = dispatch(createPostThunk(formData))
    console.log(results)

    // const newPost = {
    //   user_id: sessionUser.id,
    //   channel_id: +channelId,
    //   post_title: postTitle,
    //   // post_picture: postPicture,
    //   img_src: img_src

    // };
    // const results = dispatch(createPostThunk(newPost))
    // console.log('results:', results)
    // setPostTitle("")
    // setPostPicture("")
    // setShowModal(false)
  // };


    if (results === 'Success'){
        // if(userId){
        //     dispatch(getUserPosts(userId))
        // }
        // setImageLoading(false)
        setShowModal(false)
    }else{
        const data = results.json()
        setErrors([data.errors])
    }

}

const updateImage = (e) => {
  const file = e.target.files[0];
  setImg(file);
}


    // const newPost = {
    //   user_id: sessionUser.id,
    //   channel_id: +channelId,
    //   post_title: postTitle,
    //   post_picture: postPicture,
    //   img_src: img_src

    // };
    // dispatch(createPostThunk(newPost))
    // setPostTitle("")
    // setPostPicture("")
    // setShowModal(false)
  // };

  return (
    <div className="createPostFormDiv">
      <form className="createPostForm" onSubmit={handleSubmit}>
      {/* <ul className="errors">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul> */}
      <div className="formLabelInputDiv">
        <label htmlFor="postTitle">Post Title: </label>
        <input
          type="text"
          name="postTitle"
          value={postTitle}
          onChange={newPostTitle}
          required
        />
        </div>

        <div className="formLabelInputDiv">
        {/* <label htmlFor="postPicture">Picture: </label>
        <input
          type="text"
          name="postPicture"
          value={postPicture}
          onChange={newPostPicture}
          required
        /> */}
          <label htmlFor='chooseFileInput' className='choose-file-button'>Picture Upload</label>
        <input
          type='file'
          id='chooseFileInput'
          accept='image/*'
          name='img_src'
          onChange={updateImage}
          // hidden='hidden'
        ></input>
        </div>

        <button className="formMainButton" type="submit"  disabled={errors.length}>
          Create Post
        </button>

{errors.length > 0 && (

  <ul className="errors">
        {errors.map((error) => (
          <li className="errorLi" key={error}>* {error}</li>
          ))}
      </ul>
          )}
      </form>
    </div>
  );
};


export default CreatePostForm;
