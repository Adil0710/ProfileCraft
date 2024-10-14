// app/api/auth/verify/route.ts
import { NextResponse } from 'next/server';
import { verificationSchema } from '../../../../schemas/user';
import { connectDB } from '../../../../utils/db';
import User from '../../../../models/User';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = verificationSchema.parse(body);

    await connectDB();

    const user = await User.findOne({ email: parsed.email, verifyCode: parsed.verifyCode });
    if (!user) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }

    if (user.verifyExpiry && user.verifyExpiry < new Date()) {
      return NextResponse.json({ error: 'Verification code has expired' }, { status: 400 });
    }

    user.verifyCode = undefined;
    user.verifyExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 422 });
    }
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
