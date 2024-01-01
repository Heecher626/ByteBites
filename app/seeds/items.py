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

    [db.session.add(item) for item in items]
    db.session.commit()

def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
