from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from enum import Enum

area_of_focus_choices = Enum(
    "FocusAreas", ["Chords", "Scales", "Technique", "Theory", "Rhythm", "Repertoire"]
)


class PracticeSession(db.Model):
    __tablename__ = "practice_sessions"

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
    duration = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    notes = db.Column(db.String(255), nullable=False)
    area_of_focus = db.Column(db.Enum(area_of_focus_choices), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    user = db.relationship("User", back_populates="practice_sessions")
    instrument = db.relationship("Instrument", back_populates="practice_sessions")

    def to_dict(self, timestamps=False):
        dct = {
            "id": self.id,
            "userId": self.user_id,
            "instrumentId": self.instrument_id,
            "duration": self.duration,
            "date": self.date,
            "notes": self.notes,
            "areaOfFocus": str(self.area_of_focus).split(".")[1],
        }
        if timestamps:
            dct["createdAt"] = self.created_at
            dct["updatedAt"] = self.updated_at

        return dct
