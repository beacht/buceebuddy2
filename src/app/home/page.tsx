/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import firebase from '../../../firebase'; // Assuming firebase config is properly imported
import LinkButton from '../components/LinkButton';
import TextInput from '../components/TextInput';
import TripCard from '../components/TripCard';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { useRouter } from 'next/navigation';

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
  const [locationViewed, setLocationViewed] = useState<Location | undefined>();
  const router = useRouter();

  const getLocationsAndUser = useCallback(async (userId: string) => {
    try {
      const locationsRef = firebase.firestore().collection('locations');
      const locationsSnapshot = await locationsRef.get();
      const locationsData = locationsSnapshot.docs.map(doc => {
        const locationData = { id: parseInt(doc.id), address: doc.data().address, city: doc.data().city, latitude: doc.data().latitude, longitude: doc.data().longitude, state: doc.data().state, ...doc.data() };
        return locationData;
      });
      setLocations(locationsData);
      console.log(locationsData);

      const usersRef = firebase.firestore().collection('users');
      const userData = await usersRef.doc(userId).get(); // Use dynamic user ID
      if (userData.exists) {
        const userDataObject = userData.data() as User;
        setUser(userDataObject);

        const tripsRef = usersRef.doc(userId).collection('trips'); // Use dynamic user ID
        const tripsSnapshot = await tripsRef.get();
        const tripsData = tripsSnapshot.docs.map(doc => {
          const tripData = { id: doc.id, date: doc.data().date, location: doc.data().location, items: doc.data().items, total: doc.data().total, lifetimeTripIdx: doc.data().lifetimeTripIdx, locationTripIdx: doc.data().locationTripIdx, state: doc.data().state, stateTripIdx: doc.data().stateTripIdx };
          return tripData;
        });
        setTrips(tripsData);
      } else {
        console.error('User document not found');
      }
    } catch (error) {
      console.error('error: ', error);
    }
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        getLocationsAndUser(user.uid);
      } else {
        router.push('/login'); // Redirect to login if not authenticated
      }
    });
  }, [getLocationsAndUser, router]);

  const handleDateChange = (newValue: string) => {
    setDate(newValue);
  };

  const handleLocationChange = (newValue: string) => {
    setLocation(newValue);
  };

  const handleTotalChange = (newValue: string) => {
    setTotal(newValue);
  };

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
  };

  const formatDate = (dateString: string) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [year, month, day] = dateString.split('-');
    const monthName = months[parseInt(month) - 1];
    console.log(`${monthName} ${parseInt(day)}, ${year}`);
    return `${monthName} ${parseInt(day)}, ${year}`;
  };

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
  };

  const getStateNumber = (stateAbbreviation: string) => {
    const stateAbbreviations: string[] = [
      "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
      "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
      "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
      "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
      "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
    ];

    if (!stateAbbreviations.includes(stateAbbreviation)) return -1;
    else return stateAbbreviations.indexOf(stateAbbreviation.toUpperCase());
  };

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
    
    if(!errorFlag && user){
      try {
        console.log(location);
        const state = locations.find(thisLocation => thisLocation.id === getLocationNumber())?.state || "NONE";
        const stateNumber = getStateNumber(state);
        const locationNumber = getLocationNumber();
        const totalNumeric = parseFloat(total);
        await firebase.firestore().collection('users').doc(firebase.auth().currentUser?.uid).collection('trips').add({
          date: formatDate(date),
          items: items,
          total: totalNumeric,
          location: locationNumber,
          state: state || "NONE",
          lifetimeTripIdx: (user?.totalTrips || 0) + 1,
          stateTripIdx: (user?.stateTrips[stateNumber] || 0) + 1,
          locationTripIdx: (user?.locationTrips[locationNumber] || 0) + 1,
        });

        console.log(user.locationTotals[locationNumber], '+', totalNumeric, '=', user.locationTotals[locationNumber] + totalNumeric);
        console.log('>=', user.locationTotals[user.mostSpentLocation]);
        console.log(user.locationTotals[locationNumber] + totalNumeric >= user.locationTotals[user.mostSpentLocation]);
        console.log(user.mostSpentLocation === 0);

        await firebase.firestore().collection('users').doc(firebase.auth().currentUser?.uid).update({
          ...((user.locationTrips[locationNumber] === 0 || !user.locationTrips[locationNumber]) && {[`totalLocations`]: firebase.firestore.FieldValue.increment(1)}),
          ...((user.stateTrips[stateNumber] === 0 || !user.stateTrips[stateNumber]) && {[`totalStates`]: firebase.firestore.FieldValue.increment(1)}),
          [`stateTrips.${stateNumber}`]: firebase.firestore.FieldValue.increment(1),
          [`stateTotals.${stateNumber}`]: firebase.firestore.FieldValue.increment(totalNumeric),
          [`grandTotal`]: firebase.firestore.FieldValue.increment(totalNumeric),
          ...((user.mostSpentLocation === 0 || (user.locationTotals[locationNumber] || 0) + totalNumeric >= user.locationTotals[user.mostSpentLocation]) && {mostSpentLocation: locationNumber}),
          ...((user.mostVisitedLocation === 0 || (user.locationTrips[locationNumber] || 0) + 1 >= user.locationTrips[user.mostVisitedLocation]) && {mostVisitedLocation: locationNumber}),
          ...((user?.locationTrips[locationNumber] === 0 || !user.locationTrips[locationNumber]) && { [`stateUniques.${stateNumber}`]: firebase.firestore.FieldValue.increment(1) }),
          [`locationTotals.${locationNumber}`]: firebase.firestore.FieldValue.increment(totalNumeric),
          [`locationTrips.${locationNumber}`]: firebase.firestore.FieldValue.increment(1),
          
          ...(items.includes("Brisket") && (user.mostBoughtItem === -1 || user.itemTrips[0] + 1 >= user.itemTrips[user.mostBoughtItem]) && { mostBoughtItem: 0 }),
          ...(items.includes("Clothing") && (user.mostBoughtItem === -1  || user.itemTrips[1] + 1 >= user.itemTrips[user.mostBoughtItem]) && { mostBoughtItem: 1 }),
          ...(items.includes("Cold Grab n Go") && (user.mostBoughtItem === -1  || user.itemTrips[2] + 1 >= user.itemTrips[user.mostBoughtItem]) && { mostBoughtItem: 2 }),
          ...(items.includes("Dessert") && (user.mostBoughtItem === -1  || user.itemTrips[3] + 1 >= user.itemTrips[user.mostBoughtItem]) && { mostBoughtItem: 3 }),
          ...(items.includes("Gas") && (user.mostBoughtItem === -1  || user.itemTrips[4] + 1 >= user.itemTrips[user.mostBoughtItem]) && { mostBoughtItem: 4 }),
          ...(items.includes("Home Goods") && (user.mostBoughtItem === -1  || user.itemTrips[5] + 1 >= user.itemTrips[user.mostBoughtItem]) && { mostBoughtItem: 5 }),
          ...(items.includes("Hot Grab n Go") && (user.mostBoughtItem === -1  || user.itemTrips[6] + 1 >= user.itemTrips[user.mostBoughtItem]) && { mostBoughtItem: 6 }),
          ...(items.includes("Jerky") && (user.mostBoughtItem === -1  || user.itemTrips[7] + 1 >= user.itemTrips[user.mostBoughtItem]) && { mostBoughtItem: 7 }),
          ...(items.includes("Outdoors") && (user.mostBoughtItem === -1  || user.itemTrips[8] + 1 >= user.itemTrips[user.mostBoughtItem]) && { mostBoughtItem: 8 }),
          ...(items.includes("Snacks") && (user.mostBoughtItem === -1  || user.itemTrips[9] + 1 >= user.itemTrips[user.mostBoughtItem]) && { mostBoughtItem: 9 }),
          ...(items.includes("Brisket") && { [`itemTrips.0`]: firebase.firestore.FieldValue.increment(1) }),
          ...(items.includes("Clothing") && { [`itemTrips.1`]: firebase.firestore.FieldValue.increment(1) }),
          ...(items.includes("Cold Grab n Go") && { [`itemTrips.2`]: firebase.firestore.FieldValue.increment(1) }),
          ...(items.includes("Dessert") && { [`itemTrips.3`]: firebase.firestore.FieldValue.increment(1) }),
          ...(items.includes("Gas") && { [`itemTrips.4`]: firebase.firestore.FieldValue.increment(1) }),
          ...(items.includes("Home Goods") && { [`itemTrips.5`]: firebase.firestore.FieldValue.increment(1) }),
          ...(items.includes("Hot Grab n Go") && { [`itemTrips.6`]: firebase.firestore.FieldValue.increment(1) }),
          ...(items.includes("Jerky") && { [`itemTrips.7`]: firebase.firestore.FieldValue.increment(1) }),
          ...(items.includes("Outdoors") && { [`itemTrips.8`]: firebase.firestore.FieldValue.increment(1) }),
          ...(items.includes("Snacks") && { [`itemTrips.9`]: firebase.firestore.FieldValue.increment(1) }),
          
          [`totalTrips`]: firebase.firestore.FieldValue.increment(1),
        })

        setIsAddingTrip(false);
        window.location.reload();

      } catch (error) {
        console.error('Error adding trip:', error);
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center w-full mb-40">
      {user && locations && <div className="flex flex-col md:flex-row pt-40 items-center md:items-start w-full justify-center gap-8">
        <div className="flex flex-col text-center w-[80%] md:w-[40%]">
          <p className="text-3xl font-semibold text-center md:text-left w-full">Welcome, {user.firstName}!</p>
          <div className="w-full h-[500px] rounded-xl bg-blue-500 mt-8 mb-4">
            <LoadScript googleMapsApiKey='AIzaSyBiHdtgtO9nc0Kq8y8GPeoJz1MGhLiH2aI'>
              <GoogleMap
                mapContainerStyle={{width: '100%', height: '100%', borderRadius: '12px'}}
                zoom={5}
                center={{lat: 35.1495, lng: -92.0490}}
              >
                {locations.map((location) => {
                  const hasTrips = user.locationTrips[location.id] >= 1;
                  const iconUrl = hasTrips ? 'https://i.imgur.com/oMJORMV.png' : 'https://i.imgur.com/iUFTKnU.png';

                  return (
                    <Marker
                      key={location.id}
                      position={{ lat: location.latitude, lng: location.longitude }}
                      title={location.address}
                      icon={{ url: iconUrl}}
                    />
                  );
                })}
              </GoogleMap>
            </LoadScript>
          </div>


          <div className="w-full my-4 flex-col rounded-xl bg-white p-4 text-left mb-8 text-lg font-medium text-black">
            <p className="text-xl font-semibold">Trip Statistics</p>
            <div className="flex flex-col md:flex-row justify-between">
                <p>Alabama: {user.stateUniques[0] || 0}/4 ({user.stateTrips[0] || 0} {user.stateTrips[0] === 1 ? 'trip' : 'trips'}, ${user.stateTotals[0] ? (Number.isInteger(user.stateTotals[0]) ? user.stateTotals[0] : user.stateTotals[0].toPrecision(3)) : '0.00'})</p>
                <p className="md:text-right">Colorado: {user.stateUniques[5] || 0}/1 ({user.stateTrips[5] || 0} {user.stateTrips[5] === 1 ? 'trip' : 'trips'}, ${user.stateTotals[5] ? (Number.isInteger(user.stateTotals[5]) ? user.stateTotals[5] : user.stateTotals[5].toPrecision(3)) : '0.00'})</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
                <p>Florida: {user.stateUniques[8] || 0}/2 ({user.stateTrips[8] || 0} {user.stateTrips[8] === 1 ? 'trip' : 'trips'}, ${user.stateTotals[8] ? (Number.isInteger(user.stateTotals[8]) ? user.stateTotals[8] : user.stateTotals[8].toPrecision(3)) : '0.00'})</p>
                <p className="md:text-right">Georgia: {user.stateUniques[9] || 0}/2 ({user.stateTrips[9] || 0} {user.stateTrips[9] === 1 ? 'trip' : 'trips'}, ${user.stateTotals[9] ? (Number.isInteger(user.stateTotals[9]) ? user.stateTotals[9] : user.stateTotals[9].toPrecision(3)) : '0.00'})</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
                <p>Kentucky: {user.stateUniques[16] || 0}/1 ({user.stateTrips[16] || 0} {user.stateTrips[16] === 1 ? 'trip' : 'trips'}, ${user.stateTotals[16] ? (Number.isInteger(user.stateTotals[16]) ? user.stateTotals[16] : user.stateTotals[16].toPrecision(3)) : '0.00'})</p>
                <p className="md:text-right">Missouri: {user.stateUniques[24] || 0}/1 ({user.stateTrips[24] || 0} {user.stateTrips[24] === 1 ? 'trip' : 'trips'}, ${user.stateTotals[24] ? (Number.isInteger(user.stateTotals[24]) ? user.stateTotals[24] : user.stateTotals[24].toPrecision(3)) : '0.00'})</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
                <p>South Carolina: {user.stateUniques[39] || 0}/1 ({user.stateTrips[39] || 0} {user.stateTrips[39] === 1 ? 'trip' : 'trips'}, ${user.stateTotals[39] ? (Number.isInteger(user.stateTotals[39]) ? user.stateTotals[39] : user.stateTotals[39].toPrecision(3)) : '0.00'})</p>
                <p className="md:text-right">Tennessee: {user.stateUniques[41] || 0}/2 ({user.stateTrips[41] || 0} {user.stateTrips[41] === 1 ? 'trip' : 'trips'}, ${user.stateTotals[41] ? (Number.isInteger(user.stateTotals[41]) ? user.stateTotals[41] : user.stateTotals[41].toPrecision(3)) : '0.00'})</p>
            </div>
            <p>Texas: {user.stateUniques[42] || 0}/35 ({user.stateTrips[42] || 0} {user.stateTrips[42] === 1 ? 'trip' : 'trips'}, ${user.stateTotals[42] ? (Number.isInteger(user.stateTotals[42]) ? user.stateTotals[42] : user.stateTotals[42].toPrecision(3)) : '0.00'})</p>
            <br></br>

            <div className="flex flex-col md:flex-row justify-between">
                <p>Brisket: {user.itemTrips[0] || 0} {user.itemTrips[0] === 1 ? 'trip' : 'trips'}</p>
                <p className="md:text-right">Clothing: {user.itemTrips[1] || 0} {user.itemTrips[1] === 1 ? 'trip' : 'trips'}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
                <p>Cold Grab n Go: {user.itemTrips[2] || 0} {user.itemTrips[2] === 1 ? 'trip' : 'trips'}</p>
                <p className="md:text-right">Dessert: {user.itemTrips[3] || 0} {user.itemTrips[3] === 1 ? 'trip' : 'trips'}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
                <p>Gas: {user.itemTrips[4] || 0} {user.itemTrips[4] === 1 ? 'trip' : 'trips'}</p>
                <p className="md:text-right">Home Goods: {user.itemTrips[5] || 0} {user.itemTrips[5] === 1 ? 'trip' : 'trips'}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
                <p>Hot Grab n Go: {user.itemTrips[6] || 0} {user.itemTrips[6] === 1 ? 'trip' : 'trips'}</p>
                <p className="md:text-right">Jerky: {user.itemTrips[7] || 0} {user.itemTrips[7] === 1 ? 'trip' : 'trips'}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
                <p>Outdoors: {user.itemTrips[8] || 0} {user.itemTrips[8] === 1 ? 'trip' : 'trips'}</p>
                <p className="md:text-right">Snacks: {user.itemTrips[9] || 0} {user.itemTrips[9] === 1 ? 'trip' : 'trips'}</p>
            </div>
            <br></br>

            <p>
                Most Visited Location: 
                {!user.mostVisitedLocation ? 
                    " Nowhere yet!" : 
                    ` #${user.mostVisitedLocation} ${locations.find(location => location.id === user.mostVisitedLocation)?.city || "NONE"}, ${locations.find(location => location.id === user.mostVisitedLocation)?.state || "NONE"} ($${Number.isInteger(user.locationTotals[user.mostVisitedLocation]) ? user.locationTotals[user.mostVisitedLocation] : user.locationTotals[user.mostVisitedLocation]?.toPrecision(3) || "0.00"} in ${user.locationTrips[user.mostVisitedLocation] || 0} trip${user.locationTrips[user.mostVisitedLocation] === 1 ? '' : 's'})`
                }
            </p>
            <p>
                Most Spent Location: 
                {!user.mostSpentLocation ? 
                    " Nowhere yet!" : 
                    ` #${user.mostSpentLocation} ${locations.find(location => location.id === user.mostSpentLocation)?.city || "NONE"}, ${locations.find(location => location.id === user.mostSpentLocation)?.state || "NONE"} ($${Number.isInteger(user.locationTotals[user.mostSpentLocation]) ? user.locationTotals[user.mostSpentLocation] : user.locationTotals[user.mostSpentLocation]?.toPrecision(3) || "0.00"} in ${user.locationTrips[user.mostSpentLocation] || 0} trip${user.locationTrips[user.mostSpentLocation] === 1 ? '' : 's'})`
                }
            </p>
            <p>
                Most Bought Item: 
                {(user.mostBoughtItem === -1) ? 
                    " Nothing yet!"  : 
                    ` ${itemIndexToName(user.mostBoughtItem)} (${user.itemTrips[user.mostBoughtItem]} trip${user.itemTrips[user.mostBoughtItem] === 1 ? '' : 's'})`
                }
            </p>
            <p className="text-xl font-semibold">Grand Total: ${Number.isInteger(user.grandTotal) ? user.grandTotal : user.grandTotal.toPrecision(3)} in {user.totalTrips} trip{user.totalTrips === 1 ? '' : 's'} to {user.totalLocations} location{user.totalLocations === 1 ? '' : 's'} {user.totalStates === 1 ? 'in' : 'across'} {user.totalStates} state{user.totalStates === 1 ? '' : 's'}</p>

          </div>
        </div>

        <div className="flex flex-col text-center items-center w-[80%] md:w-[40%]">
          <div className='flex flex-col md:flex-row justify-between items-start w-full'>
            <p className="text-3xl font-semibold w-full text-left">Trip History</p>
            <LinkButton label='Add Trip' className='w-full md:w-[70%] mt-3 md:mt-0' color='yellow' onClick={() => setIsAddingTrip(true)}></LinkButton>
          </div>
          <div className="my-4 w-full">
            {trips && trips.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((trip, index) => (
              <TripCard
                trip={trip}
                key={index}
                locationDoc={locations.filter(loc => loc.id == trip.location).at(0)}
                date={trip.date}
                price={Number.isInteger(trip.total) ? trip.total.toString() : trip.total.toPrecision(3)}
                locationString={`#${trip.location} ${locations.find(location => location.id === trip.location)?.city || "NONE"}, ${trip.state}`}
                items={trip.items}
                locationVisitNumber={trip.locationTripIdx}
                stateVisitNumber={trip.stateTripIdx}
                lifetimeVisitNumber={trip.lifetimeTripIdx}
                state={trip.state}
                setLocationViewed={setLocationViewed}
              />
            ))}
          </div>
          <div className="w-[15%] h-[50px] rounded-xl bg-bucee-yellow -mt-4"></div>
        </div>
      </div>}
      {isAddingTrip && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center text-black">
          <div className="flex flex-col items-center bg-gray-200 p-8 rounded-xl">
            <p className="text-2xl font-semibold w-full text-center mb-4">Add Trip</p>
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