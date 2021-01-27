const express = require("express");
const passport = require("passport")
const boom = require("@hapi/boom")
const cookieParser = require("cookie-parser")
const axios = require("axios");
const cors = require("cors")

const { frontendRoutes } = require("./routes")

const { config } = require("./config");

const app = express();

//Body parse 
app.use(cookieParser())
app.use(express.json())
app.use(cors())

//View engine "ejs"
app.set("view engine", "ejs");
app.use('/static', express.static(`public`))
// BasicStrategy
require("./utils/auth/strategies/basic")
// BasicStrategy

//OAuth 2.0 Strategy
require("./utils/auth/strategies/oAuth")
//OAuth 2.0 Strategy

//Routes FRONTEND
frontendRoutes(app)
//Routes AUTH
app.post("/auth/sign-in", async function(req, res, next) {
  
  passport.authenticate("basic", (err, data) => {
    try {
      if(err || !data){
        next(boom.unauthorized())
      }

      req.login(data, {session: false}, async(error)=>{
        if( error || !data ) return next(boom.unauthorized())
        const {token, ...user} = data;
         
      ///PROBLEMA CON LA COOKIE
      res.cookie("token", token, {
        httpOnly: !config.dev,
        secure: !config.dev,
      });
      res.status(200).json(user)
      
    })
    } catch (error) {
      next(error)
    }
  })(req, res, next)  
});

app.post("/auth/sign-up", async function(req, res, next) {
  const {body: user} = req;
  try {
    const { status }= await axios({
      method: "post", 
      url: `${config.apiUrl}/api/auth/sign-up`,
      data: {
        user,
        apiKeyToken: config.apiKeyToken 
      }
    })

    if (status === 201) {
      res.status(201).json({message: "User created"})
    } else {
      next(boom.badImplementation())
    }
  } catch (error) {
      next(error)
  }
});

app.get("/movies/:token/:id", async function(req, res, next) {
  try {
    
    const {id, token} = req.params
    
    const {data, status} = await axios({
      method: "get",
      url: `${config.apiUrl}/api/movies/${id}`,
      headers: { 
        Accept:"*/*",
        Authorization: `Bearer ${token}`
      },
    })  

    if(status !== 200){
      return next(boom.unauthorized())
    }
    
    res.status(200).json(data)

  } catch (error) {
    next(error)
  }
}); 
app.get("/movies/:token", async function(req, res, next) {
  try {

    const { token } = req.params
    const {data, status} = await axios({
      method: "get",
      url: `${config.apiUrl}/api/movies`,
      headers: { 
        Accept:"*/*",
        Authorization: `Bearer ${token}`
      },
    })  

    if(status !== 200){
      return next(boom.unauthorized())
    }
    
    res.status(200).json(data)

  } catch (error) {
    next(error)
  }
}); 

app.post("/user-movies",async  function(req, res, next) {
  try {
    const { body: userMovie } = req
    const { token } = req.cookies
    
    const { data, status } = await axios({
      method: "post",
      url: `${config.apiUrl}/api/user-movies`,
      headers: { 
        Accept:"*/*",
        Authorization: `Bearer ${token}`
    },
    data: userMovie
    })  
    
    if(status !== 201){
      return next(boom.badImplementation())
    }

    res.status(201).json(data)
    
  } catch (error) {
      next(error)
  }
});

app.delete("/user-movies/:userMovieId", async function(req, res, next) {
  try {
    const { userMovieId } = req.params
    const { token } = req.cookies  

    const {data, status} = await axios({
      method: "delete",
      url: `${config.apiUrl}/api/user-movies/${userMovieId}`,
      headers: { 
        Accept:"*/*",
        Authorization: `Bearer ${token}`
      },
    })  
    if(status !== 200){
      return next(boom.badImplementation())
    }
    
    res.status(200).json(data)

  } catch (error) {
    next(error)
  }
});

app.get("/auth/google-oauth", passport.authenticate("google-oauth", {
  
  scope: ["email", "profile", "openid"]
}))

app.get("/auth/google-oauth/callback",passport.authenticate("google-oauth" , { session: false}), (req, res, next)=>{
  if (!req.user) {
    return next(boom.unauthorized())
  }

  const {token, user} = req.user

  res.cookie("token",token,{
    httpOnly: !config.dev,
    secure: !config.dev
  })

  res.status(200).json(user)


})

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});