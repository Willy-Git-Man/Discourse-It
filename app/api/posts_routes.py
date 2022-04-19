from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models.posts import Post
from app.forms.post_form import PostForm
from app.models.db import db


from app.aws_s3 import (upload_file_to_s3, allowed_file, get_unique_filename)


post_routes = Blueprint('posts', __name__)
# d
@post_routes.route('/<int:id>')
@login_required
def posts(id):
  posts = Post.query.filter(Post.channel_id == id).all()
  return {'posts': [post.to_dict() for post in posts]}


# @post_routes.route('/', methods=["POST"])
# @login_required
# def create_post():
#   form = PostForm()
#   form['csrf_token'].data = request.cookies['csrf_token']
#   if form.validate_on_submit():
#     post = Post(
#       channel_id = form.data['channel_id'],
#       user_id = form.data['user_id'],
#       post_title = form.data['post_title'],
#       post_picture = form.data['post_picture']
#     )
#     db.session.add(post)
#     db.session.commit()
#     return post.to_dict()

@post_routes.route('/', methods=["POST"])
@login_required
def create_post():
  if "post_picture" not in request.files:
        print("@@@@@@",request.files["post_picture"])

        return {"errors": "image required"}, 400

  user_id = request.form["user_id"]
  channel_id = request.form["channel_id"]
  post_title = request.form["post_title"]
  img_src = request.files["post_picture"]
  print('img src', request.files)
  print('post', channel_id,user_id,post_title, img_src)


  if not allowed_file(img_src.filename):
        return {"errors": "file type not permitted"}, 400

  img_src.filename = get_unique_filename(img_src.filename)

  upload = upload_file_to_s3(img_src)

  if "url" not in upload:
      print('Vern is helping me do AWS', upload)

      return upload, 400

  image = upload['url']

  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    post = Post(
      channel_id = channel_id,
      user_id = user_id,
      post_title = post_title,
      post_picture = image
    )
    db.session.add(post)
    db.session.commit()
    return post.to_dict()


@post_routes.route('/<int:id>', methods=["DELETE"])
def delete_channel(id):
  post = Post.query.get(id)
  db.session.delete(post)
  db.session.commit()
  return post.to_dict()


@post_routes.route('/<int:id>', methods=["POST"])
def edit_post(id):
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  post = Post.query.get(id)
  post.post_title = form.post_title.data
  post.post_picture = form.post_picture.data


  print("post . post picture:", post.post_picture)

  db.session.commit()
  return post.to_dict()
