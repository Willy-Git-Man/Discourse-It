from app.models.channel import db, Channel

def seed_channels():
  test = Channel(
    id = 1, user_id = 1, channel_name = "testChannel", channel_picture="https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.pngfind.com%2Fpngs%2Fm%2F84-842250_cute-dog-cartoon-png-www-pixshark-com-images.png&imgrefurl=https%3A%2F%2Fwww.pngfind.com%2Fmpng%2FbmoxJm_cute-dog-cartoon-png-www-pixshark-com-images%2F&tbnid=MnkroOWZ82UOJM&vet=12ahUKEwicvLnigMv2AhWOGVkFHaJOA9UQMygOegUIARCDAg..i&docid=76I4CvOeVidzEM&w=840&h=1246&q=dog%20cartoon&ved=2ahUKEwicvLnigMv2AhWOGVkFHaJOA9UQMygOegUIARCDAg"
  )
  test2 = Channel(
    id = 2, user_id = 2, channel_name = "testChannel2", channel_picture="https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.pngfind.com%2Fpngs%2Fm%2F84-842250_cute-dog-cartoon-png-www-pixshark-com-images.png&imgrefurl=https%3A%2F%2Fwww.pngfind.com%2Fmpng%2FbmoxJm_cute-dog-cartoon-png-www-pixshark-com-images%2F&tbnid=MnkroOWZ82UOJM&vet=12ahUKEwicvLnigMv2AhWOGVkFHaJOA9UQMygOegUIARCDAg..i&docid=76I4CvOeVidzEM&w=840&h=1246&q=dog%20cartoon&ved=2ahUKEwicvLnigMv2AhWOGVkFHaJOA9UQMygOegUIARCDAg"
  )
  test3 = Channel(
    id = 3, user_id = 3, channel_name = "testChannel3", channel_picture="https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.pngfind.com%2Fpngs%2Fm%2F84-842250_cute-dog-cartoon-png-www-pixshark-com-images.png&imgrefurl=https%3A%2F%2Fwww.pngfind.com%2Fmpng%2FbmoxJm_cute-dog-cartoon-png-www-pixshark-com-images%2F&tbnid=MnkroOWZ82UOJM&vet=12ahUKEwicvLnigMv2AhWOGVkFHaJOA9UQMygOegUIARCDAg..i&docid=76I4CvOeVidzEM&w=840&h=1246&q=dog%20cartoon&ved=2ahUKEwicvLnigMv2AhWOGVkFHaJOA9UQMygOegUIARCDAg"
  )


  db.session.add(test)
  db.session.add(test2)
  db.session.add(test3)


  db.session.commit()
