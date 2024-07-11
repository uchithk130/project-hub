import connectToDatabase from '@/utils/db';
import Department from '../../../models/department';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    console.log('Database connected'); // Log successful database connection

    const projects = await Department.find();
    console.log(projects);
    console.log('Projects fetched successfully'); // Log successful data fetch

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error); // Log the error
    return NextResponse.json({ message: 'Failed to fetch projects', error: error.message }, { status: 500 });
  }
}
