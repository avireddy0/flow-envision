# Firebase Setup Guide for Flow-Envision

## Prerequisites
- Node.js and npm installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- A Firebase project created on [Firebase Console](https://console.firebase.google.com)

## Setup Steps

### 1. Get Your Firebase Credentials
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Project Settings** (gear icon)
4. Copy your Firebase config

### 2. Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your Firebase credentials
nano .env
```

Add your Firebase credentials to `.env`:
```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
```

### 3. Initialize Firebase CLI (One-time setup)
```bash
# Login to Firebase
firebase login

# Initialize Firebase in this project
firebase init

# When prompted, select:
# - Hosting
# - Use existing project (select your project)
# - Public directory: public
# - Configure as SPA: Yes
```

### 4. Deploy to Firebase Hosting
```bash
# Build and deploy
npm run build
firebase deploy
```

## Project Structure
```
flow-envision/
├── public/                 # Static files & HTML (deployed to Firebase)
│   └── index.html         # Main application
├── firebase-config.js     # Firebase SDK initialization
├── firebase.json          # Firebase hosting configuration
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies
└── README.md              # Project documentation
```

## Firebase Services Available
- **Authentication** (auth) - User login/signup
- **Firestore** (db) - NoSQL database
- **Storage** (storage) - File storage
- **Realtime Database** (realtimeDb) - Real-time sync

## Using Firebase in Your App

### Import Firebase Config
```javascript
import app from './firebase-config.js';
import { auth } from './firebase-config.js';
// Use auth, db, storage, etc. as needed
```

### Example: User Authentication
```javascript
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config.js';

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in:', userCredential.user);
  } catch (error) {
    console.error('Login error:', error.message);
  }
};
```

## Troubleshooting

### "Cannot find module 'firebase'"
```bash
npm install firebase
```

### Firebase CLI not found
```bash
npm install -g firebase-tools
```

### Deployment issues
```bash
# Clear Firebase cache and retry
rm -rf .firebase
firebase deploy --force
```

### Environment variables not loading
Make sure `.env` file is in the root directory and the deployment script loads it properly.

## Next Steps
1. Update `public/index.html` to include Firebase SDK initialization
2. Add authentication flows
3. Set up Firestore collections and rules
4. Deploy to Firebase Hosting

---
**Last Updated:** December 7, 2025
