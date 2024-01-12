from app.models import db, Restaurant, environment, SCHEMA
from sqlalchemy.sql import text

def seed_restaurants():
    restaurant_1 = Restaurant(
        owner_id=2,
        name="Sushi Stop",
        description="Our chefs skillfully prepare each roll with the finest ingredients, ensuring a perfect balance of taste and texture in every bite. Whether you're grabbing a quick lunch or satisfying your sushi cravings on the fly, Sushi Stop is your convenient and delicious solution.",
        preview_image_url="https://hakatawaltham.com/wp-content/uploads/2022/05/2.jpeg",
        banner_image_url="https://hakatawaltham.com/wp-content/uploads/2022/05/5.jpeg"
    )
    restaurant_2 = Restaurant(
        owner_id=3,
        name="Burrito Barn",
        description="The rustic charm of Burrito Barn provides a cozy and inviting atmosphere, making it the perfect place to gather with friends or enjoy a quick, flavorful meal. Our commitment to quality ingredients and generous portions ensures that every visit to Burrito Barn is a celebration of the delicious and the delightful!",
        preview_image_url="https://www.tamingtwins.com/wp-content/uploads/2023/05/image-51.jpeg",
        banner_image_url="https://mojo.generalmills.com/api/public/content/xPo-XUm4eUyV5TT76NA6gA_gmi_hi_res_jpeg.jpeg?v=7e3740d6&t=466b54bb264e48b199fc8e83ef1136b4"
    )
    restaurant_3 = Restaurant(
        owner_id=2,
        name="Pasta Palace",
        description="Welcome to Pasta Paradise, where the enchanting aroma of authentic Italian flavors beckons. Our chefs meticulously craft each dish, from classic spaghetti to regional specialties, using only the finest ingredients.",
        preview_image_url="https://www.twopeasandtheirpod.com/wp-content/uploads/2023/05/Lemon-Ricotta-Pasta-9-500x375.jpg",
        banner_image_url="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/02/05/Baked-Feta-Pasta-4_s4x3.jpg.rend.hgtvcom.511.288.suffix/1615916524567.jpeg"
    )
    restaurant_4 = Restaurant(
        owner_id=3,
        name="Jammin' Jambalaya",
        description="This is seed data, please check out one of the first 3 restaurants to see how the restaurant is normally laid out!",
        preview_image_url="https://cafedelites.com/wp-content/uploads/2018/05/Jambalaya-IMAGE-3.jpg",
        banner_image_url="https://recipe-graphics.grocerywebsite.com/0_GraphicsRecipes/4376_4k.jpg"
    )
    restaurant_5 = Restaurant(
        owner_id=7,
        name="Chicken Chateau",
        description="This is seed data, please check out one of the first 3 restaurants to see how the restaurant is normally laid out!",
        preview_image_url="https://hips.hearstapps.com/hmg-prod/images/delish-230502-06-fried-chicken-0887-eb-index-645ec6fb0ca64.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
        banner_image_url="https://recipe30.com/wp-content/uploads/2020/05/Fried-chicken.jpg"
    )
    restaurant_6 = Restaurant(
        owner_id=9,
        name="BBQ Bliss",
        description="This is seed data, please check out one of the first 3 restaurants to see how the restaurant is normally laid out!",
        preview_image_url="https://www.allrecipes.com/thmb/gVocwHi0RMwyjfJ1g6q8VHacxJU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/22469-Barbecue-Ribs-ddmfs-4x3-208-0221b0213517493494a29c1c76a8d1cc.jpg",
        banner_image_url="https://www.southernliving.com/thmb/J02EQeOhOKHfmALt-jE_61idUck=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/oven-baked-baby-back-ribs-beauty-332-7deda00b7b4f4820a9c79f13ed09cfb9.jpg"
    )
    restaurant_7 = Restaurant(
        owner_id=4,
        name="Crepe Corner",
        description="This is seed data, please check out one of the first 3 restaurants to see how the restaurant is normally laid out!",
        preview_image_url="https://www.allrecipes.com/thmb/RF9CTg83MdIy-RV8qyuLzUoxXZY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4511555-dessert-crepes-Buckwheat-Queen-1x1-1-90b5c7ed132f47728b8a2fdc1c984dd0.jpg",
        banner_image_url="https://mojo.generalmills.com/api/public/content/9oyvQGwLEUaCa-9gVKIv_g_gmi_hi_res_jpeg.jpeg?v=84ea5012&t=466b54bb264e48b199fc8e83ef1136b4"
    )
    restaurant_8 = Restaurant(
        owner_id=0,
        name="Demo User's Restaurant",
        description="A restaurant belonging to the Demo User! Feel free to play around with the owner controls!",
        preview_image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
        banner_image_url="https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202312/MIT_Food-Diabetes-01_0.jpg?itok=Mp8FVJkC"
    )
    restaurant_9 = Restaurant(
        owner_id=5,
        name="Ramen Realm",
        description="This is seed data, please check out one of the first 3 restaurants to see how the restaurant is normally laid out!",
        preview_image_url="https://peasandcrayons.com/wp-content/uploads/2020/04/spicy-vegetarian-ramen-recipe-3.jpg",
        banner_image_url="https://www.pacificfoods.com/wp-content/uploads/2022/08/SP_Recipes_0002_Ramen.jpg"
    )

    seed_restaurants = [restaurant_1, restaurant_2, restaurant_3, restaurant_4, restaurant_5, restaurant_6, restaurant_7, restaurant_8, restaurant_9]

    db.session.add_all(seed_restaurants)
    db.session.commit()
    db.session.close()

def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))

    db.session.commit()
