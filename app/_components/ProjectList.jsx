import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectItem from './ProjectItem';
import ProjectSkeleton from './ProjectSkeleton';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [department, setDepartment] = useState('ALL');
  const params = useSearchParams();
  const [loading,setLoading] =useState(false);

  useEffect(() => {
    if (params) {
      setDepartment(params.get('department') || 'ALL');
    }
  }, [params]);

  useEffect(() => {
    async function fetchProjects() {
        setLoading(true);
      try {
        const response = await axios.get('/api/project', {
          params: {
            department: department !== 'ALL' ? department : undefined
          }
        });
        setProjects(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }

    fetchProjects();
    setLoading(false);
  }, [department]);

  return (
    <div >
        
      <h2 className='text-grey-300 text-2xl mt-5'>
        <span className='text-green-400 text-3xl'>{department} </span>Projects
      </h2>
      <h2 className='text-red-500'>
        {projects.length}
        <span className='text-grey-300'> Results</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full">
        {!loading ? projects.map((projectListItem, index) => (
          <ProjectItem 
            key={index}
            project={projectListItem}
          />
        )):
        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
            <ProjectSkeleton key={index} />
          ))}
       
      </div>
    </div>
  );
}

export default ProjectList;
