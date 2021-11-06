import express from "express";
import {home, auth} from "./../controllers/index";
import {authValid} from "./../validation/index";
import passport from "passport";
import initPassportLocal from "./../controllers/passportController/local";

//Init all passport
initPassportLocal();

let router = express.Router();

/**
 * Init all routes
 * @param app from exactly express module
 */
let initRoutes = (app) =>{
    router.get("/",home.getHome);
    router.get("/loginRegister",auth.getLoginRegister);
    router.post("/register",authValid.register,auth.postRegister);
    router.get("/verify/:token",auth.verifyAccount);

    router.post("/login", passport.authenticate("local",{
        successRedirect: "/",
        failureRedirect: "/loginRegister",
        successFlash: true,
        failureFlash: true
    }));   
    return app.use("/",router);
};

module.exports = initRoutes;
