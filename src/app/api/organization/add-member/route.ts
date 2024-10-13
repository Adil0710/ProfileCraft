// app/api/organization/add-member/route.ts
import { NextResponse } from 'next/server';
import { membershipSchema } from '../../../../schemas/membership';
import { connectDB } from '../../../../utils/db';
import Membership from '@/models/Membership';
import Organization from '../../../../models/Organization';
import User from '../../../../models/User';
import { getSession } from 'next-auth/react';
import sendInvitationEmail from '../../../../utils/email';

export async function POST(request: Request) {
  const session = await getSession({ req: request as any });
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = membershipSchema.parse(body);

    await connectDB();

    const organization = await Organization.findById(parsed.organizationId);
    if (!organization) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Check if the requester is the admin of the organization
    if (organization.adminId.toString() !== session.user.id) {
      return NextResponse.json({ error: 'Only organization admin can add members' }, { status: 403 });
    }

    const user = await User.findById(parsed.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if membership already exists
    const existingMembership = await Membership.findOne({
      organizationId: parsed.organizationId,
      userId: parsed.userId,
    });

    if (existingMembership) {
      return NextResponse.json({ error: 'User is already a member of the organization' }, { status: 400 });
    }

    const membership = new Membership({
      organizationId: parsed.organizationId,
      userId: parsed.userId,
      role: parsed.role,
    });

    await membership.save();

    // Optionally, send an invitation email to the user
    await sendInvitationEmail(user.email, organization.name);

    return NextResponse.json({ message: 'Member added successfully', membership }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 422 });
    }
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
