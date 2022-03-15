from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError


class ChannelForm(FlaskForm):
  user_id = IntegerField("user_id", validators=[DataRequired()])
  channel_name = StringField("channel_name", validators=[DataRequired()])
  channel_picture = StringField("channel_picture", validators=[DataRequired()])
