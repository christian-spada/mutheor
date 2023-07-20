from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, ValidationError
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS

type_choices = [
    ("Electric Guitar"),
    ("Acoustic Guitar"),
    ("Bass"),
    ("Drums"),
    ("Piano"),
    ("Synth"),
    ("Violin"),
    ("Saxophone"),
    ("Clarinet"),
    ("Flute"),
    ("Trumpet"),
    ("Trombone"),
    ("Tuba"),
    ("Bongos"),
]

category_choices = [("Percussion"), ("Brass"), ("Woodwind"), ("String"), ("Electronic")]


class EditInstrumentForm(FlaskForm):
    type = SelectField(
        "type",
        choices=type_choices,
        validators=[DataRequired("Type is required")],
    )
    model = StringField("model", validators=[DataRequired("Model is required")])
    category = SelectField(
        "category",
        choices=category_choices,
        validators=[DataRequired("Category is required")],
    )
    image = FileField(
        "image",
        validators=[
            FileAllowed(list(ALLOWED_EXTENSIONS)),
        ],
    )
