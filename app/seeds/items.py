from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text

def seed_items():

    items = []

    items.append(Item(
        restaurant_id=1,
        name="Edamame",
        price_cents=599,
        description="Steamed Salted Edamame",
        image_url="https://popmenucloud.com/cdn-cgi/image/width%3D1920%2Cheight%3D1920%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/zxhjgnpr/77038fda-aded-4e78-93a8-42a8022edcba.jpg"
    ))

    items.append(Item(
        restaurant_id=1,
        name="Crispy Garlic Cucumber",
        price_cents=799,
        description="Persian Cucumbers, Crispy Garlic Chili Oil, Ponzu, Sesame",
        image_url="https://popmenucloud.com/cdn-cgi/image/width%3D1920%2Cheight%3D1920%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/zxhjgnpr/9e829d48-fd12-4593-a0a3-4add283d30b9.JPG"
    ))

    items.append(Item(
        restaurant_id=1,
        name="Scallion Pancake",
        price_cents=799,
        description="Crispy flaky pan fried pancakes with green onion",
        image_url="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Spring_onion_pancake_2013.JPG/1280px-Spring_onion_pancake_2013.JPG"
    ))

    items.append(Item(
        restaurant_id=1,
        name="Tuna Avocado Roll",
        price_cents=1199,
        description="Fresh tuna and ripe avocado",
        image_url="https://www.krudofish.com/cdn/shop/products/iVHBnL5w_2000x.jpg?v=1661947551"
    ))

    items.append(Item(
        restaurant_id=1,
        name="California Roll",
        price_cents=1399,
        description="Crab, avocado, cucumber, salmon roe",
        image_url="https://chefchrischo.com/wp-content/uploads/2022/05/IMG_1284-3-768x885.png"
    ))

    items.append(Item(
        restaurant_id=1,
        name="Philadelphia Roll",
        price_cents=1499,
        description="Smoked salmon, cream cheese, cucumber",
        image_url="https://www.evolvingtable.com/wp-content/uploads/2022/05/Philadelphia-Roll-25.jpg"
    ))

    items.append(Item(
        restaurant_id=1,
        name="Caterpillar Roll",
        price_cents=1699,
        description="Baked unagi, cucumber, wrapped with avocado, unagi sauce",
        image_url="https://www.zojirushi.com/user/images/recipe/483.1.jpg"
    ))

    items.append(Item(
        restaurant_id=1,
        name="Dragon Roll",
        price_cents=1799,
        description="Shrimp tempura, cucumber, avocado, spicy mayo, unagi sauce, tobiko",
        image_url="https://www.justonecookbook.com/wp-content/uploads/2020/06/Dragon-Roll-0290-III.jpg"
    ))

    items.append(Item(
        restaurant_id= 2,
        name = "The Classic",
        price_cents = 1199,
        description = "The classic beef, bean, and cheese burrito",
        image_url="https://life-in-the-lofthouse.com/wp-content/uploads/2014/08/freezer-burritos-LifeInTheLofthouse.jpg"
    ))

    items.append(Item(
        restaurant_id= 2,
        name = "California Style",
        price_cents = 1599,
        description = "An authentic california burrito with carne asada, guacamole, and fries.",
        image_url="https://www.thecandidcooks.com/wp-content/uploads/2022/05/california-burrito-close-feature.jpg"
    ))

    items.append(Item(
        restaurant_id= 2,
        name = "KBBQ Burrito",
        price_cents = 1699,
        description = "A unique fusion take on a burrito, with Korean BBQ Beef, rice, kimchi, and a sweet and savory sauce.",
        image_url="https://pinchofyum.com/wp-content/uploads/Korean-BBQ-Beef-Burritos-Recipe.jpg"
    ))

    items.append(Item(
        restaurant_id= 2,
        name = "Vegan Burrito",
        price_cents = 1499,
        description = "An option for the vegans, with plant-based chorizo, guacamole, pineapple salsa, and brown rice.",
        image_url="https://plantd.co/wp-content/uploads/2019/09/Veggie-Burrito.png"
    ))

    items.append(Item(
        restaurant_id=3,
        name="Garlic Bread",
        price_cents=600,
        description="Buttery bread that is topped with garlic.",
        image_url="https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_150,q_auto:low,fl_lossy,dpr_2.0,c_fill,f_auto,h_130/iattmafihobfk4emlfxy"
    ))

    items.append(Item(
        restaurant_id= 3,
        name = "Buratta",
        price_cents = 1200,
        description = "Cream filled fresh mozzarella over tomato salad and topped with fresh basil, balsamic glaze and extra virgin olive oil.",
        image_url="https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_150,q_auto:low,fl_lossy,dpr_2.0,c_fill,f_auto,h_130/beszzst0cif2znbw0hye"
    ))

    items.append(Item(
        restaurant_id= 3,
        name = "Penne with Chicken and Broccoli",
        price_cents = 2000,
        description = "Comes with a garlic cream sauce",
    ))

    items.append(Item(
        restaurant_id= 3,
        name = "Chicken Marsala",
        price_cents = 2300,
        description = "Mushrooms, prosciutto, sweet marsala wine reduction tossed with linguine",
        image_url=""
    ))


    # items.append(Item(
    #     restaurant_id= 0,
    #     name = "",
    #     price_cents = 0,
    #     description = "",
    #     image_url=""
    # ))

    db.session.add_all(items)
    db.session.commit()
    db.session.close()

def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
