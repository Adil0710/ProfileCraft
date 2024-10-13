// utils/db.ts
import dbConnect from '../lib/mongoose';

export async function connectDB() {
  await dbConnect();
}
