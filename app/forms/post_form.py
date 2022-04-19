from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError


class PostForm(FlaskForm):
  user_id = IntegerField("user_id", validators=[DataRequired()])
  channel_id = IntegerField("channel_id", validators=[DataRequired()])
  post_title = StringField("post_title", validators=[DataRequired()])
  # post_picture = StringField("post_picture")
