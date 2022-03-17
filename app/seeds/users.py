from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo-lition', email='demo@aa.io', password='password', profile_picture="https://m.media-amazon.com/images/I/81aCJakI4DL._AC_SL1500_.jpg")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', profile_picture="https://m.media-amazon.com/images/I/81aCJakI4DL._AC_SL1500_.jpg")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', profile_picture="https://m.media-amazon.com/images/I/81aCJakI4DL._AC_SL1500_.jpg")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entitiesf
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
