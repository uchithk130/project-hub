"use client"

// import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import DepartmentList from './_components/DepartmentList';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import ProjectList from './_components/ProjectList';
import Head from 'next/head';
export default function Home() {

  return (
    <div>
      <DepartmentList/>
      <ProjectList />
    </div>
  );
}
