import db from "../../database/database.mjs"
import { validationResult, matchedData } from "express-validator";
import bcrypt from "bcrypt"
import generateSessionAndSetCookie from "../../utils/helper/generateSessionAndSetCookie.mjs";
import passport from "passport";
import "../passports/loginPassport.mjs"

const saltRounds = 10


const signupUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = matchedData(req);
  
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
      if (result.rows.length > 0) {
        return res.status(400).json({ error: "Email is already in use" });
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
   
      const newUser = await db.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, hashedPassword]
      );
  
      const userInfo = newUser.rows[0];
  
      req.login(userInfo, (err) => {
        if (err) {
          console.error("Login error after signup:", err);
          return res.status(500).json({ error: "Login failed after signup" });
        }
  
        return res.status(201).json({
          id: userInfo.id,
          username: userInfo.username,
          email: userInfo.email,
        });
      });
    } catch (err) {
      console.error("Signup error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };


const loginUser = (req,res)=>{
    passport.authenticate("local", (err, user, info)=>{
    
        if(err){
            console.error("Authentication error:", err);
            return res.status(500).json({error: "Internal server error"})
        }
        if(!user){
            return res.status(400).json({error: "Invalid Credentials"})
        }

        req.login(user, (err)=>{
            if(err){
                console.error("Login Error line 59:", err)
                return res.status(500).json({error: "Internal server error"})
            }

            return res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
              });
        })

    })(req, res);
}

const logoutUser = (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: "No user logged in" });
        }

        req.logout((err) => {
            if (err) {
                console.error("Error during Logout:", err);
                return res.status(500).json({ error: "Logout failed" });
            }

            
            res.status(200).cookie("GeoAware","",{maxAge:1}).json({ message: "Logout successful" });
        });
    } catch (err) {
        console.error("Error during Logout:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export {signupUser , loginUser ,logoutUser }