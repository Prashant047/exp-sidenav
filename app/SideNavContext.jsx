"use client"
import { useState, useContext, createContext} from 'react';

const SideNavContext = createContext();

export function useSideNav(){
  const { isExpanded, setNavExpand } = useContext(SideNavContext);
  return {
    isExpanded, setNavExpand
  };
}

export function SideNavContextProvider({ children }){
  const [isExpanded, setNavExpand] = useState(true)
  return (
    <SideNavContext.Provider value={{isExpanded, setNavExpand}}>
      { children }
    </SideNavContext.Provider>
  );
}