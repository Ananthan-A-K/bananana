import { Router } from 'express';
import { login, me, register, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', protect, me);
router.put('/profile', protect, updateProfile);

export default router;
