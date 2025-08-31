import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; // frontend move token from LS to headers.
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // attach userId directly
        next();
    }
    catch (err) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};
//# sourceMappingURL=auth.js.map