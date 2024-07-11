// components/ProjectDetails.js
'use client'
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Image from 'next/image';
import { FaGithub, FaVideo, FaFilePdf } from 'react-icons/fa';
import { useUser } from '@clerk/nextjs';
import axios from 'axios'; // Import axios for HTTP requests
import { SignInButton } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import SkeletonView from '../_components/SkeletonView';
const ProjectDetails = () => {
  const { isSignedIn } = useUser();
  const [project, setProject] = useState(null); // Initialize project state

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProject = async () => {
      const id = searchParams.get('id');
      if (!id) return;

      try {
        const response = await axios.get('/api/projectid', {
            params: { id: id }
          });
        if (!response.data.success) {
          throw new Error('Failed to fetch project');
        }
        setProject(response.data.data);
      } catch (error) {
        console.error('Error fetching project:', error);
        // Handle error, e.g., redirect to error page or show toast notification
      }
    };

    fetchProject();
  }, [searchParams]);
  console.log(project);
  if (!isSignedIn) {
    return (
      <div className="grid h-screen place-content-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-9xl font-black text-gray-200">404</h1>
          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>
          <p className="mt-4 text-gray-500">Login to view the project.</p>
          <a
            href="#"
            className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            <SignInButton mode='modal' />
          </a>
        </div>
      </div>
    );
  }

  if (!project) {
    return <SkeletonView />; // Add a loading state while fetching project data
  }

  const images = JSON.parse(project.images[0] || '[]');
  const technologies = project.technologies || [];


  return (
    <div className="py-3 px-1 md:p-6 space-y-6">
      {/* Banner with semicircle profile image */}
      <div className="relative bg-gray-200 h-48">
        <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-white md:right-[25%] md:translate-x-0">
          <Image
            src={project.userImage}
            alt={`User image ${project.userEmail}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-justify">
        {/* Right Column: Project Details */}
        <div className="bg-white p-4 rounded shadow md:col-span-2 order-1">
          <h2 className="text-3xl font-serif font-bold mb-4 text-green-400">{project.projectName}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-1">Problem Statement:</h3>
              <p className="ml-2 text-gray-700 leading-8">{project.projectAim}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">Description:</h3>
              <p className="ml-2 text-gray-700 leading-8">{project.projectAbstract}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-4 mt-6">
            <div className="flex items-center">
              <FaFilePdf size={24} className="text-red-500 mr-2" />
              {project.pdf ? (
                <a href={project.pdf} target="_blank" rel="noopener noreferrer" className="btn-link">PDF Download</a>
              ) : (
                <span className="text-sm">PDF: Not Available</span>
              )}
            </div>
            <div className="flex items-center">
              <FaGithub size={24} className="text-gray-800 mr-2" />
              {project.githubLink ? (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-link">Git Repo</a>
              ) : (
                <span className="text-sm">Git Repo: Not Available</span>
              )}
            </div>
            <div className="flex items-center">
              <FaVideo size={24} className="text-blue-500 mr-2" />
              {project.videoLink ? (
                <a href={project.videoLink} target="_blank" rel="noopener noreferrer" className="btn-link">Video</a>
              ) : (
                <span className="text-sm">Video: Not Available</span>
              )}
            </div>
          </div>
        </div>

        {/* Left Column: Technologies and Images */}
        <div className="bg-white p-4 rounded shadow md:col-span-1 order-2 md:order-1 md:mt-6 mt-6">
          <h2 className="text-2xl font-serif font-bold mb-4">Technologies Used</h2>
          <ul className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <li key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                {tech}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative w-full h-40 p-2 border rounded-lg overflow-hidden">
                <Image src={image} alt={`Project image ${index + 1}`} layout="fill" objectFit="cover" className="rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
