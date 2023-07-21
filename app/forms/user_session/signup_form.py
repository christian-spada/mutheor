from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User
from flask_wtf.file import FileField, FileAllowed
from app.api.aws_helpers import ALLOWED_EXTENSIONS
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use.")


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Username is already in use.")


def validate_email(form, field):
    email = field.data
    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

    if not re.match(pattern, email):
        raise ValidationError("Email is not valid")


class SignUpForm(FlaskForm):
    username = StringField(
        "username",
        validators=[DataRequired("Username is required"), username_exists],
    )
    email = StringField(
        "email",
        validators=[DataRequired("Email is required"), user_exists, validate_email],
    )
    profile_pic = FileField(
        "profile_pic",
        validators=[
            FileAllowed(list(ALLOWED_EXTENSIONS)),
        ],
    )
    password = StringField(
        "password", validators=[DataRequired("Password is required")]
    )
