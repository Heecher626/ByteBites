from flask_wtf.file import FileAllowed
from wtforms.validators import DataRequired
from wtforms import StringField, FileField
from flask_wtf import FlaskForm

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

class ItemForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    price_cents = StringField('price_cents', validators=[DataRequired()])
    description = StringField('Description')
    image = FileField("Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
