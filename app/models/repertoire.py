from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Repertoire(db.Model):
    __tablename__ = "repertoire"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    instrument_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("instruments.id")), nullable=False
    )
    song_title = db.Column(db.String(50), nullable=False)
    artist = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    user = db.relationship("User", back_populates="repertoire")
    instrument = db.relationship("Instrument", back_populates="repertoire")

    def to_dict(self, timestamps=False):
        dct = {
            "id": self.id,
            "instrumentId": self.instrument_id,
            "userId": self.user_id,
            "songTitle": self.song_title,
            "artist": self.artist,
        }
        if timestamps:
            dct["createdAt"] = self.created_at
            dct["updatedAt"] = self.updated_at

        return dct
