import { ObjectId } from 'mongodb';
import connectToDatabase from '@/utils/db';
import Project from '../../../models/project';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
  try {
    await connectToDatabase();
    console.log('Database connected');

    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Project ID is required' }, { status: 400 });
    }

    const projectId = new ObjectId(id);
    const result = await Project.deleteOne({ _id: projectId });

    if (result.deletedCount === 1) {
      console.log('Project deleted successfully');
      return NextResponse.json({ success: true, message: 'Project deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ message: 'Failed to delete project', error: error.message }, { status: 500 });
  }
}
