import { ObjectId } from 'mongodb';
import connectToDatabase from '@/utils/db';
import Project from '../../../models/project';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectToDatabase();
    console.log('Database connected');

    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Project ID is required' }, { status: 400 });
    }

    const projectId = new ObjectId(id);
    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    console.log('Project fetched successfully');
    return NextResponse.json({ success: true, data: project }, { status: 200 });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ message: 'Failed to fetch project', error: error.message }, { status: 500 });
  }
}
