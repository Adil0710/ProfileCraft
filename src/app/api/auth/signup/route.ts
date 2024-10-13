// app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { signupSchema } from '../../../../schemas/user';
import { connectDB } from '../../../../utils/db';
import User from '../../../../models/User';
import bcrypt from 'bcrypt';npm
import crypto from 'crypto';
import sendVerificationEmail from '../../../../utils/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = signupSchema.parse(body);

    await connectDB();

    const existingUser = await User.findOne({ email: parsed.email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    // Hash password if provided
    let hashedPassword;
    if (parsed.password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(parsed.password, salt);
    }

    // Generate verification code
    const verifyCode = crypto.randomBytes(3).toString('hex').toUpperCase(); // 6 characters
    const verifyExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const user = new User({
      email: parsed.email,
      password: hashedPassword,
      name: parsed.name,
      role: parsed.role,
      verifyCode,
      verifyExpiry,
    });

    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, verifyCode);

    return NextResponse.json({ message: 'Signup successful. Please verify your email.' }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 422 });
    }
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
