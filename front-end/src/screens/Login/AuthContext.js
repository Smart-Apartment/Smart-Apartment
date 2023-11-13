import { createContext, useContext, useState } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const handleLogin =  (data) => {
    if(data.name==='Arun' && data.password==="Password@1")
    {
        console.log('Before login:', userIsLoggedIn);
         setUserIsLoggedIn((prev) => !prev);
        console.log('After login:', userIsLoggedIn);
        return true;

    }
  };
  
  const handleLogout = () => {
    setUserIsLoggedIn(false);
    console.log(userIsLoggedIn);
    
  };

  return (
    <AuthContext.Provider value={{ userIsLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
