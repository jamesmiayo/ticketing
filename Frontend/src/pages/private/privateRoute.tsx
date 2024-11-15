import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/navigation/SideBar";

const PrivateRoute = ({ component: Component } :any) => {
  const token = localStorage.getItem("token");
  return token ? <Sidebar><Component /></Sidebar> : <Navigate to="/login" />;
  // const { isAuthenticated , loading } = useAuth();

  // return isAuthenticated ? (
  //   <Sidebar>
  //     {children}
  //   </Sidebar>
  // ) : (
  //   <Navigate to="/login" />
  // );
};

export default PrivateRoute;
