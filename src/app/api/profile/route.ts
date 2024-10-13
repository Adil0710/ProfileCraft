// app/api/profile/route.ts
import { NextResponse } from 'next/server';

import { getSession } from 'next-auth/react';
import Profile from '@/models/Profile';
import { connectDB } from '@/utils/db';
import { profileSchema } from '@/schemas/profile';

export async function POST(request: Request) {
  const session = await getSession({ req: request as any });
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = profileSchema.parse(body);

    await connectDB();

    // Check if profile already exists
    const existingProfile = await Profile.findOne({ userId: session.user.id });
    if (existingProfile) {
      return NextResponse.json({ error: 'Profile already exists' }, { status: 400 });
    }

    const profile = new Profile({
      userId: session.user.id,
      ...parsed,
    });

    await profile.save();

    return NextResponse.json({ message: 'Profile created successfully' }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 422 });
    }
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSession({ req: request as any });
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = profileSchema.parse(body);

    await connectDB();

    const profile = await Profile.findOneAndUpdate(
      { userId: session.user.id },
      { ...parsed },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Profile updated successfully', profile }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 422 });
    }
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
