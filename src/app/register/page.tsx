/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import LinkButton from '../components/LinkButton';
import TextInput from '../components/TextInput';
import { useState } from 'react';

export default function Home() {
  
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleFirstNameChange = (newValue: string) => {
    setFirstName(newValue);
  }

  const handleLastNameChange = (newValue: string) => {
    setLastName(newValue); 
  }

  const handleEmailChange = (newValue: string) => {
    setEmail(newValue);
  }

  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);
  }

  const handleConfirmPasswordChange = (newValue: string) => {
    setConfirmPassword(newValue); 
  }


  const page = "register";

  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <div className="flex flex-col-reverse md:flex-row pt-40 items-center w-full justify-center">
        <div className="flex flex-col text-center w-[80%] lg:w-[40%] xl:w-[30%]">
          <p className="text-5xl font-semibold w-full">Register</p>

          <div className='flex flex-row mt-8 justify-between gap-4'>
            <TextInput label='First Name' value={firstName} onChange={handleFirstNameChange}/>
            <TextInput label='Last Name (optional)' value={lastName} onChange={handleLastNameChange}/>
          </div>
          <TextInput label='Email' type='email' value={email} onChange={handleEmailChange}/>
          <TextInput label='Password' type='password' value={password} onChange={handlePasswordChange}/>
          <TextInput label='Confirm Password' type='password' value={confirmPassword} onChange={handleConfirmPasswordChange}/>
          <p>Already have an account? <a href="/login" className="text-blue-400 underline">Log in.</a></p>

          <LinkButton className='self-center mt-4 w-full md:w-full' color='red' label='Register' href='/login'/>
        </div>
      </div>
    </main>
  );
}
