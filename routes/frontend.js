const express = require("express")

function routesFrontend(app){
    const router = express.Router()
    app.use("/", router)

    router.get("/", (req, res, next)=>{
        res.render("sign-up")
    })

    router.get("/", (req, res, next)=>{
        res.render("sign-up")
    })

    router.get("/", (req, res, next)=>{
        res.render("sign-up")
    })
}

module.exports = routesFrontend