const express = require("express")
const axios = require("axios")
const base64 = require("base-64")
const { config } = require("../config")

function decodePayloadJWT(token) {
    let payloadEncode = token.split(".")[1]
    let payloadDecode = JSON.parse(base64.decode(payloadEncode))
    return payloadDecode

}

function routesFrontend(app) {
    const router = express.Router()
    app.use("/", router)

    router.get("/", (req, res, next) => {
        res.render("sign-up")
    })
    router.get("/initial-view", async (req, res, next) => {
        try {

            let { token } = req.cookies
            if (!token) return res.redirect("/login")

            // Get User-Movies
            let userMovies = await axios({
                method: "get",
                url: `${config.hostUri}/user-movies/${token}`,
            })
            let userMoviesListed = userMovies.data.data
            // Get All Movies
            let { data } = await axios({
                method: "get",
                url: `${config.hostUri}/movies/${token}`,
            })
            // Token Paylod in JSON
            let tokenPaylod = decodePayloadJWT(token)

            let movies = data.data
            res.render("initial-view", {
                movies,
                nameUser: tokenPaylod.name,
                userId: tokenPaylod.sub,
                userMoviesListed
            })
        } catch (error) {
            res.redirect("/login")
        }
    })

    router.get("/sign-up", (req, res, next) => {
        res.render("sign-up")
    })

    router.get("/login", (req, res, next) => {
        res.render("login")
    })
    router.get("/media-player/:video_url", async (req, res, next) => {
        let { video_url } = req.params
        const decodeVideoUrl = base64.decode(video_url)
        res.render("media-player", { decodeVideoUrl })
    })

    router.post("/logout", async (req, res, next) => {
        try {
            res.cookie("token", "logout", {
                httpOnly: !config.dev,
                secure: !config.dev
            })
            res.status(200).json({
                message: "logout"
            })
        } catch (error) {

        }
    })

}

module.exports = routesFrontend