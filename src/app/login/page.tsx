/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import LinkButton from '../components/LinkButton';
import TextInput from '../components/TextInput';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginWithEmail } from '../utils/auth';

export default function Home() { 
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState(false);

  const handleEmailChange = (newValue: string) => {
    setEmail(newValue);
  };

  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);
  };

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const user = await loginWithEmail(email, password);
      if(user) {
        setLoginError(false);
        console.log('Logged in user:', user);
        router.push('/home');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError(true);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <img className="mt-14 w-[90%] md:w-[50%]" src="https://i.imgur.com/massYr2.png"></img>
      <div className="flex flex-col-reverse md:flex-row pt-14 items-center w-full justify-center">
        <div className="flex flex-col text-center w-[80%] lg:w-[40%] xl:w-[30%] items-center bg-gray-200 p-8 rounded-xl text-black">
          <form className="w-full" onSubmit={handleLogin}>
            <p className="text-5xl font-bold">Log In</p>
            <TextInput className="mt-8" label='Email' type='email' value={email} onChange={handleEmailChange} />
            <TextInput label='Password' type='password' value={password} onChange={handlePasswordChange} />
            {/* <a href="/forgot" className="text-blue-400 underline">Forgot Password</a> */}
            {loginError && <p className="text-bucee-red font-bold">Incorrect email or password, please try again.</p>}
            <button type="submit" className="mt-4 self-center text-xl font-semibold text-white bg-bucee-red hover:bg-bucee-red-darker active:bg-bucee-red-darkest rounded-xl hover:cursor-pointer transition-all duration-100 py-3 px-12 md:w-[40%]">Log In</button>
          </form>
        </div>
      </div>
    </main>
  );
}
