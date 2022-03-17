from app.models.posts import db, Post

def seed_posts():
  testPost = Post(
    id = 1, user_id = 1, channel_id="1", post_title = "testChannel", post_picture="https://m.media-amazon.com/images/I/81aCJakI4DL._AC_SL1500_.jpg"
  )
  testPost2 = Post(
    id = 2, user_id = 2, channel_id="1", post_title = "testChannel2", post_picture="https://m.media-amazon.com/images/I/81aCJakI4DL._AC_SL1500_.jpg"
  )
  testPost3 = Post(
    id = 3, user_id = 3, channel_id="1", post_title = "testChannel3", post_picture="https://m.media-amazon.com/images/I/81aCJakI4DL._AC_SL1500_.jpg"
  )


  db.session.add(testPost)
  db.session.add(testPost2)
  db.session.add(testPost3)


  db.session.commit()
