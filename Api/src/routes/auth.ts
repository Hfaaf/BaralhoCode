import { Router } from 'express';
// --- MODIFICAÇÃO: Importe os novos controllers ---
import {
    register,
    login,
    getMe,
    updateMe,
    updatePassword,
    deleteMe
} from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', authMiddleware, getMe);

router.put('/me', authMiddleware, updateMe);

router.put('/password', authMiddleware, updatePassword);

router.delete('/me', authMiddleware, deleteMe);

export default router;