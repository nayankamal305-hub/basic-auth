# Full-Stack Task Manager (Internship Assignment)

## PROJECT OVERVIEW
**App Name:** TaskFlow
**Description:** A complete, production-ready full-stack web application designed for task management.

**Features List:**
- User Signup & Login with Validation
- Secure authentication using JSON Web Tokens (JWT)
- Protected dashboard, accessible only to authenticated users
- Complete CRUD functionality for Tasks (Create, Read, Update, Delete)
- Clean, modern, "glassmorphism" UI with responsive design
- Loading states and error handling for all API requests

## FOLDER STRUCTURE
```
basic-auth/
├── backend/
│   ├── models/
│   │   ├── Item.js
│   │   └── User.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── items.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## BACKEND CODE
The backend is an Express Node.js application.
- **server.js:** The entry point. Connects to MongoDB via Mongoose, sets up CORS and JSON parsing.
- **routes:** `auth.js` for handling `/register` and `/login` (issues JWTs). `items.js` for handling CRUD operations on tasks.
- **models:** `User.js` stores user credentials (passwords hashed via bcryptjs). `Item.js` stores tasks linked to a specific `userId`.
- **middleware:** `auth.js` verifies the JWT sent from the client before allowing access to protected routes.

## FRONTEND CODE
The frontend is built with React and Vite.
- **Pages:** `Login`, `Register`, and `Dashboard`.
- **API Integration:** We use `axios` configured in `services/api.js` to automatically attach the JWT token from `localStorage` to all requests.
- **UI:** A custom modern UI powered by vanilla CSS in `index.css` focusing on premium aesthetics and responsive layouts.

## DATABASE SETUP
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free tier cluster.
2. Under "Database Access", create a user with a strong password.
3. Under "Network Access", allow your IP address (or `0.0.0.0/0` for all IPs).
4. Click "Connect" -> "Connect your application" and copy the connection string.
5. In your `backend/.env` file, replace the `MONGO_URI` with the string you copied, substituting `<password>` with your actual password. Example:
   `MONGO_URI=mongodb+srv://user:yourpassword@cluster0.mongodb.net/taskapp?retryWrites=true&w=majority`

## RUN INSTRUCTIONS

### Step 1: Run the Backend
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (runs on port 5000):
   ```bash
   npm start
   ```

### Step 2: Run the Frontend
1. Open a second terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the displayed URL (usually `http://localhost:5173`) in your browser.

## DEPLOYMENT GUIDE

### Backend on Render
1. Push your code to GitHub.
2. Go to [Render](https://render.com/), click "New" -> "Web Service".
3. Connect your GitHub repository.
4. Set the Root Directory to `backend`.
5. Build Command: `npm install`
6. Start Command: `npm start`
7. In the **Environment Variables** section on Render, add:
   - `MONGO_URI`: Your MongoDB Atlas URI
   - `JWT_SECRET`: A long random string
8. Click "Create Web Service".

### Frontend on Vercel
1. Go to [Vercel](https://vercel.com/) and click "Add New" -> "Project".
2. Import your GitHub repository.
3. Edit the "Root Directory" and select `frontend`.
4. The Build settings will auto-detect Vite (`npm run build`).
5. Open "Environment Variables" and add:
   - `VITE_API_URL`: Your Render backend Live URL + `/api` (e.g., `https://my-backend.onrender.com/api`)
6. Click "Deploy".

## FINAL OUTPUT
When you submit your assignment, you should provide:
- **GitHub Repository Link:** E.g., `https://github.com/yourusername/internship-assignment`
- **Live Frontend URL:** E.g., `https://taskflow-frontend.vercel.app`
- **Live Backend URL:** E.g., `https://taskflow-backend.onrender.com`
