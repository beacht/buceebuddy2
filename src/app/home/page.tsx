/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import firebase from '../../../firebase'; // Assuming firebase config is properly imported
import LinkButton from '../components/LinkButton';
import TextInput from '../components/TextInput';
import TripCard from '../components/TripCard';
import { parse } from 'path';

interface Location {
  id: number;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  state: string;
}

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

interface User {
  firstName: string;
  grandTotal: number;
  itemTrips: number[];
  locationTotals: number[];
  locationTrips: number[];
  mostBoughtItem: number;
  mostSpentLocation: number;
  mostVisitedLocation: number;
  stateTotals: number[];
  stateTrips: number[];
  stateUniques: number[];
  totalLocations: number;
  totalStates: number;
  totalTrips: number;
  trips: Trip[];
}


export default function Home() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isAddingTrip, setIsAddingTrip] = useState(false);
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [total, setTotal] = useState('');
  const [items, setItems] = useState('');
  const [user, setUser] = useState<User>();
  const [trips, setTrips] = useState<Trip[]>([]);

  const getLocationsAndUser = useCallback(async () => {
    try {
      const locationsRef = firebase.firestore().collection('locations');
      const locationsSnapshot = await locationsRef.get();
      const locationsData = locationsSnapshot.docs.map(doc => {
        const locationData = { id: parseInt(doc.id), address: doc.data().address, city: doc.data().city, latitude: doc.data().latitude, longitude: doc.data().longitude, state: doc.data().state,  ...doc.data() };
        return locationData; // Remove the mapping to document ID
      });
      setLocations(locationsData);
      console.log(locationsData);
  
      const usersRef = firebase.firestore().collection('users');
      const userData = await usersRef.doc('AEHJYprzdQZtO8MgXiKh').get(); // Get the user document
      if (userData.exists) {
        const userDataObject = userData.data() as User;
        setUser(userDataObject);
  
        const tripsRef = usersRef.doc('AEHJYprzdQZtO8MgXiKh').collection('trips'); // Get the trips collection
        const tripsSnapshot = await tripsRef.get();
        const tripsData = tripsSnapshot.docs.map(doc => {
          const tripData = {id: doc.id, date: doc.data().date, location: doc.data().location, items: doc.data().items, total: doc.data().total, lifetimeTripIdx: doc.data().lifetimeTripIdx, locationTripIdx: doc.data().locationTripIdx, state: doc.data().state, stateTripIdx: doc.data().stateTripIdx};
          return tripData;
        })
        // const tripsData = tripsSnapshot.docs.map(id: doc.id, ...doc.data()) as Trip[];
        setTrips(tripsData);
      } else {
        console.error('User document not found');
      }
    } catch (error) {
      console.error('error: ', error);
    }
  }, []); // Empty dependency array means this callback is memoized and will not change between renders
  

  useEffect(() => {
    getLocationsAndUser();
  }, [getLocationsAndUser]);

  const handleDateChange = (newValue: string) => {
    setDate(newValue);
  }

  const handleLocationChange = (newValue: string) => {
    setLocation(newValue);
  }

  const handleTotalChange = (newValue: string) => {
    setTotal(newValue);
  }

  const handleCheckboxChange = (item: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    if (checked) {
      setItems(prevItems => prevItems ? `${prevItems}, ${item}` : item);
    } else {
      setItems(prevItems => {
        const updatedItems = prevItems ? prevItems.split(', ').filter(i => i !== item).join(', ') : '';
        return updatedItems;
      });
    }
  }

  const formatDate = (dateString: string) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [year, month, day] = dateString.split('-');
    const monthName = months[parseInt(month) - 1];
    console.log(`${monthName} ${parseInt(day)}, ${year}`);
    return `${monthName} ${parseInt(day)}, ${year}`;
  }

  const itemIndexToName = (index: number) => {
    switch (index) {
      case 0: return "Brisket";
      case 1: return "Clothing";
      case 2: return "Cold Grab n Go";
      case 3: return "Dessert";
      case 4: return "Gas";
      case 5: return "Home Goods";
      case 6: return "Hot Grab n Go";
      case 7: return "Jerky";
      case 8: return "Outdoors";
      case 9: return "Snacks";
      default: return "";
    }
  }

  const getStateNumber = (stateAbbreviation: string) => {
    const stateAbbreviations: string[] = [
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
        "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
        "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
        "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ];

    if(!stateAbbreviations.includes(stateAbbreviation)) return -1;
    else return stateAbbreviations.indexOf(stateAbbreviation.toUpperCase());
  }

  const getLocationNumber = () => {
    const parts = location.split(" "); // Split the string by space
    if (parts.length > 1) {
      const numberPart = parts[0].replace("#", ""); // Remove the "#" symbol
      return parseInt(numberPart);
    } else {
      return NaN; // Return NaN if the format is incorrect
    }
  };

  const handleSubmitTrip = async () => {
    console.log(formatDate(date), location, total, items);
    let errorFlag = false;
    if(date == '') {alert('Please select a date!'); errorFlag = true;}
    if(location == 'Select a location') {alert('Please select a location!'); errorFlag = true;}
    if(parseFloat(total) === 0 || total == '') {alert('Please enter the total spent!'); errorFlag = true;}
    if(items == '') {alert('Please select your purchases!'); errorFlag = true;}
    
    if(!errorFlag){
      try {
        console.log(location);
        const state = locations.find(thisLocation => thisLocation.id === getLocationNumber())?.state || "NONE";
        await firebase.firestore().collection('users').doc('AEHJYprzdQZtO8MgXiKh').collection('trips').add({
          date: formatDate(date),
          items: items,
          total: total,
          location: getLocationNumber(),
          state: state || "NONE",
          lifetimeTripIdx: (user?.totalTrips || 0) + 1,
          stateTripIdx: (user?.stateTrips[getStateNumber(state)] || 0) + 1,
          locationTripIdx: (user?.locationTrips[parseInt(location)] || 0) + 1,
        });

        await firebase.firestore().collection('users').doc('AEHJYprzdQZtO8MgXiKh').update({

        })

      } catch (error) {
        console.error('Error adding card:', error);
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center w-full mb-40">
      {user && locations && <div className="flex flex-col md:flex-row pt-40 items-center md:items-start w-full justify-center gap-8">
        <div className="flex flex-col text-center w-[80%] md:w-[40%]">
          <p className="text-3xl font-semibold text-center md:text-left w-full">Welcome, {user.firstName}!</p>
          <div className="w-full h-[500px] rounded-xl bg-blue-500 mt-8 mb-4"></div>


          <div className="w-full my-4 flex-col rounded-xl bg-white p-4 text-left mb-8 text-lg font-medium text-black">
            <p className="text-xl font-semibold">Trip Statistics</p>
            <div className="flex flex-col md:flex-row justify-between">
              <p>Alabama: {user.stateUniques[0]}/4 ({user.stateTrips[0]} trips, ${user.stateTotals[0].toPrecision(3)})</p>
              <p className="md:text-right">Colorado: {user.stateUniques[5]}/1 ({user.stateTrips[5]} trips, ${user.stateTotals[5].toPrecision(3)})</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <p>Florida: {user.stateUniques[8]}/2 ({user.stateTrips[8]} trips, ${user.stateTotals[8].toPrecision(3)})</p>
              <p className="md:text-right">Georgia: {user.stateUniques[9]}/2 ({user.stateTrips[9]} trips, ${user.stateTotals[9].toPrecision(3)})</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <p>Kentucky: {user.stateUniques[16]}/1 ({user.stateTrips[16]} trips, ${user.stateTotals[16].toPrecision(3)})</p>
              <p className="md:text-right">Missouri: {user.stateUniques[24]}/1 ({user.stateTrips[24]} trips, ${user.stateTotals[24].toPrecision(3)})</p>
            </div><div className="flex flex-col md:flex-row justify-between">
              <p>South Carolina: {user.stateUniques[39]}/1 ({user.stateTrips[39]} trips, ${user.stateTotals[39].toPrecision(3)})</p>
              <p className="md:text-right">Tennessee: {user.stateUniques[41]}/2 ({user.stateTrips[41]} trips, ${user.stateTotals[41].toPrecision(3)})</p>
            </div>
            <p>Texas: {user.stateUniques[42]}/35 ({user.stateTrips[42]} trips, ${user.stateTotals[42].toPrecision(3)})</p>
            <br></br>

            <div className="flex flex-col md:flex-row justify-between">
              <p>Brisket: {user.itemTrips[0]} trips</p>
              <p className="md:text-right">Clothing: {user.itemTrips[1]} trips</p>
            </div><div className="flex flex-col md:flex-row justify-between">
              <p>Cold Grab n Go: {user.itemTrips[2]} trips</p>
              <p className="md:text-right">Dessert: {user.itemTrips[3]} trips</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <p>Gas: {user.itemTrips[4]} trips</p>
              <p className="md:text-right">Home Goods: {user.itemTrips[5]} trips</p>
            </div><div className="flex flex-col md:flex-row justify-between">
              <p>Hot Grab n Go: {user.itemTrips[6]} trips</p>
              <p className="md:text-right">Jerky: {user.itemTrips[7]} trips</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <p>Outdoors: {user.itemTrips[8]} trips</p>
              <p className="md:text-right">Snacks: {user.itemTrips[9]} trips</p>
            </div>
            <br></br>

            <p>
              Most Visited Location: 
              {user.mostVisitedLocation === 0 ? 
                " Nowhere yet!" : 
                ` #${user.mostVisitedLocation} ${locations.find(location => location.id === user.mostVisitedLocation)?.city || "NONE"}, ${locations.find(location => location.id === user.mostVisitedLocation)?.state || "NONE"} ($${user.locationTotals[user.mostVisitedLocation]?.toPrecision(3) || "0.00"} in ${user.locationTrips[user.mostVisitedLocation] || 0} trips)`
              }
            </p>
            <p>
              Most Spent Location: 
              {user.mostSpentLocation === 0 ? 
                " Nowhere yet!" : 
                ` #${user.mostSpentLocation} ${locations.find(location => location.id === user.mostSpentLocation)?.city || "NONE"}, ${locations.find(location => location.id === user.mostSpentLocation)?.state || "NONE"} ($${user.locationTotals[user.mostSpentLocation]?.toPrecision(3) || "0.00"} in ${user.locationTrips[user.mostSpentLocation] || 0} trips)`
              }
            </p>
            <p>
              Most Bought Item: 
              {user.itemTrips[user.mostBoughtItem] === 0 ? 
                " Nothing yet!" : 
                ` ${itemIndexToName(user.mostBoughtItem)} (${user.itemTrips[user.mostBoughtItem]} trips)`
              }
            </p>
            <p className="text-xl font-semibold">Grand Total: ${user.grandTotal.toPrecision(3)} in {user.totalTrips} trips to {user.totalLocations} locations across {user.totalStates} states</p>
          </div>
        </div>

        <div className="flex flex-col text-center items-center w-[80%] md:w-[40%]">
          <div className='flex flex-col md:flex-row justify-between items-start w-full'>
            <p className="text-3xl font-semibold w-full text-left">Trip History</p>
            <LinkButton label='Add Trip' className='w-full md:w-[70%] mt-3 md:mt-0' color='yellow' onClick={() => setIsAddingTrip(true)}></LinkButton>
          </div>
          <div className="my-4 w-full">
            {trips && trips.map((trip, index) => (
              <TripCard
                key={index}
                date={trip.date}
                price={trip.total.toPrecision(3)}
                location={`#${trip.location} ${locations.find(location => location.id === trip.location)?.city || "NONE"}, ${trip.state}`}
                items={trip.items}
                locationVisitNumber={trip.locationTripIdx}
                stateVisitNumber={trip.stateTripIdx}
                lifetimeVisitNumber={trip.lifetimeTripIdx}
                state={trip.state}
              />
            ))}
          </div>
          <div className="w-[15%] h-[50px] rounded-xl bg-bucee-yellow -mt-4"></div>
        </div>
      </div>}
      {isAddingTrip && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center text-black">
          <div className="flex flex-col items-center bg-gray-200 p-8 rounded-xl">
            <p className="text-2xl font-semibold w-full text-center mb-4">Add Trip {total}</p>
            <TextInput type='date' label='Date' className='w-full' onChange={handleDateChange} value={date}/>

            <div className='w-full flex flex-col items-center mb-4'>
              <p className="font-medium text-left w-full">Location</p>
              <select className='w-full rounded-lg p-1' onChange={(e) => handleLocationChange(e.target.value)} value={location}>
                <option className='px-2'>Select a location</option>
                {locations && locations.map(location => (
                  <option key={location.id} value={`#${location.id} ${location.city}, ${location.state}`}>#{location.id.toString()} {location.city}, {location.state}</option>
                ))}
              </select>
            </div>

            <TextInput type='number' label='Total' onChange={handleTotalChange} value={total}/>
            <div className="flex flex-col gap-2 mb-4 w-full">
              <div className="flex flex-row w-full justify-between gap-4">
                <label>
                  <input type="checkbox" className='mr-1' onChange={handleCheckboxChange('Brisket')} />
                  Brisket
                </label>
                <label>
                  <input type="checkbox" className='mr-1' onChange={handleCheckboxChange('Clothing')} />
                  Clothing
                </label>
              </div>
              <div className="flex flex-row w-full justify-between gap-4">
                <label>
                  <input type="checkbox" className='mr-1' onChange={handleCheckboxChange('Cold Grab n Go')} />
                  Cold Grab n Go
                </label>
                <label>
                  <input type="checkbox" className='mr-1' onChange={handleCheckboxChange('Dessert')} />
                  Dessert
                </label>
              </div>
              <div className="flex flex-row w-full justify-between gap-4">
                <label>
                  <input type="checkbox" className='mr-1' onChange={handleCheckboxChange('Gas')} />
                  Gas
                </label>
                <label>
                  <input type="checkbox" className='mr-1' onChange={handleCheckboxChange('Home Goods')} />
                  Home Goods
                </label>
              </div>
              <div className="flex flex-row w-full justify-between gap-4">
                <label>
                  <input type="checkbox" className='mr-1' onChange={handleCheckboxChange('Hot Grab n Go')} />
                  Hot Grab n Go
                </label>
                <label>
                  <input type="checkbox" className='mr-1' onChange={handleCheckboxChange('Jerky')} />
                  Jerky
                </label>
              </div>
              <div className="flex flex-row w-full justify-between gap-4">
                <label>
                  <input type="checkbox" className='mr-1' onChange={handleCheckboxChange('Outdoors')} />
                  Outdoors
                </label>
                <label>
                  <input type="checkbox" className='mr-1' onChange={handleCheckboxChange('Snacks')} />
                  Snacks
                </label>
              </div>
            </div>
            <LinkButton color='yellow' onClick={handleSubmitTrip} label='Submit' className='mb-4 md:w-auto'/>
            <LinkButton color='red' onClick={() => {
              setIsAddingTrip(false);
              setDate('');
              setItems('');
              setTotal('');
              setLocation('Select a location');
              }} 
            label='Cancel' className='md:w-auto'/>
          </div>
        </div>
      )}
    </main>
  );
}