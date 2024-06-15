/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import LinkButton from '../components/LinkButton';
import TextInput from '../components/TextInput';
import { useState } from 'react';
import { registerWithEmail } from '../utils/auth';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [registerError, setRegisterError] = useState<string>('');

  const handleFirstNameChange = (newValue: string) => {
    setFirstName(newValue);
  };

  const handleLastNameChange = (newValue: string) => {
    setLastName(newValue); 
  };

  const handleEmailChange = (newValue: string) => {
    setEmail(newValue);
  };

  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);
  };

  const handleConfirmPasswordChange = (newValue: string) => {
    setConfirmPassword(newValue); 
  };

  const handleRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setRegisterError('Passwords do not match, please try again.');
      return;
    }
    try {
      const user = await registerWithEmail(email, password, firstName, lastName);
      console.log('Registered user:', user);
      router.push('/login');
    } catch (error) {
      console.error('Error registering:', error);
      setRegisterError('Email already in use, please try again.');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <img className="mt-14 w-[90%] md:w-[50%]" src="https://i.imgur.com/massYr2.png"></img>
      <div className="flex flex-col-reverse md:flex-row pt-14 items-center w-full justify-center">
        <div className="flex flex-col text-center w-[80%] lg:w-[40%] xl:w-[30%] items-center bg-gray-200 p-8 rounded-xl text-black">
          <p className="text-5xl font-bold w-full">Register</p>
          <form className="w-full" onSubmit={handleRegister}>
            <TextInput className='mt-8' label='First Name' value={firstName} onChange={handleFirstNameChange} />
            <TextInput label='Last Name (optional)' value={lastName} onChange={handleLastNameChange} />
            <TextInput label='Email' type='email' value={email} onChange={handleEmailChange} />
            <TextInput label='Password' type='password' value={password} onChange={handlePasswordChange} />
            <TextInput label='Confirm Password' type='password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
            <p>Already have an account? <a href="/login" className="text-blue-400 underline">Log in.</a></p>
            {registerError !== '' && <p className="text-bucee-red font-bold">{registerError}</p>}
            <button type="submit" className="mt-4 self-center text-xl font-semibold text-white bg-bucee-red hover:bg-bucee-red-darker active:bg-bucee-red-darkest rounded-xl hover:cursor-pointer transition-all duration-100 py-3 px-12 md:w-[40%]">Register</button>
          </form>
        </div>
      </div>
    </main>
  );
}
