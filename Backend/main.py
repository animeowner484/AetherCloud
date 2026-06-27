from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, status
from fastapi.responses import FileResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import timedelta
import os

from database import SessionLocal, engine, Base
from models import User, UserSettings
from auth import (
    create_access_token, 
    get_password_hash, 
    verify_password,
    decode_access_token,
    UserRegister,
    UserLogin,
    Token,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AetherCloud")

# Startup event to create test account
@app.on_event("startup")
async def create_test_account():
    db = SessionLocal()
    try:
        # Check if test account already exists
        existing_user = db.query(User).filter(User.username == "testuser").first()
        if not existing_user:
            # Create test account
            test_user = User(
                username="testuser",
                email="test@aethercloud.local",
                hashed_password=get_password_hash("testpass123")
            )
            db.add(test_user)
            db.commit()
            db.refresh(test_user)
            
            # Create default settings for test account
            settings = UserSettings(
                user_id=test_user.id,
                theme="light",
                notifications_enabled=True
            )
            db.add(settings)
            db.commit()
            print("✓ Test account created: username='testuser', password='testpass123'")
        else:
            print("✓ Test account already exists")
    finally:
        db.close()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

security = HTTPBearer()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    token = credentials.credentials
    username = decode_access_token(token)
    if username is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )
    return user

@app.get("/")
def root():
    return {"status": "AetherCloud Online"}

# Auth Endpoints
@app.post("/register", response_model=Token)
async def register(user_data: UserRegister, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user_data.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    db_user_email = db.query(User).filter(User.email == user_data.email).first()
    if db_user_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user_data.password)
    db_user = User(username=user_data.username, email=user_data.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Create default settings
    settings = UserSettings(user_id=db_user.id, theme="light", notifications_enabled=True)
    db.add(settings)
    db.commit()
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/login", response_model=Token)
async def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == user_data.username).first()
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# File Endpoints
@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_upload_dir = os.path.join(UPLOAD_DIR, str(current_user.id))
    os.makedirs(user_upload_dir, exist_ok=True)
    
    path = os.path.join(user_upload_dir, file.filename)
    
    with open(path, "wb") as f:
        f.write(await file.read())
    
    return {
        "success": True,
        "filename": file.filename,
        "user_id": current_user.id
    }

@app.get("/files")
async def list_files(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_upload_dir = os.path.join(UPLOAD_DIR, str(current_user.id))
    
    if not os.path.exists(user_upload_dir):
        return {"files": []}
    
    files = []
    for filename in os.listdir(user_upload_dir):
        filepath = os.path.join(user_upload_dir, filename)
        if os.path.isfile(filepath):
            size = os.path.getsize(filepath)
            files.append({
                "name": filename,
                "size": size,
                "path": filepath
            })
    
    return {"files": files}

@app.get("/download/{filename}")
async def download_file(
    filename: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_upload_dir = os.path.join(UPLOAD_DIR, str(current_user.id))
    path = os.path.join(user_upload_dir, filename)
    
    if not os.path.exists(path) or not path.startswith(user_upload_dir):
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(path, filename=filename)

@app.delete("/files/{filename}")
async def delete_file(
    filename: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_upload_dir = os.path.join(UPLOAD_DIR, str(current_user.id))
    path = os.path.join(user_upload_dir, filename)
    
    if not os.path.exists(path) or not path.startswith(user_upload_dir):
        raise HTTPException(status_code=404, detail="File not found")
    
    os.remove(path)
    return {"success": True, "message": "File deleted"}

# Settings Endpoints
@app.get("/settings")
async def get_settings(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    settings = db.query(UserSettings).filter(UserSettings.user_id == current_user.id).first()
    if not settings:
        settings = UserSettings(user_id=current_user.id)
        db.add(settings)
        db.commit()
    
    return {
        "theme": settings.theme,
        "notifications_enabled": settings.notifications_enabled,
        "auto_delete_files_days": settings.auto_delete_files_days
    }

@app.put("/settings")
async def update_settings(
    settings_data: dict,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    settings = db.query(UserSettings).filter(UserSettings.user_id == current_user.id).first()
    if not settings:
        settings = UserSettings(user_id=current_user.id)
        db.add(settings)
    
    if "theme" in settings_data:
        settings.theme = settings_data["theme"]
    if "notifications_enabled" in settings_data:
        settings.notifications_enabled = settings_data["notifications_enabled"]
    if "auto_delete_files_days" in settings_data:
        settings.auto_delete_files_days = settings_data["auto_delete_files_days"]
    
    db.commit()
    db.refresh(settings)
    
    return {
        "theme": settings.theme,
        "notifications_enabled": settings.notifications_enabled,
        "auto_delete_files_days": settings.auto_delete_files_days
    }