import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.js";
export declare const createNote: (req: AuthRequest, res: Response) => Promise<void>;
export declare const notes: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteNote: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=noteController.d.ts.map