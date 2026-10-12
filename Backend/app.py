from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from config import Config
from database import db

from routes.auth import auth_bp
from routes.products import products_bp
from routes.cart import cart_bp
from routes.orders import orders_bp


app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)

jwt = JWTManager(app)

CORS(app)


app.register_blueprint(auth_bp)
app.register_blueprint(products_bp)
app.register_blueprint(cart_bp)
app.register_blueprint(orders_bp)


@app.route("/")
def home():

    return jsonify({
        "message": "E-Commerce API is running",
        "status": "success"
    })


@app.route("/api/health")
def health():

    return jsonify({
        "status": "healthy"
    })


with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000
    )