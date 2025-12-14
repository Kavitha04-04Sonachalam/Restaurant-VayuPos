"""Test configuration"""
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient
import sys

# Add app to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app
from app.core.database import Base, get_db
from app.core.security import get_password_hash

# Create in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


Base.metadata.create_all(bind=engine)

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


def pytest_configure(config):
    """Pytest configuration hook"""
    Base.metadata.create_all(bind=engine)


def pytest_unconfigure(config):
    """Pytest unconfiguration hook"""
    Base.metadata.drop_all(bind=engine)
