// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PrivateRoute from "./pages/private/privateRoute";
import PublicRoute from "./pages/public/publicRoute";
import LoginPage from "./modules/Login/LoginPage";
import DashboardPage from "./modules/Dashboard/DashboardPage";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { LoaderProvider } from "./context/LoaderContext";
import TicketInformationPage from "./modules/TicketInformation/TicketInformationPage";
import UserDashboardPage from "./modules/UserDashboard/UserDashboardPage";
import TicketPage from "./modules/Ticketing/TicketPage";
import MaintenancePage from "./modules/Maintenance/MaintenancePage";

const privateRoutes = [
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/ticket-information",
    element: <TicketInformationPage />,
  },
  {
    path: "/your-dashboard",
    element: <UserDashboardPage />,
  },
  {
    path: "/ticket",
    element: <TicketPage />,
  },
  {
    path: "/maintenance",
    element: <MaintenancePage />,
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
