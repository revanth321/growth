import mongoose from "mongoose";

const assignmentSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true,
    },
    adminId: {
        type: String,
        required: true
    },
    adminName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false
    },

}, {
    timestamps: true
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;