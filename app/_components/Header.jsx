 "use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Search, SquarePen } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import ProjectEntryModal from '../_components/ProjectEntry';


function Header() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const redirectToProjectEntry = () => {
    setIsModalOpen(true);
  };

  return (
    <div className='flex justify-between items-center p-6 md:px-20 shadow-md w-full left-0 '>
      <Image src="/cropped_image.png" alt="logo" width={78} height={78} />

      {isSignedIn ?
        <div className='flex p-2 rounded-lg justify-between sm:w-30 md:w-60'>
          <div className='flex p-3 rounded-lg justify-between bg-gray-200 w-66 items-center mx-5'>
            <div className='hidden md:flex'>
              <Button variant="outline-none" onClick={redirectToProjectEntry}>Project</Button>
            </div>
            <SquarePen onClick={redirectToProjectEntry} />
          </div>
          <UserButton appearance={{
            elements: {
              avatarBox: "h-[62px] w-[62px]"
            }

          }} />
        </div>
        :
        <div className='flex gap-5'>
          <SignInButton mode='modal'>
            <Button variant="outline" >Login</Button>
          </SignInButton>
          <SignUpButton mode='modal'>
            <Button className='bg-blue-500'>Signup</Button>
          </SignUpButton>
        </div>}
      <ProjectEntryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Header;
