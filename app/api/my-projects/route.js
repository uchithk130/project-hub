import { NextResponse } from 'next/server';
import connectToDatabase from '@/utils/db';
import Project from '../../../models/project';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get('userEmail').replace('%40','@');

  if (!userEmail) {
    return NextResponse.json({ error: 'User email is required' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const projects = await Project.find({ userEmail }).exec();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
