"""Database backup script"""
import os
import shutil
from datetime import datetime


def backup_database():
    """Create a backup of the database"""
    db_file = "test.db"
    
    if not os.path.exists(db_file):
        print(f"Database file not found: {db_file}")
        return
    
    # Create backups directory if it doesn't exist
    backup_dir = "backups"
    os.makedirs(backup_dir, exist_ok=True)
    
    # Create backup with timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = os.path.join(backup_dir, f"pos_backup_{timestamp}.db")
    
    shutil.copy(db_file, backup_file)
    print(f"✓ Database backed up to: {backup_file}")


if __name__ == "__main__":
    backup_database()
