import asyncHandler from 'express-async-handler';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;
    console.log(req);
    token = req.header('jwt');

    if(token) {
        try {
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
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