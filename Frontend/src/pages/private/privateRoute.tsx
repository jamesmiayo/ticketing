import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/navigation/SideBar";

const PrivateRoute = ({ children }: any) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Sidebar>{children}</Sidebar>;
};

export default PrivateRoute;
