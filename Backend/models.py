from sqlalchemy import Column, Integer, String, DateTime, Boolean, JSON
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)

class UserSettings(Base):
    __tablename__ = "user_settings"
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, unique=True)
    theme = Column(String, default="light")
    notifications_enabled = Column(Boolean, default=True)
    auto_delete_files_days = Column(Integer, default=0)  # 0 means disabled
    settings_json = Column(JSON)