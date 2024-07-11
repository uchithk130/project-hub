import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    const response = await clerkClient.users.getUserList({
      emailAddress: [email],
    });

    if (response.totalCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = response.data[0]; 

    const primaryEmail = user.emailAddresses && user.emailAddresses.length > 0
      ? user.emailAddresses[0].emailAddress
      : '';

    const userDetails = {
      name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
      email: primaryEmail,
      imageUrl: user.imageUrl ?? '',
    };

    return NextResponse.json(userDetails, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
