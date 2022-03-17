from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models.posts import Post
from app.forms.post_form import PostForm
from app.models.db import db


post_routes = Blueprint('posts', __name__)

@post_routes.route('/<int:id>')
@login_required
def posts(id):
  posts = Post.query.filter(Post.channel_id == id).all()
  print("@@@@", posts)
  return {'channels': [post.to_dict() for post in posts]}
