from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired


class CreateRepertoireForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    instrument_id = IntegerField("instrument_id", validators=[DataRequired()])
    song_title = StringField("song_title", validators=[DataRequired()])
    artist = StringField("artist", validators=[DataRequired()])
