from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.utils import (
    attach_csrf_token,
    bad_request,
    validation_errors_to_error_messages,
    logger,
)

auth_routes = Blueprint("auth", __name__)


@auth_routes.route("/")
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {"errors": ["Unauthorized"]}


@auth_routes.route("/login", methods=["POST"])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    attach_csrf_token(form, request)
    if form.validate_on_submit():
        user = User.query.filter(User.email == form.data["email"]).first()
        login_user(user)

        return user.to_dict()
    return bad_request(form.errors)


@auth_routes.route("/logout")
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {"message": "User logged out"}


@auth_routes.route("/signup", methods=["POST"])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    attach_csrf_token(form, request)
    if form.validate_on_submit():
        user = User(
            profile_pic=form.data["profile_pic"],
            username=form.data["username"],
            email=form.data["email"],
            password=form.data["password"],
        )

        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()

    return bad_request(form.errors)


@auth_routes.route("/unauthorized")
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {"errors": ["Unauthorized"]}, 401
