// app/api/organization/route.ts
import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import slugify from 'slugify';
import Organization from '@/models/Organization';
import { connectDB } from '@/utils/db';
import { organizationSchema } from '@/schemas/organization';

export async function POST(request: Request) {
  const session = await getSession({ req: request as any });
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = organizationSchema.parse(body);

    await connectDB();

    // Generate slug from name
    const slug = slugify(parsed.name, { lower: true, strict: true });

    // Check if organization name or slug already exists
    const existingOrg = await Organization.findOne({ $or: [{ name: parsed.name }, { slug }] });
    if (existingOrg) {
      return NextResponse.json({ error: 'Organization name or slug already exists' }, { status: 400 });
    }

    const organization = new Organization({
      name: parsed.name,
      slug,
      adminId: session.user.id,
    });

    await organization.save();

    return NextResponse.json({ message: 'Organization created successfully', organization }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 422 });
    }
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
