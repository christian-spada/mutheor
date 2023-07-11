from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Goal(db.Model):
    __tablename__ = "goals"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    instrument_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("instruments.id")),
        nullable=False,
    )
    description = db.Column(db.String(255), nullable=False)
    target_date = db.Column(db.Date, nullable=False)
    is_completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    def to_dict(self, timestamps=False):
        dct = {
            "id": self.id,
            "userId": self.user_id,
            "instrumentId": self.instrument_id,
            "description": self.description,
            "targetDate": self.target_date,
            "isCompleted": self.is_completed,
        }
        if timestamps:
            dct["createdAt"] = self.created_at
            dct["updatedAt"] = self.updated_at

        return dct
