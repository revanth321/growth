import express from 'express';
import { getAllAdmins } from '../controller/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { userLogin, userRegister, userUploadAssignment } from '../controller/UserController.js';
const router = express.Router();

router.post('/login', userLogin);
router.post('/register', userRegister);
router.route('/admins').get(protect, getAllAdmins);
router.route('/upload').post(protect, userUploadAssignment)

export default router;