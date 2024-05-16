/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import LinkButton from './LinkButton';

interface Trip {
  id: string;
  date: string;
  items: string;
  lifetimeTripIdx: number;
  location: number;
  locationTripIdx: number;
  state: string;
  stateTripIdx: number;
  total: number;
}

interface Location {
  id: number;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  state: string;
}

interface TripCardProps {
  trip: Trip;
  date: string;
  price: string;
  locationDoc: Location | undefined;
  locationString: string;
  state: string;
  items: string;
  locationVisitNumber: number;
  stateVisitNumber: number;
  lifetimeVisitNumber: number;
  // setTripToBeDeleted: (arg0: Trip) => void;
  // setIsDeletingTrip: (arg0: boolean) => void;
  setLocationViewed: (arg0: Location | undefined) => void;
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

const TripCard: React.FC<TripCardProps> = ({trip, date, price, locationDoc, locationString, items, locationVisitNumber, stateVisitNumber, lifetimeVisitNumber, state, setLocationViewed}) => {
  return (
    <div className="w-full flex-col rounded-xl bg-white p-4 text-left mb-8 text-black">
      <div className="flex flex-row justify-between text-xl font-medium">
        <p>{date}</p>
        <p>${price}</p>
      </div>            
      <p>{locationString}</p>
      <p>{items}</p>
      <p>{getOrdinalSuffix(locationVisitNumber)} location trip, {getOrdinalSuffix(stateVisitNumber)} {state} trip, {getOrdinalSuffix(lifetimeVisitNumber)} ever</p>
      <div className="flex flex-col gap-4 w-full md:flex-row justify-center items-center md:justify-center mt-3">
        {/* <LinkButton textSize="text-sm lg:text-xl" className='w-[70%] md:w-[40%]' label='Delete' onClick={() => {setTripToBeDeleted(trip); setIsDeletingTrip(true);}} color="red"/> */}
        <LinkButton textSize="text-sm lg:text-xl" className='w-[70%] md:w-[40%]' label='Directions' onClick={() => {setLocationViewed(locationDoc)}} color="yellow"/>
      </div>
    </div>
  );
};

export default TripCard;
