/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import LinkButton from './LinkButton';

interface TripCardProps {
    date: string;
    price: number;
    location: string;
    items: string;
    locationVisitNumber: number;
    stateVisitNumber: number;
    lifetimeVisitNumber: number;
  }

  function getOrdinalSuffix(val: number): string {
    // Check if the number ends in 11, 12, or 13
    if (val % 100 === 11 || val % 100 === 12 || val % 100 === 13) {
        return val + "th";
    }

    // Otherwise, handle the cases for 1st, 2nd, 3rd, 4th, etc.
    switch (val % 10) {
        case 1:
            return val + "st";
        case 2:
            return val + "nd";
        case 3:
            return val + "rd";
        default:
            return val + "th";
    }
}

  const TripCard: React.FC<TripCardProps> = ({ date, price, location, items, locationVisitNumber, stateVisitNumber, lifetimeVisitNumber}) => {
  return (
    <div className="w-full flex-col rounded-xl bg-white p-4 text-left mb-8">
      <div className="flex flex-row justify-between text-xl font-medium">
        <p>{date}</p>
        <p>${price.toPrecision(4)}</p>
      </div>            
      <p>{location}</p>
      <p>{items}</p>
      <p>{getOrdinalSuffix(locationVisitNumber)} location trip, {getOrdinalSuffix(stateVisitNumber)} [state] trip, {getOrdinalSuffix(lifetimeVisitNumber)} ever</p>
      <div className="flex flex-col gap-4 w-full md:flex-row justify-center items-center md:justify-between mt-3">
        <LinkButton textSize="text-sm lg:text-xl" className='w-[70%] md:w-[20%]' label='Edit' href='/' color="yellow"/>
        <LinkButton textSize="text-sm lg:text-xl" className='w-[70%] md:w-[20%]' label='Delete' href='/' color="red"/>
        <LinkButton textSize="text-sm lg:text-xl" className='w-[70%] md:w-[20%]' label='Map' href='/' color="yellow"/>
      </div>
    </div>
  );
};

export default TripCard;
