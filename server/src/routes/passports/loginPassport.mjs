import {Strategy} from "passport-local"
import bcrypt from "bcrypt"
import db from "../../database/database.mjs"
import passport from "passport"


passport.use("local", new Strategy ({usernameField: "email",passwordField: "password"},
    async (username, password, done)=>{
        const response = await db.query("SELECT * FROM users WHERE email = $1", [username])
        try{
            if(response.rows.length > 0){
                const user = response.rows[0]
                const userPassword = user.password

                bcrypt.compare(password, userPassword, (err, hashed)=>{
                    if(err){
                        console.error("Error comparing passwords:", err);
                        return done(null, false);
                    }else{
                        if(hashed){
                            return done(null, user)
                        }else{
                            console.error("Error Encryption");
                            return done(err, false)
                        }
                    }
                })

            }else{
                done(null, false)
            }

        }catch(err){
            console.error( err);
            return done(err, false)
        }
        
}))


passport.serializeUser((user, done)=>{
    return done(null, user.id)
})

passport.deserializeUser( async(user, done)=>{
    const response = await db.query("SELECT * FROM users WHERE id = $1", [user])
    const email = response.rows[0].email
    try{
        if(response.rows.length < 1){
            throw new Error ("User not found")
        }else{
            return done(null, email)
        }

    }catch(err){
        return done(err, null)
    }
})
