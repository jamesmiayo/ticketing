import { Navigate } from "react-router-dom";
import Sidebar from "../../components/navigation/SideBar";
import NavBar from "../../components/navigation/NavBar";
import { useEffect } from "react";

const PrivateRoute = ({ component: Component , title }: any) => {
  useEffect(() => {
    if (title) {
      document.title = title; 
    }
  }, [title]);
  
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
