from app.models.channel import db, Channel

def seed_channels():
  test = Channel(
    id = 1, user_id = 1, channel_name = "testChannel", channel_picture=""
  )


  db.session.add(test)

  db.session.commit()
