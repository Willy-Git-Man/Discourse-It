from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models.posts import Post
from app.forms.post_form import PostForm
from app.models.db import db


post_routes = Blueprint('posts', __name__)
# d
@post_routes.route('/<int:id>')
@login_required
def posts(id):
  posts = Post.query.filter(Post.channel_id == id).all()
  print("@@@@", posts)
  return {'channels': [post.to_dict() for post in posts]}


@post_routes.route('/<int:id>')
@login_required
def create_post():
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    post = Post(
      channel_id = form.data['channel_id'],
      user_id = form.data['user_id'],
      post_title = form.data['post_title'],
      post_picture = form.data['post_picture']
    )
    db.session.add(post)
    db.session.commit()
    return post.to_dict()
