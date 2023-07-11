from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Achievement(db.Model):
    __tablename__ = "achievements"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    type = db.Column(db.String(50), nullable=False)
    reward = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    user = db.relationship("User", back_populates="achievements")

    def to_dict(self, timestamps=False):
        dct = {
            "id": self.id,
            "userId": self.user_id,
            "type": self.type,
            "reward": self.reward,
        }
        if timestamps:
            dct["createdAt"] = self.created_at
            dct["updatedAt"] = self.updated_at

        return dct
