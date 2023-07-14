from flask_wtf import FlaskForm
from wtforms import TextAreaField, DateField, IntegerField
from wtforms.validators import DataRequired, Length


class CreateGoalForm(FlaskForm):
    instrument_id = IntegerField("instrument_id", validators=[DataRequired()])
    description = TextAreaField(
        "description", validators=[DataRequired(), Length(min=2, max=255)]
    )
    target_date = DateField("target_date", validators=[DataRequired()])
