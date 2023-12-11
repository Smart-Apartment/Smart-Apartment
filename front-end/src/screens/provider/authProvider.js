import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(Cookies.get("token")); 
  const [image,setImage_]=useState(false);
  const setImage = (props) => {
    setImage_(props);
  };

  const setToken = (newToken) => {
    setToken_(newToken);
  };
 
  useEffect(() => {
    if (token) {
       axios.defaults.headers.common= {
        'Authorization': `Bearer ${token}`
      };
      Cookies.set("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      Cookies.remove("token");
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      image,
      setImage
    }),
    [token,image]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
