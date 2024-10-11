import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import Assignment from "../models/assignmentModel.js";
import { assignmentStatus } from "../utils/assignmentStatus.js";



const userLogin = asyncHandler(async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({email: email});
    if(user && (await user.matchPasswords(password)) && user.admin === false) {
        const token = generateToken(user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            password: user.password,
            token: token
        })
    } else {
        res.status(400);
        throw new Error("Invalid email or password")
    }
});

const userRegister = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email: email});
    if(userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name, email, password, admin: false
    })

    if(user) {
        const token = generateToken(user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            password: user.password,
            token: token
        })
    } else {
        res.status(400);
        throw new Error("Invalid User data")
    }
});

const userUploadAssignment = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const userName = req.user.name;
    const task = req.body.task;
    const adminName = req.body.admin;
    const admin = await User.findOne({name: adminName});

    if(!admin) {
        res.status(400);
        throw new Error("Admin does not exist");
    }
    const adminId = admin._id;
    const assignment = await Assignment.create({
        userId, userName, task, adminId, adminName, status: assignmentStatus.NA
    });

    if(assignment) {
        res.status(201).json({
           userId, task, admin
        })
    } else {
        res.status(400);
        throw new Error("Invalid Assignment data")
    }
})



export { userLogin, userRegister, userUploadAssignment };