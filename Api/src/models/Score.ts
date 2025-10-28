import mongoose, { Schema } from 'mongoose';

export interface IScore {
    user: Schema.Types.ObjectId
    score: number

    getUser(): Schema.Types.ObjectId
    setUser(userId: Schema.Types.ObjectId): void
    getScore(): number
    setScore(score: number): void
}

class ScoreClass {
    user!: Schema.Types.ObjectId
    score!: number
    constructor(user?: Schema.Types.ObjectId, score?: number) {
        if (user) this.user = user;
        if (score) this.score = score;
    }

    getUser() { return this.user }
    setUser(userId: Schema.Types.ObjectId) { this.user = userId }
    getScore() { return this.score }
    setScore(score: number) { this.score = score }
}

const ScoreSchema = new Schema<IScore>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        index: true
    },
    score: { type: Number, required: true },
}, { timestamps: true });

ScoreSchema.loadClass(ScoreClass)

const Score = mongoose.model<IScore>('Score', ScoreSchema);
export default Score