from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DateField, IntegerField
from wtforms.validators import DataRequired, Length


class CreateGoalForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    instrument_id = IntegerField("instrument_id", validators=[DataRequired()])
    description = TextAreaField(
        "description", validators=[DataRequired(), Length(min=2, max=255)]
    )
    target_date = DateField("target_date", validators=[DataRequired()])
