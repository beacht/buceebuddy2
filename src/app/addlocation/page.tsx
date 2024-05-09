/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import LinkButton from '../components/LinkButton';
import TextInput from '../components/TextInput';
import { useState } from 'react';
import firebase from "../../../firebase";

export default function Home() { 
  const [id, setId] = useState<string>('0');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [latitude, setLatitude] = useState<string>('0');
  const [longitude, setLongitude] = useState<string>('0');
  const [state, setState] = useState<string>('');

  async function getLocations() {
    try {
      const locationsRef = firebase.firestore().collection('locations');
      const locationsSnapshot = await locationsRef.get();
      console.log(locationsSnapshot.size);
      locationsSnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
      });
    } catch (error) {
      console.error('error: ', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await firebase.firestore().collection('locations').doc(id).set({
        address,
        city,
        state,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      });
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const handleIdChange = (newValue: string) => {
    setId(newValue);
  }

  const handleAddressChange = (newValue: string) => {
    setAddress(newValue);
  }

  const handleCityChange = (newValue: string) => {
    setCity(newValue);
  }

  const handleLatitudeChange = (newValue: string) => {
    setLatitude(newValue);
  }

  const handleLongitudeChange = (newValue: string) => {
    setLongitude(newValue);
  }

  const handleStateChange = (newValue: string) => {
    setState(newValue);
  }

  const addLocation = async () => {
    try {
      await firebase.firestore().collection('locations').doc(id).set({
        address: address,
        city: city,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        state: state
      });
      console.log('Location added successfully');
    } catch (error) {
      console.error('Error adding location: ', error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <div className="flex flex-col-reverse md:flex-row pt-40 items-center w-full justify-center">
        <div className="flex flex-col text-center w-[80%] lg:w-[40%] xl:w-[30%]">
          <p className="text-5xl font-semibold w-full">Add Location</p>

          <TextInput label='ID' value={id} onChange={handleIdChange}/>
          <TextInput label='Address' value={address} onChange={handleAddressChange}/>
          <TextInput label='City' value={city} onChange={handleCityChange}/>
          <TextInput label='Latitude' type="number" value={latitude} onChange={handleLatitudeChange}/>
          <TextInput label='Longitude' type="number" value={longitude} onChange={handleLongitudeChange}/>
          <TextInput label='State' value={state} onChange={handleStateChange}/>

          <LinkButton className='self-center mt-4 w-full md:w-full' color='red' label='Log Locations' onClick={getLocations}/>

          <LinkButton className='self-center mt-4 w-full md:w-full' color='red' label='Add Location' onClick={handleSubmit}/>
        </div>
      </div>
    </main>
  );
}
