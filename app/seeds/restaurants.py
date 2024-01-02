from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text

def seed_restaurants():
    restaurant_1 = Restaurant(
        owner_id=2,
        name="Marnie's Sushi Shop",
        description="At Marnie's, we strive to make food that you will remember. We source fresh caught fish daily, and our talented chefs create high quality sushi that you will remember.",
        preview_image_url="https://hakatawaltham.com/wp-content/uploads/2022/05/2.jpeg",
        banner_image_url="https://hakatawaltham.com/wp-content/uploads/2022/05/5.jpeg"
    )
    restaurant_2 = Restaurant(
        owner_id=3,
        name="Bobbie's Burritos",
        description="The restaurant that everyone is talking about. Bobbie's Burritos bursted onto the scene with creative, delicious, and unique tex-mex dishes, that everyone is talking about!",
        preview_image_url="https://www.tamingtwins.com/wp-content/uploads/2023/05/image-51.jpeg",
        banner_image_url="https://mojo.generalmills.com/api/public/content/xPo-XUm4eUyV5TT76NA6gA_gmi_hi_res_jpeg.jpeg?v=7e3740d6&t=466b54bb264e48b199fc8e83ef1136b4"
    )
    restaurant_3 = Restaurant(
        owner_id=3,
        name="Jammin Jambalaya",
        description="temp",
        preview_image_url="https://cafedelites.com/wp-content/uploads/2018/05/Jambalaya-IMAGE-3.jpg",
        banner_image_url="https://recipe-graphics.grocerywebsite.com/0_GraphicsRecipes/4376_4k.jpg"
    )
    restaurant_4 = Restaurant(
        owner_id=2,
        name="Pasta Palace",
        description="temp",
        preview_image_url="https://www.twopeasandtheirpod.com/wp-content/uploads/2023/05/Lemon-Ricotta-Pasta-9-500x375.jpg",
        banner_image_url="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/02/05/Baked-Feta-Pasta-4_s4x3.jpg.rend.hgtvcom.511.288.suffix/1615916524567.jpeg"
    )

    seed_restaurants = [restaurant_1, restaurant_2, restaurant_3, restaurant_4]

    db.session.add_all(seed_restaurants)
    db.session.commit()

def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))

    db.session.commit()
