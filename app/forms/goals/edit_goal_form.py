from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateField
from wtforms.validators import DataRequired, Length


class EditGoalForm(FlaskForm):
    instrument_id = StringField("instrument_id", validators=[DataRequired()])
    description = TextAreaField(
        "description", validators=[DataRequired(), Length(min=2, max=255)]
    )
    target_date = DateField("target_date", validators=[DataRequired()])
