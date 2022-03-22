from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo-lition', email='demo@aa.io', password='password', profile_picture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEaB2pJ385I-RpDVPB1vSFo5sbS5CFEumE5A&usqp=CAU")
    naruto = User(
        username='Naruto', email='naruto@aa.io', password='password', profile_picture="https://cdn.vox-cdn.com/thumbor/AUK49UV2bYCSch-7fxc_IRrUAU0=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23017169/18BR_Naruto_KeyArt.jpg")
    boruto = User(
        username='Boruto', email='boruto@aa.io', password='password', profile_picture="https://m.media-amazon.com/images/M/MV5BMDFjYTc1ODgtNjRlNi00ZDllLTg3ZGYtMjJlYTA0NjBkYWZlXkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_.jpg")

    db.session.add(demo)
    db.session.add(naruto)
    db.session.add(boruto)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entitiesf
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
