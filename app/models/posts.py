from .db import db



class Post(db.Model):
  __tablename__ = "posts"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  channel_id = db.Column(db.Integer, db.ForeignKey("channels.id"), nullable=False)
  post_title = db.Column(db.Text)
  post_picture = db.Column(db.Text)

  user = db.relationship("User", back_populates = "posts")
  channels = db.relationship("Channel", back_populates = "posts")




  # user = db.relationship("User", back_populates = "channels")


  def to_dict(self):
    return {
      "id": self.id,
      "user_id": self.user_id,
      "channel_id": self.channel_id,
      "post_title": self.post_title,
      "post_picture": self.post_picture


    }
