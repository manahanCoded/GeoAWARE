import express from "express"
import env from "dotenv"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import session from "express-session"
import passport from "passport"
import cors from "cors"


//Import routes
import userRoutes from "./src/routes/userRoutes.mjs"
import mapRoutes from "./src/routes/crimeRoutes.mjs"

const app = express()

env.config()
const port = process.env.PORT || 5000

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
}))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(
    session({
       name: 'GeoAwareSession',
      secret: process.env.SESSION_SECRET, 
      resave: false,                      
      saveUninitialized: false,          
      cookie: { maxAge: 60000 * 60, httpOnly: true, signed: true } 
    })
  );

app.use(passport.initialize())
app.use(passport.session())

//routes
app.use("/api/users", userRoutes)
app.use("/api/map", mapRoutes)



app.listen(port, ()=> console.log(`Server Port ${port} is now running...`))