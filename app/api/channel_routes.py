from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models.channel import Channel
from app.forms.channel_form import ChannelForm
from app.models.db import db


channel_routes = Blueprint('channels', __name__)

@channel_routes.route('/')
@login_required
def channels():
  channels = Channel.query.all()
  return {'channels': [channel.to_dict() for channel in channels]}


@channel_routes.route('/', methods=["POST"])
@login_required
def create_channel():
  form = ChannelForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    channel = Channel(
      user_id = form.data['user_id'],
      channel_name = form.data['channel_name'],
      channel_picture = form.data["channel_picture"]
    )
    db.session.add(channel)
    db.session.commit()
    return channel.to_dict()


@channel_routes.route('/<int:id>', methods=["DELETE"])
def delete_channel(id):
  print('idRoute:', id)
  channel = Channel.query.get(id)
  db.session.delete(channel)
  db.session.commit()
  return channel.to_dict()


@channel_routes.route('/<int:id>', methods=["POST"])
def edit_channel(id):
  form = ChannelForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  channel = Channel.query.get(id)
  channel.channel_name = form.channel_name.data
  channel.channel_picture = form.channel_picture.data

  db.session.commit()
  return channel.to_dict()
