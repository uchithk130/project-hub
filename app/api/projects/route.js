import connectToDatabase from '@/utils/db';
import Project from '../../../models/project';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const data = {
      projectName: formData.get('projectName'),
      projectAim: formData.get('projectAim'),
      departments: JSON.parse(formData.get('departments')),
      projectAbstract: formData.get('projectAbstract'),
      technologies: JSON.parse(formData.get('technologies')),
      pdf: formData.get('pdf'),
      githubLink: formData.get('githubLink'),
      videoLink: formData.get('videoLink'),
      images: formData.get('images'),
      userEmail: formData.get('userEmail'),
      userImage: formData.get('userImage'),
      name:formData.get('name')
      
    };
    const userEmail = formData.get('userEmail');
console.log('User Email from:', userEmail);

    await connectToDatabase();
    console.log('Database connected'); // Log successful database connection

    const project = new Project(data);
    console.log('Received data:', project);
    await project.save();
    console.log('Project saved successfully'); // Log successful save

    return NextResponse.json({ message: 'Project saved successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error saving project:', error); // Log the error
    return NextResponse.json({ message: 'Failed to save project', error: error.message }, { status: 500 });
  }
}
