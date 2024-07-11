// import connectToDatabase from '@/utils/db';
// import Project from '../../../models/project';
// import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     await connectToDatabase();
//     console.log('Database connected'); // Log successful database connection

//     const projects = await Project.find();
//     console.log(projects);
//     console.log('Projects fetched successfully'); // Log successful data fetch

//     return NextResponse.json(projects, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching projects:', error); // Log the error
//     return NextResponse.json({ message: 'Failed to fetch projects', error: error.message }, { status: 500 });
//   }
// }
import connectToDatabase from '@/utils/db';
import Project from '../../../models/project';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectToDatabase();
    console.log('Database connected');

    const url = new URL(request.url);
    const department = url.searchParams.get('department');

    const query = department ? { departments: department } : {};
    const projects = await Project.find(query);
    console.log('Projects fetched successfully');

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ message: 'Failed to fetch projects', error: error.message }, { status: 500 });
  }
}
