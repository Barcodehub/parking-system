// import mongoose, { Schema, Document } from 'mongoose';
// import bcrypt from 'bcryptjs';
// import { Role } from '@prisma/client';

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   role: Role;
//   comparePassword(candidatePassword: string): Promise<boolean>;
// }

// const UserSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: Role, default: 'user' },
// });

// // Middleware para hashear la contraseña antes de guardar
// UserSchema.pre<IUser>('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Método para comparar contraseñas
// UserSchema.methods.comparePassword = async function (
//   candidatePassword: string
// ): Promise<boolean> {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// export default mongoose.model<IUser>('User', UserSchema);
