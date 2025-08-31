import { createContext, useState, ReactNode } from "react";

type AppContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  showLogin: any;
  setShowLogin: React.Dispatch<React.SetStateAction<any>>;
  backendUrl:any
};

export const AppContext = createContext<AppContextType | undefined>(undefined);



const AppContextProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<any>(false);
  const [showLogin, setShowLogin] = useState<any>(false);

    const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  return (
    <AppContext.Provider value={{ user, setUser, showLogin, setShowLogin,backendUrl }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
