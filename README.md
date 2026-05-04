# React JWT Authentication Dashboard

A modern, responsive e-commerce admin dashboard showcasing a complete JSON Web Token (JWT) authentication flow using React, Vite, and Axios.

## 🚀 Features

- **Secure JWT Authentication**: Implements standard token-based authentication.
- **Protected Routing**: Secures private pages from unauthenticated access.
- **Automatic Token Management**: Axios interceptors handle token injection and automatic logouts on expiration.
- **Modern UI**: Custom glassmorphism design, isolated login styling, and a full dashboard layout.

## 🛠️ Technology Stack

- **React** (via Vite)
- **React Router v6** (for Protected Routes)
- **Axios** (for API communication and interceptors)
- **jwt-decode** (for parsing token expiration)
- **Lucide React** (for modern iconography)

---

## 🔐 How The Authentication Works

This application demonstrates a production-grade authentication flow using JSON Web Tokens (JWT). Here is the step-by-step breakdown of how it operates:

### 1. Logging In
When a user submits their credentials on the `/login` page, the request is sent to the `AuthContext`. 
- **Custom User Mock**: If the credentials match `Muhammad Owais` / `owais123`, the system dynamically generates a mock JWT and a mock user profile.
- **Real API Fallback**: If standard demo credentials are used, the application makes a POST request to the [DummyJSON Auth API](https://dummyjson.com/docs/auth).

### 2. Token Storage
Upon a successful login, the server responds with an **`accessToken`** (the JWT) and user profile data. 
- The JWT is immediately stored securely in the browser's `localStorage` as `token`.
- The user profile data is also stored in `localStorage` so the UI can persist across page reloads.

### 3. Protected Routes
The application uses a custom `<ProtectedRoute>` component. Before rendering the Dashboard, this component checks the `AuthContext` to see if a valid user session exists. If it doesn't, the user is forcefully redirected back to the login screen.

### 4. API Interceptors (The Magic)
We use **Axios Interceptors** in `api.js` to handle tokens automatically:
- **Request Interceptor**: Before any API request is sent, this interceptor grabs the token from `localStorage` and automatically attaches it to the request headers like so: `Authorization: Bearer <token>`.
- **Response Interceptor**: If the backend ever responds with a `401 Unauthorized` error (which happens if a token is modified, invalid, or expired), the interceptor catches it globally, clears the `localStorage`, and safely kicks the user back to the login screen.

### 5. Token Expiration Handling
Every time the application mounts (like when a user refreshes the page), the `AuthContext` uses the `jwt-decode` library. 
A JWT consists of three parts (Header, Payload, Signature). `jwt-decode` safely reads the *Payload* to check the `exp` (expiration) timestamp. If the current time is past the expiration time, the context automatically logs the user out without even needing to ask the backend!

---

## 🧪 Testing the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```
2. **Navigate to the app** in your browser.
3. You will be prompted with the **Login Screen**.
4. Use the predefined custom credentials to test the flow:
   - **Username**: `Muhammad Owais`
   - **Password**: `owais123`
5. Upon signing in, you will be directed to the **Admin Dashboard** where your session is maintained via the JWT. You can refresh the page, and your session will persist until you click **Log Out**.
