import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import Assignment from "../models/assignmentModel.js";
import { assignmentStatus } from "../utils/assignmentStatus.js";
// @desc       Admin login
// @route      POST /api/admin/login
// @access     Public
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
// @desc       Admin registration
// @route      POST /api/admin/register
// @access     Public
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
// @desc       Get all admins
// @route      GET /api/admins
// @access     Private
const getAllAdmins = asyncHandler(async (req, res) => {
    const admins = await User.find({admin: true}).select('-password');
    res.status(201).json({
       admins: admins
    })

})
// @desc       Get all assignments for an admin
// @route      GET /api/admin/assignments
// @access     Private
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
// @desc       Accept an assignment
// @route      POST /api/admin/assignments/:id/accept
// @access     Private
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
// @desc       Reject an assignment
// @route      POST /api/admin/assignments/:id/reject
// @access     Private
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
