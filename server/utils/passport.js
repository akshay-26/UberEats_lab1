"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("../Config")
const Customer = require('../model/CustomerDetails');


// Setup work and export for the JWT passport strategy
function auth() {
    console.log(secret)
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: "cmpe273_secret_key"
    };
    console.log(" am here")
    passport.use(
        
        new JwtStrategy(opts, (jwt_payload, callback) => {
            const user_id = jwt_payload.CustomerId;
            Customer.findOne({CustomerId:user_id}, (err, results) => {
                if (err) {
                    return callback(err, false);
                }
                if (results) {
                    callback(null, results);
                }
                else {
                    callback(null, false);
                }
            });
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });


