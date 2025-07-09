# React Frontend for Auth Dashboard

This is a React TypeScript frontend application for user authentication and dashboard viewing. It supports email signup/signin and Google OAuth login.

## 🧩 Features

- ✨ User Signup & Signin
- 🔐 JWT-based Authentication
- 🌐 Google OAuth Integration
- 🏠 Protected Dashboard Route
- 📦 State Management via Context API
- ✅ Routing with React Router v6+

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/frontend-auth-app.git

# Navigate into the project folder
cd frontend-auth-app

# Install dependencies
npm install



🧪 Run the App
bash
Copy code
npm run dev

The app will start locally at: http://localhost:5173


🗂️ Project Structure
bash

src/
│
├── App.tsx                  # Main App with Routing
├── index.tsx                # ReactDOM entry
├── components/
│   ├── fromComp/
│   │   ├── SignUp.tsx
│   │   ├── Signin.tsx
│   │   └── DatePickerInput.tsx
│   │   └── AuthSuccess.tsx
│   │   └── GoogleAuth.tsx
│   ├── pages/
│   │   └── Dashboard.tsx
│   │   └── Header.tsx
│   │   └── RightPanel.tsx
│   └── auth/
│       └── AuthProvider.tsx
│   └── store/
│       └── userStore.ts
├── App.css                  # Global styles
├── main.css 
└── ...
🌐 Routes
Path	Component	Description
/	Dashboard	Home dashboard (protected)
/signup	SignUp	User registration
/signin	Signin	User login
/oauth-success	OAuthSuccess	Google login callback

🛡️ AuthProvider
The app uses AuthProvider to manage authentication state and provide access across components via React Context API.
