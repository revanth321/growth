import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import Assignment from "../models/assignmentModel.js";
import { assignmentStatus } from "../utils/assignmentStatus.js";

const adminLogin = asyncHandler(async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({email: email});
    if(user && (await user.matchPasswords(password)) && user.admin === true) {
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

const adminRegister = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email: email});
    if(userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name, email, password, admin: true
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

const getAllAdmins = asyncHandler(async (req, res) => {
    const admins = await User.find({admin: true}).select('-password');
    res.status(201).json({
       admins: admins
    })

})

const getAllAssignments = asyncHandler(async (req, res) => {
    const adminName = req.user.name;

    if(!req.user.admin) {
        res.status(403);
        throw new Error("User is not an admin");
    }

    const assignments = await Assignment.find({admin});
    res.status(201).json({
        assignments: assignments
     })
});

const acceptAssignment = asyncHandler(async (req, res) => {
    const assignmentId = req.params.id;

    if(!req.user.admin) {
        res.status(403);
        throw new Error("User is not an admin");
    }

    const updateAssignment = {
        $set: {
           status: assignmentStatus.ACCEPTED
        },
     };
    const assignment = await Assignment.updateOne({assignmentId}, updateAssignment);
    res.status(201).json({
        assignment: assignment
     })
});

const rejectAssignment = asyncHandler(async (req, res) => {
    const assignmentId = req.params.id;

    if(!req.user.admin) {
        res.status(403);
        throw new Error("User is not an admin");
    }

    const updateAssignment = {
        $set: {
           status: assignmentStatus.REJECTED
        },
     };
    const assignment = await Assignment.updateOne({assignmentId}, updateAssignment);
    res.status(201).json({
        assignments: assignment
     })
});



export { adminLogin, adminRegister, getAllAdmins, getAllAssignments, acceptAssignment, rejectAssignment };