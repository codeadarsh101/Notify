import noteModel from "../models/noteModel.js";
// create notes.
export const createNote = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// get notes
export const notes = async (req, res) => {
    try {
        const userNotes = await noteModel.find({ userId: req.userId }).sort({
            createdAt: -1,
        });
        res.json({ success: true, notes: userNotes });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// Delete Note..
export const deleteNote = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
//# sourceMappingURL=noteController.js.map