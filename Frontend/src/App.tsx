// App.js
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./pages/private/privateRoute.tsx";
import PublicRoute from "./pages/public/publicRoute";
import LoginPage from "./modules/Login/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { LoaderProvider } from "./context/LoaderContext";
import { usePrivateRoutes } from "./pages/private/PrivateRoute.ts";

function App() {
  const newPrivateRoutes = usePrivateRoutes();

  return (
    <AuthProvider>
      <ToastProvider>
        <LoaderProvider>
          <BrowserRouter future={{ v7_startTransition: true }}>
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

              {newPrivateRoutes.privateRoutes.map(
                (route) =>
                  route.show && (
                    <Route
                      key={String(route.id)}
                      path={route.path}
                      element={<PrivateRoute component={route.component} />}
                    />
                  )
              )}
            </Routes>
          </BrowserRouter>
        </LoaderProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
