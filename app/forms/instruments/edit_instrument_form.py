from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, ValidationError

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


def is_image_url(form, field):
    image = field.data
    if not image:
        return

    image_name = image.split("/")[-1]
    split = image_name.split(".")
    valid_extensions = ["jpg", "jpeg", "png"]
    if (not len(split) == 2) or (split[1] not in valid_extensions):
        raise ValidationError(
            "Image url must be of type " + ", ".join(valid_extensions)
        )


class EditInstrumentForm(FlaskForm):
    type = SelectField("type", choices=type_choices, validators=[DataRequired()])
    nickname = StringField("nickname")
    category = SelectField(
        "category", choices=category_choices, validators=[DataRequired()]
    )
    image = StringField("image", validators=[DataRequired(), is_image_url])
