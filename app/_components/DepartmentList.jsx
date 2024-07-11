import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'; 
import Image from 'next/image';
import { ArrowRightCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [selectDepartment, setSelectDepartment] = useState('ALL');
  const listRef = useRef(null);
  const params = useSearchParams();
  const router = useRouter();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    setSelectDepartment(params.get('department') || 'ALL');
    console.log(params.get('department'));
  }, [params]);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await axios.get('/api/department'); 
        setDepartments(response.data);
        console.log(response.data); 
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    }

    fetchDepartments();
  }, []); 

  const ScrollRightHandler = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: 250,
        behavior: 'smooth'
      });
    }
  };

  const handleDepartmentClick = (departmentSlug) => {
    if (departmentSlug === selectDepartment) {
      setSelectDepartment('ALL');
      router.push('/'); // Assuming '/' is the route to show all departments
    } else {
      setSelectDepartment(departmentSlug);
      router.push(`/?department=${departmentSlug}`);
    }
  };
  const redirectToMyProjects = () => {
    if (user && user.emailAddresses && user.emailAddresses.length > 0) {
      router.push(`/my-projects?email=${user.emailAddresses[0].emailAddress}`);
    }
  };

  return (
    <div className='mt-10 relative'>
      <div className='flex gap-4 overflow-auto custom-scrollbar' ref={listRef}>
        <div 
          onClick={() => handleDepartmentClick('ALL')}
          className={`flex flex-col items-center gap-2 border p-3 rounded-xl min-w-28 hover:border-primary hover:bg-gray-100 cursor-pointer group ${selectDepartment === 'all' && 'text-green-600 scale-101 border-green-600 bg-gray-200'}`}>
          
          <Image
              src="https://res.cloudinary.com/ddlxefnuf/image/upload/v1720527706/departments/botjedsskrkomoblq7al.png"
              alt='ALL'
              width={100}
              height={100}
              className='group-hover:scale-105 transition-all duration-75 rounded-md'
            />  
            
        
           
            <h2 className='text-lg font-medium group-hover:text-cyan-700'>All Projects</h2>
        </div>
        <div 
          onClick={() =>redirectToMyProjects() }
          className={`flex flex-col items-center gap-2 border p-3 rounded-xl min-w-28 hover:border-primary hover:bg-gray-100 cursor-pointer group ${selectDepartment === 'all' && 'text-green-600 scale-101 border-green-600 bg-gray-200'}`}>
          
          <Image
              src="/MY.png"
              alt='ALL'
              width={100}
              height={100}
              className='group-hover:scale-105 transition-all duration-75 rounded-md'
            />  
            
        
           
            <h2 className='text-lg font-medium group-hover:text-cyan-700'>My Projects</h2>
        </div>
        {departments.map((department, index) => (
          <div
            key={index}
            onClick={() => handleDepartmentClick(department.slug)}
            className={`flex flex-col items-center gap-2 border p-3 rounded-xl min-w-28 hover:border-primary hover:bg-gray-100 cursor-pointer group ${selectDepartment === department.slug && 'text-green-600 scale-101 border-green-600 bg-gray-200'}`}>
            <Image
              src={department.url}
              alt={department.name}
              width={100}
              height={100}
              className='group-hover:scale-105 transition-all duration-75 rounded-md'
            />
            <h2 className='text-lg font-medium group-hover:text-cyan-700'>{department.name}</h2>
          </div>
        ))}
      </div>
      <ArrowRightCircle 
        className='absolute right-0 top-9 cursor-pointer bg-gray-500 rounded-full text-white h-8 w-8'
        onClick={ScrollRightHandler}
      />
    </div>
  );
}

export default DepartmentList;
