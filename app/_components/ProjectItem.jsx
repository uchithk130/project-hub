
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';


function ProjectItem({ project, onDelete }) {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const currentRoute = router.asPath;
  const email = user?.emailAddresses?.[0]?.emailAddress || '';

  let images = [];
  if (typeof project.images[0] === 'string') {
    try {
      images = JSON.parse(project.images[0]);
    } catch (error) {
      console.error('Error parsing images:', error);
    }
  } else {
    images = project.images;
  }

  const handleClick = () => {
    if (isSignedIn) {
      router.push(`/projectview?id=${project._id}`);
    } else {
      toast.info('Login to view project details');
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    const confirmed = confirm('Are you sure you want to delete this project?');
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`/api/deleteProject?id=${project._id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      console.log(response);
      if (response.ok) {
        toast.success('Project deleted successfully');
        router.push(`/my-projects?email=${email}`); 
        window.location.reload();
      } else {
        toast.error(data.message || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Failed to delete project');
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const routeEmail = urlParams.get('email');
  const isMyProjectsRoute = routeEmail === email;

  return (
    <div onClick={handleClick} className='relative mt-8 p-3 hover:border rounded-xl hover:border-green-600 transition-all duration-200 ease-in-out cursor-pointer'>
      {/* Thumbnail Image */}
      <div>
        <Image
          src={`/${project.departments[0]}.png`}
          alt={`Project image ${project.projectName}`}
          width={500}
          height={280}
          className='rounded-xl object-cover'
        />
      </div>

      {/* Project Name */}
      <div className='mt-3'>
        <h2 className='font-bold text-lg overflow-hidden whitespace-nowrap overflow-ellipsis'>
          {project.projectName}
        </h2>
      </div>

      {/* User Details */}
      <div className='mt-3 flex items-center'>
        {/* User Image */}
        <Image
          src={project.userImage}
          alt={`User image ${project.userEmail}`}
          width={40}
          height={40}
          className='rounded-full'
        />
        
        {/* Email and Department */}
        <div className='ml-4 flex flex-col justify-center'>
          <h2 className='text-sm text-gray-600'>
            {project.userEmail}
          </h2>
          <h2 className='text-sm text-red-500'>
            {project.departments[0]}
          </h2>
        </div>
      </div>

      {/* Delete Button */}
      {isMyProjectsRoute && (
        <button onClick={handleDelete} className='absolute top-5 right-5 p-1 rounded-full bg-red-600 hover:bg-red-700 text-white'>
          <FaTrash />
        </button>
      )}
    </div>
  );
}

export default ProjectItem;
