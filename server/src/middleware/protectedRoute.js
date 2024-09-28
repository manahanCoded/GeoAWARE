import db from "../database/database.mjs";
import env from "dotenv";
env.config();

const protectedRoute = async (req, res, next) => {
  
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized. User not authenticated." });
    }
    
    const userId = req.params?.id;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. No userId found in session." });
    }

    const user = await db.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    req.userId = userId;

    next();
  } catch (err) {
    console.error("Error in protectedRoute:", err.message);
    return res.status(500).json({ message: err.message });
  }
};

export default protectedRoute;
