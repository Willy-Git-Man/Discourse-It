from .db import db



class Channel(db.Model):
  __tablename__ = "channels"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  channel_name = db.Column(db.Text, nullable = False)
  channel_picture = db.Column(db.Text)

  user = db.relationship("User", back_populates = "channels")



  # user = db.relationship("User", back_populates = "channels")


  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "channel_name": self.channel_name,
      "channel_picture": self.channel_picture

    }
