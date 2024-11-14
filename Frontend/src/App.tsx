// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import PrivateRoute from "./pages/private/privateRoute";
import PublicRoute from "./pages/public/publicRoute";
import LoginPage from "./modules/Login/LoginPage";
import DashboardPage from "./modules/Dashboard/DashboardPage";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { LoaderProvider } from "./context/LoaderContext";
import UserPage from "./modules/UsersProfile/UserPage";
import TicketInformationPage from "./modules/TicketInformation/TicketInformationPage";

const privateRoutes = [
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/ticket-information",
    element: <TicketInformationPage />,
  },
];

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <LoaderProvider>
          <BrowserRouter>
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
          </BrowserRouter>
        </LoaderProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
