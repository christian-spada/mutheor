from flask_wtf import FlaskForm
from wtforms import TextAreaField, SelectField, IntegerField, DateTimeField
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
    duration = IntegerField("duration", validators=[DataRequired()])
    date = DateTimeField("date", validators=[DataRequired()])
    notes = TextAreaField("date", validators=[DataRequired()])
    area_of_focus = SelectField(
        "area_of_focus", choices=area_of_focus_choices, validators=[DataRequired()]
    )
