const express = require("express")
const axios = require("axios")
const base64 = require("base-64")
const {config} = require("../config")
function routesFrontend(app){
    const router = express.Router()
    app.use("/", router)
    
    router.get("/", (req, res, next)=>{
        res.render("sign-up")
    })
    router.get("/initial-view",async (req, res, next)=>{
        try {
            
            let { token } = req.cookies
            if (!token) return res.redirect("/login")
            let {data, status } =  await axios({
                method: "get",
                url:`${config.hostUri}/movies/${token}`,
            })

            let movies = data.data
            res.render("initial-view", { movies })
        } catch (error) {
            res.redirect("/login")
        }
    })
    
    router.get("/sign-up", (req, res, next)=>{
        res.render("sign-up")
    })
    
    router.get("/login",  (req, res, next)=>{
        res.render("login")
    })
    router.get("/media-player/:video_url", async  (req, res, next)=>{
        let { video_url } = req.params
        const decodeVideoUrl = base64.decode(video_url)
        res.render("media-player", {decodeVideoUrl})
    })
    
}

module.exports = routesFrontend