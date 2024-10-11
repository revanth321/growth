import express from 'express';
import { adminRegister, adminLogin, getAllAssignments, rejectAssignment, acceptAssignment } from '../controller/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login', adminLogin);
router.post('/register', adminRegister);
router.route('/assignments').get(protect, getAllAssignments);
router.route('/assignments/:id/accept').post(protect, acceptAssignment);
router.route('/assignments/:id/reject').post(protect, rejectAssignment);


export default router;