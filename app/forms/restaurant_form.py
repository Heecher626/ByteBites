from flask_wtf.file import FileAllowed, FileRequired
from wtforms.validators import DataRequired
from wtforms import StringField, FileField
from flask_wtf import FlaskForm

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

class RestaurantForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    preview_image_url = FileField("Cover Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    banner_image_url = FileField("Cover Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    description = StringField('Description', validators=[DataRequired()])

class UpdateRestaurantForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    preview_image_url = FileField("Cover Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    banner_image_url = FileField("Cover Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    description = StringField('Description', validators=[DataRequired()])
