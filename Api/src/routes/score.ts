import { Router } from 'express';
import { getLeaderboard, postScore } from '../controllers/scoreController'; // Importa
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, postScore)
router.get('/leaderboard', getLeaderboard)

export default router;