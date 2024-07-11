// 'use client';

// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import React from 'react';
// import { useUser } from '@clerk/nextjs';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function ProjectItem({ project }) {
//   const router = useRouter();
//   const { isSignedIn } = useUser();

//   let images = [];
//   if (typeof project.images[0] === 'string') {
//     try {
//       images = JSON.parse(project.images[0]);
//     } catch (error) {
//       console.error('Error parsing images:', error);
//     }
//   } else {
//     images = project.images;
//   }

//   const handleClick = () => {
//     if (isSignedIn) {
//       const query = new URLSearchParams(project).toString();
//       router.push(`/projects/{project._id}?${query}`);
//     } else {
//       toast.info('Login to view project details');
//     }
//   };

//   return (
//     <div onClick={handleClick} className='mt-8 p-3 hover:border rounded-xl hover:border-green-600 transition-all duration-200 ease-in-out cursor-pointer'>
//       {/* Thumbnail Image */}
//       <div>
//         <Image
//           src={`/${project.departments[0]}.png`}
//           alt={`Project image ${project.projectName}`}
//           width={500}
//           height={280}
//           className='rounded-xl object-cover'
//         />
//       </div>

//       {/* Project Name */}
//       <div className='mt-3'>
//         <h2 className='font-bold text-lg overflow-hidden whitespace-nowrap overflow-ellipsis'>
//           {project.projectName}
//         </h2>
//       </div>

//       {/* User Details */}
//       <div className='mt-3 flex items-center'>
//         {/* User Image */}
//         <Image
//           src={project.userImage}
//           alt={`User image ${project.userEmail}`}
//           width={40}
//           height={40}
//           className='rounded-full'
//         />
        
//         {/* Email and Department */}
//         <div className='ml-4 flex flex-col justify-center'>
//           <h2 className='text-sm text-gray-600'>
//             {project.userEmail}
//           </h2>
//           <h2 className='text-sm text-red-500'>
//             {project.departments[0]}
//           </h2>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProjectItem;
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProjectItem({ project }) {
  const router = useRouter();
  const { isSignedIn } = useUser();

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
      const query = new URLSearchParams(project).toString();
      router.push(`/projectview?id=${project._id}`);
    } else {
      toast.info('Login to view project details');
    }
  };

  return (
    <div onClick={handleClick} className='mt-8 p-3 hover:border rounded-xl hover:border-green-600 transition-all duration-200 ease-in-out cursor-pointer'>
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
    </div>
  );
}

export default ProjectItem;