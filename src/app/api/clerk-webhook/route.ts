import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from "convex/browser";
import { api } from '../../../../convex/_generated/api';

const convex = new ConvexHttpClient("https://befitting-mockingbird-971.convex.cloud");

export async function POST(req: NextRequest) {
  const payload = await req.json();

  if (payload.type === 'user.created') {
    const user = payload.data;
    await convex.mutation(api.users.createUser, {
      clerkId: user.id,
      email: user.email_addresses[0]?.email_address,
      name: `${user.first_name} ${user.last_name}`,
      imageUrl: user.image_url,
    });
  }

  return NextResponse.json({ success: true });
}
