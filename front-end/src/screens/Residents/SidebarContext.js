import { createContext } from "react";

export const SidebarContext = createContext();

// export const useSidebarContext = () => useContext(SidebarContext);

// export default function SidebarProvider({ children }) {
//   const [menuCollapse, setMenuCollapse] = useState(false);

//   function setMenuCollapsed (isCollapsed) {
//     setMenuCollapse(isCollapsed);
//   };

//   return (
//     <SidebarContext.Provider value={{ menuCollapse }}>
//       {children}
//     </SidebarContext.Provider>
//   );
// }
