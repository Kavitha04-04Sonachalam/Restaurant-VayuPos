from fastapi import FastAPI

def create_app():
    app = FastAPI(title="VayuPOS Backend API")

    # --- Include Routers later ---
    # from app.api.v1 import auth, products, orders
    # app.include_router(auth.router, prefix="/api/v1/auth")
    # app.include_router(products.router, prefix="/api/v1/products")
    # app.include_router(orders.router, prefix="/api/v1/orders")

    @app.get("/")
    def root():
        return {"message": "VayuPOS Backend Running Successfully!"}

    return app

app = create_app()
