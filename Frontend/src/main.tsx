import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PermissionProvider } from "./helpers/Providers/PermissionProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <PermissionProvider>
    <App />
  </PermissionProvider>
);
