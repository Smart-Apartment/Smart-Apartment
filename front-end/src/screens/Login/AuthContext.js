// import { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation ,Navigate} from 'react-router-dom';
// import Cookies from 'js-cookie';
// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(false);
//   const [token,setToken]=useState("");

 
//   const handleLogin = async (data) => {
//     const form=new FormData()
//     form.append("username",data.phone_number)
//     form.append("password",data.password)
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/login", form);
//       if(response){
//       setAuth(true);
//       setToken(response.data.access_token);
//       console.log(auth);
//       localStorage.setItem("token", response.data.access_token);
//       localStorage.setItem("auth",true);
      
//       return response;
//       }
      
//     } catch (error) {
//       console.log(error.message);
//       return error;
//     }
//   };
  
//   const handleSpLogin = async (data) => {
//     const form=new FormData()
//     form.append("username",data.phone_number)
//     form.append("password",data.password)
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/login/serviceprovider", form);
//       if(response){
//       setAuth(true);
//       setToken(response.data.access_token);
//       console.log(auth);
//       localStorage.setItem("token", response.data.access_token);
//       localStorage.setItem("auth",true);
      
//       return response;
//       }
      
//     } catch (error) {
//       console.log(error.message);
//       return error;
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("auth");
//     setAuth(false); 
//     return true;
//   };
 
//  const get_cookie=async()=>{
//   const cookie=localStorage.getItem('token');
//   if(cookie){
//   const headers = {
//     Authorization: `Bearer ${cookie}`,
//   };
//   const res=await axios.get('http://localhost:8000/autologin',{headers});
//   console.log("auto login",res);
//   if(res.status===200){
//     setAuth(true);
//     setToken(cookie);
//   }
//   else{
//     setToken(null);
//     setAuth(false);
//     }
//   }
//  }
//  useEffect(()=>{
//   get_cookie();
//  },[])
//  const  ProtectedRoute = ( {children}) => {
//   let location = useLocation();

    // const cookie=localStorage.getItem('token');
    // if(cookie){
    // const headers = {
    //   Authorization: `Bearer ${cookie}`,
    // };
    // const res=await axios.get('http://localhost:8000/autologin',{headers});
    // console.log("auto login",res);
    // if(res.status===200){
      
    //   return children;
  
    // }
    // else{
    //   
  
    //   }
    // }
  
//   console.log("From route",auth,token);
//   if (!auth) {
//     return <Navigate to="/login" state={{ from: location }} />;
//   }
//   return children;
// };
// const  ProtectedLogin = ({  children }) => {
//   let location = useLocation();

  
//     if (auth) {
//       return <Navigate to={location.pathname} />;
//     }
  
//     return children;
  
// };
 

//   return (
//     <AuthContext.Provider value={{  token,handleLogin, handleLogout,handleSpLogin,auth,setAuth,setToken,ProtectedLogin,ProtectedRoute }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// }