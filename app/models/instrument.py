from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from enum import Enum

categories = Enum(
    "Categories",
    ["Percussion", "Brass", "Woodwind", "String", "Electronic"],
)

instrument_types = Enum(
    "Types",
    [
        "Electric Guitar",
        "Acoustic Guitar",
        "Bass",
        "Drums",
        "Piano",
        "Synth",
        "Violin",
        "Saxophone",
        "Clarinet",
        "Flute",
        "Trumpet",
        "Trombone",
        "Tuba",
        "Bongos",
    ],
)


class Instrument(db.Model):
    __tablename__ = "instruments"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    nickname = db.Column(db.String(20), default="Needs nickname!")
    type = db.Column(db.Enum(instrument_types), nullable=False)
    category = db.Column(db.Enum(categories), nullable=False)
    image = db.Column(db.String(100))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    user = db.relationship("User", back_populates="instruments")
    goals = db.relationship(
        "Goal", back_populates="instrument", cascade="all, delete-orphan"
    )
    practice_sessions = db.relationship(
        "PracticeSession", back_populates="instrument", cascade="all, delete-orphan"
    )
    repertoire = db.relationship(
        "Repertoire", back_populates="instrument", cascade="all, delete-orphan"
    )

    def enums_to_string(self, enum):
        enum_str = str(enum)
        return enum_str.split(".")[1] if "." in enum_str else enum

    def to_dict(self, timestamps=False):
        dct = {
            "id": self.id,
            "userId": self.user_id,
            "nickname": self.nickname,
            "type": self.enums_to_string(enum=self.enums_to_string(enum=self.type)),
            "image": self.image,
            "category": self.enums_to_string(
                enum=self.enums_to_string(enum=self.category)
            ),
        }
        if timestamps:
            dct["createdAt"] = self.created_at
            dct["updatedAt"] = self.updated_at

        return dct
