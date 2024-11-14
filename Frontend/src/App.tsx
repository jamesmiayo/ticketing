import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correcting the import for BrowserRouter
import PrivateRoute from './pages/private/privateRoute';
import PublicRoute from './pages/public/publicRoute';
import LoginPage from './modules/Login/LoginPage';
import DashboardPage from './modules/Dashboard/DashboardPage';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { LoaderProvider } from './context/LoaderContext';

const privateRoutes = [
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
];

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <LoaderProvider>
          <Router> 
            <Routes>
            <Route index element={<LoginPage />} />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />

              {privateRoutes.map((route, index) => (
                <Route
                  key={`private-${index}`}
                  path={route.path}
                  element={<PrivateRoute>{route.element}</PrivateRoute>}
                />
              ))}
            </Routes>
          </Router>
        </LoaderProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
