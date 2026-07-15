const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async(req, res, next) => {
    console.log("HEADERS =", req.headers.authorization);

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    console.log("TOKEN =", token);
    console.log("JWT_SECRET =", process.env.JWT_SECRET);
    try {

        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DECODED =", decoded);


        req.user = await User.findById(decoded.id).select("-password");
        console.log("USER =", req.user);


        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid Token",
        });

    }
};