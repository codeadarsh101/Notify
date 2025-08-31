import React,{useContext} from "react";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import Auth from "./pages/Auth";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App: React.FC = () => {

  const context = useContext(AppContext);
    if (!context) {
      throw new Error("Auth must be used inside AppContextProvider");
    }

    const {showLogin} = context;

  return (
    <div
      className="px-2 sm:px-10 md:px-14 lg:px-28
       min-h-screen bg-gradient-to-b from-teal-50
       to-orange-50"
    >
       <ToastContainer position="bottom-right"/>
        {showLogin && <Auth/>}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
