import { Route, Router, RouterProvider, createBrowserRouter,Routes } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";

import Navbar from "../Header/Header";
import HomeScreen from "../Home/HomeScreen";
import { Register } from "../Register/Register";
import UserDashBoard from "../Visitor/UserDashboard";
import Sidebar from "../Visitor/Sidebar";
import Profile from "../Visitor/ProfileForm";

import { LoginScreen } from "../Login/LoginScreen";
const MyRoutes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: "/",
      element: <><Navbar/><HomeScreen /></>,
    },
    {
      path: "/signup",
      element:<><Navbar/><Register /></>,
    },
  ];

  const routesForAuthenticatedOnly = [
    
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    {
      path: "/login",
      element: <LoginScreen/>,
    },
    
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
      <Route path="/user/visitor" element={<ProtectedRoute children={<><Sidebar/></>}/>}/> 
  ]);

  return <RouterProvider router={router} />;
};

export default MyRoutes;
// const MyRoutes=()=>{
//   const {ProtectedRoute,ProtectedLogin}=useAuth();
//   return(
    
//     <Routes>
//     <Route path="/" element={<><Navbar/><HomeScreen /></>} />
//               <Route path="/register" element={<><Navbar/><Register /></>} />
//               <Route
//               path="/login"
//               element={ <><Navbar/><LoginScreen/></>}
//               /> 
//               <Route
//               path="/login/serviceprovider"
//               element={ <><Navbar/><SpLoginScreen/></>}
//               />                 
//             <Route path="/visitorLogin" element={<><Navbar/><VisitorLogin /></>} />
//             <Route
//         path="/user/dashboard"
//         element={ <ProtectedRoute><Sidebar /><UserDashBoard /></ProtectedRoute>}
//       />
//     <Route
//         path="/user/visitor"
//         element={ <ProtectedRoute><Sidebar /><VisitorTable /></ProtectedRoute>}
//       />
                            
//       <Route
//         path="/user/profile"
//         element={ <ProtectedRoute><Sidebar /><Profile /></ProtectedRoute>}
//       >
//     </Route>
//       <Route
      
//         path="/service/profile"
//         element={<ProtectedRoute><SpSidebar /><ServiceProvider/></ProtectedRoute>}
//       ></Route>
//       <Route
//         path="/service/bookings"
//         element={<ProtectedRoute><SpSidebar /><Bookings /></ProtectedRoute>}
//       ></Route>
//       <Route
//         path="/service/history"
//         element={ <ProtectedRoute><SpSidebar /><BookingHistory /></ProtectedRoute>}
//       ></Route>
//       <Route
//         path="/user/complaint"
//         element={ <ProtectedRoute><Sidebar /><ServiceList /></ProtectedRoute>}
//       ></Route>
//       <Route
//         path="/user/history"
        
//         element={<ProtectedRoute><Sidebar /><ServiceResult /></ProtectedRoute> }
//       ></Route>
//       <Route
//         path="/security/profile"
//         element={ <ProtectedRoute><SecSideBar /><ServiceProvider /></ProtectedRoute>}
//       ></Route>
//      <Route
//         path="/security/visitor"
//         element={<ProtectedRoute><SecSideBar /><VisitorManagementSystem /></ProtectedRoute>}
//       ></Route>
//      <Route
//         path="/security/logbook"
//         element={<ProtectedRoute><SecSideBar /><VisitorHistory /></ProtectedRoute>}
//       /> 
//       </Routes>
//   )
// }
