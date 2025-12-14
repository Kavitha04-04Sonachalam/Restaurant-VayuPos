"""Reset database script"""
import os
from app.core.database import Base, engine, SessionLocal


def reset_database():
    """Reset and recreate all tables"""
    print("Resetting database...")
    
    # Drop all tables
    Base.metadata.drop_all(bind=engine)
    print("✓ Tables dropped")
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    print("✓ Tables created")
    
    # Delete SQLite database file if exists
    db_url = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    if "sqlite" in db_url:
        db_file = db_url.replace("sqlite:///", "")
        if os.path.exists(db_file):
            os.remove(db_file)
            print(f"✓ Database file removed: {db_file}")
    
    print("\n✓ Database reset complete!")


if __name__ == "__main__":
    reset_database()
