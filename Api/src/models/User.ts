import mongoose, { Schema } from 'mongoose';

export interface IUser {
    username: string
    password: string
    profilePicture?: string

    getUsername(): string
    setUsername(un: string): void
    getPassword(): string
    setPassword(pw: string): void
    getProfilePicture(): string | undefined
    setProfilePicture(pp: string): void
}

class UserClass {
    username!: string
    password!: string
    profilePicture?: string

    constructor(username?: string, password?: string, profilePicture?: string) {
        if (username) this.username = username;
        if (password) this.password = password;
        if (profilePicture) this.profilePicture = profilePicture;
    }

    getUsername() { return this.username }
    setUsername(un: string) { this.username = un }
    getPassword() { return this.password }
    setPassword(pw: string) { this.password = pw }
    getProfilePicture() { return this.profilePicture }
    setProfilePicture(pp: string) { this.profilePicture = pp }
}



const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },

    // Vamos salvar a foto como um string Base64 (Data URL)
    profilePicture: { type: String },
}, { timestamps: true });

UserSchema.loadClass(UserClass);

const User = mongoose.model<IUser>('User', UserSchema);
export default User