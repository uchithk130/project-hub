'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import ProjectItem from '../_components/ProjectItem'; // Ensure this path is correct
import Image from 'next/image';
import ProjectSkeleton from '../_components/ProjectSkeleton'; // Ensure this path is correct

const MyProjects = () => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileUser, setProfileUser] = useState(null); // State to store profile user details

  useEffect(() => {
    const email = searchParams.get('email');
    if (email) {
      // Fetch user details using the email parameter
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`/api/get-user-details?email=${email}`);
          setProfileUser(response.data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
      fetchUserDetails();
    }
  }, [searchParams]);

  useEffect(() => {
    const email = searchParams.get('email');
    if (email) {
      // Fetch projects based on user's email
      const fetchProjects = async () => {
        try {
          const response = await axios.get('/api/my-projects', {
            params: { userEmail: email }
          });
          setProjects(response.data);
        } catch (error) {
          console.error('Error fetching projects:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchProjects();
    }
  }, [searchParams]);

  if (loading) {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4'>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
        <ProjectSkeleton key={index} />
      ))}
    </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10 px-4">
      {profileUser && (
        <div className="flex flex-col items-center">
          <Image 
            src={profileUser.imageUrl} 
            alt="User Profile Image" 
            width={120} 
            height={120} 
            className="rounded-full" 
          />
        <h1 className="text-4xl font-bold mt-4">{profileUser.name}</h1>
          <p className="text-gray-500 text-lg">{profileUser.email}</p>
        </div>
      )}
      
      <div className="mt-8 text-center">
        <h2 className="text-2xl text-gray-300"><span className="text-green-400 text-3xl">Projects</span></h2>
        <h2 className="text-red-500 mt-2"><span className="text-gray-300">Results</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full">
        {projects.map((projectListItem, index) => (
          <ProjectItem 
            key={index}
            project={projectListItem}
          />
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
