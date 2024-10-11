import asyncHandler from 'express-async-handler';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/userModel.js';
// @desc       Protect routes (authentication middleware)
// @route      Middleware function, no specific route
// @access     Private (used for protecting routes)
const protect = asyncHandler(async (req, res, next) => {
    let token;
    console.log(req);
    // @desc   Extract the token from the request header
    token = req.header('jwt');

    if(token) {
        try {
            // @desc   Verify the token
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            // @desc   Find the user by decoded token's userId and attach to req object, exclude password
            req.user = await User.findById(decoded.userId).select('-password');
            // @desc   Move to the next middleware/route
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Invalid Token");
        }
    } else {
        res.status(401);
        throw new Error("No Token");
    }
});

export {protect};
