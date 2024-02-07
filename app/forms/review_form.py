from wtforms.validators import DataRequired, NumberRange, Length
from wtforms import StringField, IntegerField
from flask_wtf import FlaskForm

class ReviewForm(FlaskForm):
    stars = IntegerField('Stars', validators=[DataRequired(), NumberRange(min=1, max=5)])
    content = StringField('Content', validators=[DataRequired(), Length(min=5, max=500)])
