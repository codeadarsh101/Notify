import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";

const Landing: React.FC = () => {
  

  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Auth must be used inside AppContextProvider");
  }

  const { user, setShowLogin } = context;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        initial={{ opacity: 0.2, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        viewport={{ once: true }}
        className="bg-teal-200 shadow-lg rounded-lg py-40 px-20 text-center"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Welcome to Notify App..
        </h1>
        <button
          onClick={() => setShowLogin(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
      </motion.div>
    </div>
  );
};

export default Landing;
