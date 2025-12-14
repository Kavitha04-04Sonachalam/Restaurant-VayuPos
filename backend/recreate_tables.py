#!/usr/bin/env python
"""Script to recreate database tables"""

from app.core.database import engine, Base

# Drop all existing tables
print("Dropping all existing tables...")
Base.metadata.drop_all(bind=engine)
print("✓ Dropped all existing tables")

# Create all tables fresh
print("Creating all tables...")
Base.metadata.create_all(bind=engine)
print("✓ Created all tables successfully!")
