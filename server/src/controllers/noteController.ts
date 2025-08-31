import { Request, Response } from "express";
import noteModel from "../models/noteModel.js";
import { AuthRequest } from "../middlewares/auth.js"; // extends Request with userId

// create notes.
export const createNote = async (req: AuthRequest,res: Response): Promise<void> => {
  try {
    const { content } = req.body;

    if (!content) {
      res.status(400).json({ success: false, message: "Content is required" });
      return;
    }

    const note = await noteModel.create({
      userId: req.userId,
      content,
    });

    res.status(201).json({ success: true, note });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get notes
export const notes = async (req: AuthRequest, res: Response): Promise<void> => {

  try {
    const userNotes = await noteModel.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.json({ success: true, notes: userNotes });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Note..

export const deleteNote = async (req: AuthRequest,res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const note = await noteModel.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!note) {
      res
        .status(404)
        .json({ success: false, message: "Note not found or unauthorized" });
      return;
    }

    res.json({ success: true, message: "Note deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
