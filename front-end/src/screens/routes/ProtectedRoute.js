import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import Cookies from "js-cookie";

export const ProtectedRoute = ({children}) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};
export const ProtectedLogin=({children})=>{
  const {token}=useAuth();
  
    Cookies.remove('token');
    
  
  return children;
}