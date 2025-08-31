import React, { FC, useContext, useState, useEffect } from "react";
import top from "../assets/logo.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import deletelogo from "../assets/delete.png";

interface INote {
  _id: string;
  title: string;
  content: string;
}

const DashboardCard: FC = () => {
  const navigate = useNavigate();

  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Auth must be used inside AppContextProvider");
  }

  const { user, setUser, setShowLogin, backendUrl } = context;

  const [notesList, setNotesList] = useState<INote[]>([]); //store all the notes..
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  //fetch notes..
  const fetchNotes = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotesList(data.notes || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if(user){
       fetchNotes();
    }
   
  }, [user]);

  // for create notes..

  const handleCreateNote = async () => {
    if (!newNote.trim()) return;

    try {
      const { data } = await axios.post(
        `${backendUrl}/notes`,
        { content: newNote },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotesList((prev) => [...prev, data.note]);
      setNewNote(""); // remove note content..
    } catch (err) {
      console.error(err);
    }
  };
  
  // Delete notes.
  const handleDeleteNote = async (id: string) => {
    try {
      await axios.delete(`${backendUrl}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotesList((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setShowLogin(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between h-16 px-4 shadow-md">
        <div className="flex items-center space-x-3 cursor-pointer">
          <img src={top} width={40} alt="logo" />
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base"
          >
            LogOut
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-6 px-4">
        <div className="w-80 flex items-center flex-col shadow-md bg-white text-black p-4 rounded-lg">
          <h1 className="text-lg font-medium">Welcome, {user?.name}</h1>
          <span className="text-sm text-gray-600">Email: {user?.email}</span>
        </div>
      </div>

      <div className="flex justify-center items-center mt-7 space-x-2">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter note content"
          className="border p-2 rounded-l-md w-80"
        />
        <button
          onClick={handleCreateNote}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-r-md"
        >
          Create Note
        </button>
      </div>

      <div className="flex justify-center flex-col items-center mt-3 space-y-3">
        {notesList.map((note) => (
          <div
            key={note._id}
            className="w-4/5 flex items-center justify-between shadow-md bg-blue-200 p-3 rounded-lg"
          >
            <span className="text-black font-sans font-semibold">
              {note.content}
            </span>
            <img
              src={deletelogo}
              className="w-5 h-5 cursor-pointer "
              onClick={() => handleDeleteNote(note._id)}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default DashboardCard;
