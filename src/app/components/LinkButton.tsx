import React from 'react';
import Link from 'next/link';
import { text } from 'stream/consumers';

interface LinkButtonProps {
    href?: string;
    label: string;
    color: string;
    className?: string;
    textSize?: string;
    onClick?: () => void;
  }

  const LinkButton: React.FC<LinkButtonProps> = ({ href, label, color, className, textSize, onClick }) => {
  return (
    <Link href={href || ''} className={`${className} ${color === "red" ? "bg-bucee-red hover:bg-bucee-red-darker active:bg-bucee-red-darkest" : "bg-bucee-yellow hover:bg-bucee-yellow-darker active:bg-bucee-yellow-darkest"} rounded-xl hover:cursor-pointer transition-all  duration-100 py-3 px-12 md:w-[30%]`}>
        <div onClick={onClick} className='flex justify-center items-center'>  
            <p className={`${textSize} text-xl font-semibold text-white`}>{label}</p>
        </div>
    </Link>
  );
};

export default LinkButton;
