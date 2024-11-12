import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/navigation/SideBar";

const PrivateRoute = ({ children }: any) => {
  const { isAuthenticated , loading } = useAuth();
  
  if (loading) {
    return ; 
  }

  return isAuthenticated ? (
    <Sidebar>
      {children}
    </Sidebar>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
