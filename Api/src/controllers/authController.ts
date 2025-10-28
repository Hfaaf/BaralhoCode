import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Score from '../models/Score';

interface AuthRequest extends Request {
    userId?: string;
}

export const register = async (req: Request, res: Response) => {
    const { username, password, profilePicture } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
    }

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Usuário já existe.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            password: hashedPassword,
            profilePicture: profilePicture || null
        });

        await user.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no servidor' });

    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Credenciais inválidas.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciais inválidas.' });
        }

        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

export const getMe = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.userId).select('-password'); // .select('-password') remove a senha da resposta
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// PUT /auth/me - Atualiza username ou foto de perfil
export const updateMe = async (req: AuthRequest, res: Response) => {
    const { username, profilePicture } = req.body;
    const userId = req.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        if (username && username !== user.username) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'Nome de usuário já está em uso.' });
            }
            user.username = username;
        }

        if (profilePicture !== undefined) {
            user.profilePicture = profilePicture;
        }

        await user.save();

        const userObject = user.toObject();

        const { password, ...responseUser } = userObject;

        res.json(responseUser);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

export const updatePassword = async (req: AuthRequest, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.userId;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Senha antiga e nova são obrigatórias.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha antiga incorreta.' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: 'Senha atualizada com sucesso.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

export const deleteMe = async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    try {
        // 1. Deleta o usuário
        await User.findByIdAndDelete(userId);

        // 2. Deleta a pontuação associada a ele
        await Score.findOneAndDelete({ user: userId });

        res.json({ message: 'Conta deletada com sucesso.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};