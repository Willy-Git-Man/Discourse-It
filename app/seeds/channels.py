class ChannelForm(FlaskForm):
  user_id = IntegerField("user_id", validators=[DataRequired()])
  channel_name = StringField("channel_name", validators=[DataRequired()])
  channel_picture = StringField("channel_picture", validators=[DataRequired()])
from app.models import db, Channel

def seed_channels():
  test = Channel(
    id = 1, user_id = 1, channel_name = "testChannel", channel_picture=""
  )


  db.session.add(test)

  db.session.commit()
