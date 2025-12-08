# Firebase Setup Guide for Flow-Envision

## Prerequisites
- Node.js (v16+) and npm installed
- `git` available and authenticated to your GitHub account (if using GitHub integration)
- Firebase CLI installed (globally) or available via `npx` (`npm install -g firebase-tools` or use `npx firebase`) 
- A Firebase project created on the Firebase Console: https://console.firebase.google.com

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

Interactive deploy (local):

```bash
# Build (if you have a build step) and deploy interactively
npm run build
firebase deploy --only hosting --project YOUR_PROJECT_ID
```

Non-interactive / CI deploy (recommended for automation):

1. Create a CI token (run on your local machine):

```bash
npx firebase login:ci
# copy the token output
```

2. In your CI environment (GitHub Actions, Railway, etc.) set an environment variable `FIREBASE_TOKEN` to that token.

3. In CI, run:

```bash
npm ci
npm run build
npx firebase deploy --only hosting --project YOUR_PROJECT_ID --token "$FIREBASE_TOKEN"
```

If you connected Firebase Hosting to GitHub in the Firebase Console, commits to the branch you selected will automatically trigger a Hosting deploy — no local `firebase deploy` required.

## Project Structure
```
flow-envision/
├── public/                       # Static files & HTML (deployed to Firebase)
│   └── flow-workflow_V5.html     # Main application page (also index.html may be used)
├── firebase-config.js            # Firebase SDK initialization (used by client code)
├── firebase.json                 # Firebase hosting configuration
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies & start scripts
└── README.md                     # Project documentation
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
1. Confirm which static entry point you want to serve from `public/` (the repo currently contains `flow-workflow_V5.html`). If you want it served as `/`, rename or copy it to `public/index.html`.
2. Update `public/*` pages to import `firebase-config.js` where client code needs Firebase services.
3. Add authentication flows and Firestore rules as required.
4. Set up CI deploy (recommend using `FIREBASE_TOKEN` in GitHub Actions or equivalent) or enable GitHub integration in the Firebase Console.

---
**Last Updated:** December 8, 2025
