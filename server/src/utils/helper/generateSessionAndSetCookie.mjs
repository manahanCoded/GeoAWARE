import env from "dotenv"

env.config()

const generateSessionAndSetCookie = (userId, req, res) => {

    req.session.userId = userId;
    req.session.authenticated = true;
  
    
    res.cookie('GeoAwareSession', process.env.COOKIE_VALUE, {
      httpOnly: true,
      maxAge: 60000 * 60,
      signed: true
    });
  };

export default generateSessionAndSetCookie
