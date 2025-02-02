// App.js
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./pages/private/privateRoute.tsx";
import PublicRoute from "./pages/public/publicRoute";
import LoginPage from "./modules/Login/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { LoaderProvider } from "./context/LoaderContext";
import { usePrivateRoutes } from "./pages/private/PrivateRoute.ts";
import { useEffect, useState } from "react";
import useEchoPrivate from "./hooks/useEchoPrivate.ts";

function App() {
  // const [message, setMessage] = useState<string>("");

  // useEffect(() => {
  //   console.log("Initializing Echo...");

  //   // Initialize Echo
  //   const echo = new Echo({
  //     broadcaster: "reverb",
  //     key: "rz3mpqbezzmhrruerym",
  //     wsHost: "localhost",
  //     wsPort: 8080,
  //     forceTLS: false,
  //     encrypted: false,
  //     enabledTransports: ["ws", "wss"],
  //     // auth: {
  //     //   headers: {
  //     //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     //   },
  //     // },
  //   });

  //   console.log("Echo initialized:", echo);

  //   // Subscribe to channel and listen for the event
  //   const channel = echo.channel("channel_for_everyone");

  //   console.log("Subscribing to channel:", channel);

  //   channel.listen("GotMessage", (event: any) => {
  //     console.log("Event received:", event);
  //     setMessage(event.message);
  //   });

  //   // Cleanup function
  //   return () => {
  //     console.log("Leaving channel...");
  //     echo.leaveChannel("channel_for_everyone");
  //   };
  // }, []);
  const handlePrivateEvent = (data) => {
    console.log("Private event received:", data);
  };

  useEchoPrivate("channel_for_everyone", "GotMessage", handlePrivateEvent);
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
                      element={
                        <PrivateRoute
                          title={route.title}
                          component={route.component}
                        />
                      }
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
