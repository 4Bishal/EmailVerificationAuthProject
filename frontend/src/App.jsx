import { HashRouter, Routes, Route, Navigate } from "react-router-dom"
import { Home } from './pages/Home.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { EmailVerificationPage } from './pages/EmailVerificationPage.jsx'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from "./store/authStore.jsx"
import { useEffect } from "react"
import { LoadingSpinner } from "./component/LoadingSpinner.jsx"
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage.jsx"
import { ResetPasswordPage } from "./pages/ResetPasswordPage.jsx"
import { NotFound } from "./pages/NotFound.jsx"


// protected Route for unauthenticated User
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />
  }

  return children;
}


// redirect authenticated user
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />
  }

  return children;
}

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (isCheckingAuth) {
    return <LoadingSpinner />
  }

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/register" element={
            <RedirectAuthenticatedUser>
              <RegisterPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/login" element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path='/verify-email' element={<EmailVerificationPage />} />
          <Route path='/forgot-password' element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path='/reset-password/:token' element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          } />
          {/* catch all routes */}
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Toaster />
      </HashRouter>
    </>
  )
}

export default App
