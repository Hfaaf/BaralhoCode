import { Request, Response } from 'express'
import Score from '../models/Score'

interface AuthRequest extends Request {
    userId?: string
}

export const postScore = async (req: AuthRequest, res: Response) => {
    const { score: pointsFromGame } = req.body;
    const userId = req.userId;

    if (typeof pointsFromGame !== 'number') {
        return res.status(400).json({ message: 'Pontuação inválida.' });
    }


    if (pointsFromGame === 0) {
        return res.status(200).json({ message: 'Nenhum ponto adicionado.' });
    }

    try {
        const existingScore = await Score.findOne({ user: userId });

        if (existingScore) {
            const currentScore = existingScore.getScore();
            const newTotalScore = currentScore + pointsFromGame;

            existingScore.setScore(newTotalScore);
            await existingScore.save();

            console.log(`Placar atualizado para ${userId}: ${newTotalScore} (adicionado ${pointsFromGame})`);
            return res.status(200).json(existingScore);

        } else {
            const newScoreDoc = new Score({
                user: userId,
                score: pointsFromGame
            });
            await newScoreDoc.save();
            console.log(`Novo placar criado para ${userId}: ${pointsFromGame}`);
            return res.status(201).json(newScoreDoc);
        }
    } catch (err) {
        console.error('Erro ao salvar pontuação:', err);
        res.status(500).send('Erro no servidor');
    }
};

export const getLeaderboard = async (req: Request, res: Response) => {
    try {
        const leaderboard = await Score.find()
            .sort({ score: -1 })
            .limit(10)
            .populate('user', 'username profilePicture')

        res.json(leaderboard)
    } catch (err) {
        console.error(err)
        res.status(500).send('Erro no servidor')
    }
}