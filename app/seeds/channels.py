from app.models.channel import db, Channel

def seed_channels():
  test = Channel(
    id = 1, user_id = 1, channel_name = "testChannel", channel_picture="https://m.media-amazon.com/images/I/81aCJakI4DL._AC_SL1500_.jpg"
  )
  test2 = Channel(
    id = 2, user_id = 2, channel_name = "testChannel2", channel_picture="https://m.media-amazon.com/images/I/81aCJakI4DL._AC_SL1500_.jpg"
  )
  test3 = Channel(
    id = 3, user_id = 3, channel_name = "testChannel3", channel_picture="https://m.media-amazon.com/images/I/81aCJakI4DL._AC_SL1500_.jpg"
  )


  db.session.add(test)
  db.session.add(test2)
  db.session.add(test3)


  db.session.commit()

def undo_channels():
  db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
  db.session.commit()
