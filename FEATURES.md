# AetherCloud - File Management System

AetherCloud is a cloud-based file management system built with FastAPI (Backend) and React (Frontend) featuring user authentication, file management, and customizable settings.

## Features

### ✅ Implemented Features

1. **User Authentication**
   - User Registration with email validation
   - Secure Login with JWT tokens
   - Password hashing with bcrypt
   - Token-based authorization

2. **File Management**
   - Upload files securely
   - Download uploaded files
   - Delete files
   - Browse all uploaded files with file sizes
   - User-specific file storage (files isolated per user)

3. **Settings Management**
   - User profile settings
   - Theme selection (Light, Dark, Auto)
   - Notification preferences
   - Auto-delete file after N days (configurable)

4. **Security**
   - JWT Authentication (Bearer tokens)
   - Password hashing with bcrypt
   - User-specific file isolation
   - CORS support

5. **Docker Support**
   - Docker containers for Backend
   - Docker containers for Frontend
   - Docker Compose for easy orchestration
   - Volume support for persistent file storage

## Technology Stack

### Backend
- **Framework:** FastAPI
- **Database:** SQLite (can be switched to PostgreSQL)
- **Authentication:** JWT (python-jose), bcrypt
- **File Handling:** python-multipart
- **ORM:** SQLAlchemy

### Frontend
- **Framework:** React 18
- **Routing:** React Router v6
- **Language:** TypeScript
- **Build Tool:** Vite

## Installation & Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker & Docker Compose (optional)

### Local Setup

#### Backend
```bash
cd Backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will run on: `http://localhost:8000`

#### Frontend
```bash
cd Frontend
npm install
npm run dev
```

Frontend will run on: `http://localhost:3001` (or 3000 if 3001 is available)

### Docker Compose Setup

```bash
docker-compose up --build
```

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login and get JWT token

### Files
- `POST /upload` - Upload a file (requires auth)
- `GET /files` - List all user files (requires auth)
- `GET /download/{filename}` - Download a file (requires auth)
- `DELETE /files/{filename}` - Delete a file (requires auth)

### Settings
- `GET /settings` - Get user settings (requires auth)
- `PUT /settings` - Update user settings (requires auth)

## Usage

### 1. Register
Navigate to `/register` and create a new account with:
- Username
- Email
- Password (min. 6 characters)

### 2. Login
Navigate to `/login` and enter your credentials

### 3. Upload Files
- Click on the file input in the File Explorer
- Select a file
- Click "Upload"

### 4. Manage Files
- Download: Click the "Download" button next to any file
- Delete: Click the "Delete" button to remove a file
- View: All files are listed with their size

### 5. Customize Settings
- Navigate to Settings page
- Change theme preference
- Toggle notifications
- Set auto-delete duration

## Project Structure

```
AetherCloud/
├── Backend/
│   ├── main.py           # FastAPI app & endpoints
│   ├── models.py         # Database models
│   ├── auth.py           # Authentication utilities
│   ├── database.py       # Database configuration
│   ├── requirements.txt   # Python dependencies
│   └── uploads/          # Uploaded files directory
├── Frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── styles/       # CSS files
│   │   ├── api.ts        # API client
│   │   ├── App.tsx       # Main app component
│   │   └── main.tsx      # React entry point
│   ├── package.json      # Node dependencies
│   ├── tsconfig.json     # TypeScript config
│   ├── vite.config.ts    # Vite config
│   └── index.html        # HTML entry point
├── Dockerfile.backend    # Backend Docker image
├── Dockerfile.frontend   # Frontend Docker image
├── docker-compose.yml    # Docker Compose config
└── README.md            # This file
```

## Environment Variables

### Backend
Create a `.env` file in the Backend directory (optional):
```
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///aethercloud.db
```

**Important:** Change `SECRET_KEY` in production!

## Security Notes

1. **Change Secret Key:** Update `SECRET_KEY` in `auth.py` before production
2. **Database:** SQLite is used for development; use PostgreSQL for production
3. **CORS:** Currently allows all origins; restrict in production
4. **File Storage:** Consider using cloud storage (S3, Azure Blob) in production
5. **Rate Limiting:** Add rate limiting for API endpoints in production

## Future Enhancements

- [ ] File sharing links
- [ ] Folder organization
- [ ] File preview (images, documents)
- [ ] Batch operations
- [ ] Activity logs
- [ ] Two-factor authentication
- [ ] OAuth integration
- [ ] File versioning

## Contributing

Feel free to fork and submit pull requests!

## License

See LICENSE file for details.

## Support

For issues or questions, please open an issue on GitHub.
