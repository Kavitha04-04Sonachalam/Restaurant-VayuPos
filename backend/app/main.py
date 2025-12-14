"""
FastAPI POS (Point of Sale) System - Main Application
"""
from fastapi import FastAPI, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.core.config import get_settings
from app.core.database import init_db, get_db
from app.api.v1 import auth, users, products, categories, customers, orders, inventory, payment, reports

# Get settings
settings = get_settings()

# Create FastAPI app
app = FastAPI(
    title=settings.app_name,
    description="Point of Sale System Backend API",
    version=settings.app_version,
)

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup
@app.on_event("startup")
def startup_event():
    init_db()
    print("✓ Database initialized")


@app.get("/", tags=["health"])
def read_root():
    return {
        "message": settings.app_name,
        "status": "running",
        "version": settings.app_version,
    }


@app.get("/health", tags=["health"])
def health_check(db: Session = Depends(get_db)):
    try:
        db.execute("SELECT 1")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={"status": "unhealthy", "error": str(e)},
        )


# ============================
# INCLUDE ROUTERS
# ============================
# Include routers immediately after app creation
app.include_router(auth.router, prefix="/api/v1")
app.include_router(users.router, prefix="/api/v1")
app.include_router(products.router, prefix="/api/v1")
app.include_router(categories.router, prefix="/api/v1")
app.include_router(customers.router, prefix="/api/v1")
app.include_router(orders.router, prefix="/api/v1")
app.include_router(inventory.router, prefix="/api/v1")
app.include_router(payment.router, prefix="/api/v1")
app.include_router(reports.router, prefix="/api/v1")
@app.get("/api/v1")
def api_v1_root():
    return {
        "message": "POS API V1",
        "routes": [
            "/api/v1/users",
            "/api/v1/products",
            "/api/v1/categories",
            "/api/v1/orders"
        ]
    }
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
