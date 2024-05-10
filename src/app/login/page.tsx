/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import LinkButton from '../components/LinkButton';
import TextInput from '../components/TextInput';
import { useState } from 'react';

export default function Home() { 
  const page = "login";
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (newValue: string) => {
    setEmail(newValue);
  }

  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);
  }

  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <div className="flex flex-col-reverse md:flex-row pt-40 items-center w-full justify-center">
        <div className="flex flex-col text-center w-[80%] lg:w-[40%] xl:w-[30%] items-center bg-gray-200 p-8 rounded-xl text-black">
          <div className='w-full'>
            <p className="text-5xl font-semibold">Log In</p>
            <TextInput className="mt-8" label='Email' type='email' value={email} onChange={handleEmailChange}/>
            <TextInput label='Password' type='password' value={password} onChange={handlePasswordChange}/>
          </div>
          <a href="/forgot" className="text-blue-400 underline">Forgot Password</a>
          <LinkButton className='self-center mt-4 w-full md:w-full' color='red' label='Log In' href='/home'/>
        </div>
      </div>
    </main>
  );
}
