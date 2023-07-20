from flask_wtf import FlaskForm
from wtforms import TextAreaField, SelectField, IntegerField, DateField
from wtforms.validators import DataRequired

area_of_focus_choices = [
    ("Chords"),
    ("Scales"),
    ("Technique"),
    ("Theory"),
    ("Rhythm"),
    ("Repertoire"),
]


class CreatePracticeSession(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    instrument_id = IntegerField("instrument_id", validators=[DataRequired()])
    duration = IntegerField(
        "duration", validators=[DataRequired("Duration is required")]
    )
    date = DateField("date", validators=[DataRequired("Date is required")])
    notes = TextAreaField("date", validators=[DataRequired("Notes are required")])
    area_of_focus = SelectField(
        "area_of_focus",
        choices=area_of_focus_choices,
        validators=[DataRequired("Area of focus is required")],
    )
