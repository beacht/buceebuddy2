/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import LinkButton from './components/LinkButton';

export const metadata: Metadata = {
  title: 'Buc-ee Buddy',
}

export default function Home(){
  const page = "landing";

  return (
    <main className="flex min-h-screen flex-col items-center w-full mb-40">
      <div className="flex flex-col-reverse md:flex-row pt-40 items-center justify-center">
        <div className="flex flex-col text-center md:text-left w-[80%] md:w-[66%]">
          <p className="text-5xl font-semibold">Howdy!</p>
          <p className="text-2xl font-medium">Welcome to Buc-ee Buddy!</p>
          <p className="text-lg">Log your trips to the happiest place on Earth, view stats about your visits, and check each location off your list on a free, simple, and fun application. From Florida to Texas to Colorado, this handy tool is essential for any Buc-ee's fan.</p>
          <br></br>
          <p className="text-lg">Buc-ee Buddy has recorded X total trips to X different locations!</p>
        </div>
        <img src="https://buc-ees.com/wp-content/uploads/2020/02/buc-ees-logo-retina.png" className="w-[25%] md:w-[15%] mb-8 md:mb-0 md:ml-8"></img>
      </div>


      <div className="flex flex-col md:flex-row gap-12 md:justify-between w-[50%] md:w-[75%] pt-20 text-center">
       <LinkButton label='Register' href='/register' color="yellow"/>
       <LinkButton label='Log In' href='/login' color="red"/>
       <LinkButton label='About' href='/about' color="yellow"/>
      </div>
    </main>
  );
}
