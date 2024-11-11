// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./pages/private/privateRoute";
import PublicRoute from "./pages/public/publicRoute";
import LoginPage from "./modules/Login/LoginPage";
import DashboardPage from "./modules/Dashboard/DashboardPage";
import { AuthProvider } from "./context/AuthContext";

const privateRoutes = [
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
];

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
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
    </AuthProvider>
  );
}

export default App;
