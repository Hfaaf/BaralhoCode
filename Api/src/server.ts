import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import scoreRoutes from './routes/score';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/")
    .then(() => console.log('MongoDB conectado com sucesso.'))
    .catch(err => console.error('Falha na conexão com MongoDB:', err));

app.use('/auth', authRoutes);
app.use('/score', scoreRoutes);

app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
});