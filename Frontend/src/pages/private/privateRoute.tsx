import { Navigate } from "react-router-dom";
import Sidebar from "../../components/navigation/SideBar";
import NavBar from "../../components/navigation/NavBar";
import { Container } from "@mui/material";

const PrivateRoute = ({ component: Component }: any) => {
  const token = localStorage.getItem("token");
  return token ? (
    <Sidebar>
      <NavBar />
      <Component />
    </Sidebar>
  ) : (
    <Navigate to="/login" />
  );
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
