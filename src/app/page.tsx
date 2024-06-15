/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import LinkButton from './components/LinkButton';
import { useRouter } from 'next/navigation';

export default function Home(){
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center w-full mb-40">
      <img className="mt-14 w-[90%] md:w-[50%]" src="https://i.imgur.com/massYr2.png"></img>
      <div className="flex flex-col-reverse md:flex-row pt-14 items-center justify-center">
        <div className="flex flex-col text-center md:text-left w-[90%] md:w-[66%]">
          <p className="text-5xl font-bold">Howdy!</p>
          <p className="text-2xl font-bold">Welcome to Buc-ee Buddy!</p>
          <br></br>
          <p className="text-lg font-semibold">Buc-ee Buddy is a fun, simple, and free unofficial fan-made application that allows users to log their trips, view stats about their visits, and check each Buc-ee's location off their list!</p>
          <br></br>
          <p className="text-lg font-semibold">Founded in 1982, Buc-ee's gas stations are known for fantastic fresh brisket, award-winning clean bathrooms, and dozens of gas pumps at every location. As of May 2024, 49 locations are open 24/7 across Alabama, Colorado, Florida, Georgia, Kentucky, Missouri, South Carolina, Tennessee, and Texas; with proposals or plans to open new locations in Arizona, Arkansas, Louisiana, North Carolina, Mississippi, Ohio, Virginia, and Wisconsin. A complete list of current locations can be found <a className="text-blue-400 underline" href="https://buc-ees.com/locations/" target="_blank" rel="noopener noreferrer">here</a>.</p>
          <br></br>
          <p className="text-lg font-semibold">Buc-ee Buddy currently supports all 49 Buc-ee's locations across 9 states. More locations will be added as Buc-ee's continues to expand across America!</p>
          <br></br>
          <p className="text-lg font-semibold">From Florida to Texas to Colorado, this handy tool is essential for any Buc-ee's fan.</p>
        </div>
        <img src="https://buc-ees.com/wp-content/uploads/2020/02/buc-ees-logo-retina.png" className="w-[0%] md:w-[15%] md:ml-8"></img>
      </div>


      <div className="flex flex-col md:flex-row gap-12 md:justify-center w-[50%] md:w-[75%] pt-20 text-center">
       <LinkButton label='Register' href='/register' onClick={() => router.push('/register')}  color="yellow"/>
       <LinkButton label='Log In' href='/login' onClick={() => router.push('/login')} color="red"/>
       {/* <LinkButton label='About' href='/about' color="yellow"/> */}
      </div>
    </main>
  );
}
