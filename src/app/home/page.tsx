/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import LinkButton from '../components/LinkButton';
import TextInput from '../components/TextInput';
import TripCard from '../components/TripCard';

export const metadata: Metadata = {
  title: 'Buc-ee Buddy',
}

export default function Home() { 
  const page = "home";
  
  return (
    <main className="flex min-h-screen flex-col items-center w-full mb-40">
      <div className="flex flex-col md:flex-row pt-40 items-center md:items-start w-full justify-center gap-8">
        <div className="flex flex-col text-center w-[80%] md:w-[40%]">
          <p className="text-3xl font-semibold text-center md:text-left w-full">Welcome, firstName!</p>
          <div className="w-full h-[500px] rounded-xl bg-blue-500 my-4"></div>


          <div className="w-full my-4 flex-col rounded-xl bg-white p-4 text-left mb-8 text-lg font-medium">
            <p className="text-xl font-semibold">Trip Statistics</p>
            <div className="flex flex-col md:flex-row justify-between">
              <p>Alabama: 0/4 (0 trips, $0.00)</p>
              <p className="md:text-right">Colorado: 0/4 (0 trips, $0.00)</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <p>Florida: 0/4 (0 trips, $0.00)</p>
              <p className="md:text-right">Georgia: 0/4 (0 trips, $0.00)</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <p>Kentucky: 0/4 (0 trips, $0.00)</p>
              <p className="md:text-right">Missouri: 0/4 (0 trips, $0.00)</p>
            </div><div className="flex flex-col md:flex-row justify-between">
              <p>South Carolina: 0/4 (0 trips, $0.00)</p>
              <p className="md:text-right">Tennessee: 0/4 (0 trips, $0.00)</p>
            </div>
            <p>Texas: 0/4 (0 trips, $0.00)</p>
            <br></br>

            <div className="flex flex-col md:flex-row justify-between">
              <p>Gas: 0 trips</p>
              <p className="md:text-right">Brisket: 0 trips</p>
            </div><div className="flex flex-col md:flex-row justify-between">
              <p>Dessert: 0 trips</p>
              <p className="md:text-right">Jerky: 0 trips</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <p>Outdoor: 0 trips</p>
              <p className="md:text-right">Clothing: 0 trips</p>
            </div><div className="flex flex-col md:flex-row justify-between">
              <p>Home Goods: 0 trips</p>
              <p className="md:text-right">Something: 0 trips</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <p>Hot Grab n' Go: 0 trips</p>
              <p className="md:text-right">Cold Grab n' Go: 0 trips</p>
            </div>
            <br></br>

            <p>Most Visited Location: #47 Daytona Beach, FL ($30.98 in 2 trips)</p>
            <p>Most Spent Location: #47 Daytona Beach, FL ($30.98 in 2 trips)</p>
            <p>Most Bought Item: Hot Grab n' Go (10 trips)</p>
            <p className="text-xl font-semibold">Grand Total: $50.42 in 12 trips to 5 locations across 4 states</p>
          </div>
        </div>

        <div className="flex flex-col text-center items-center w-[80%] md:w-[40%]">
          <p className="text-3xl font-semibold text-center w-full">Trip History</p>
          <div className="my-4 w-full">
            <TripCard date={'May 9, 2024'} price={25.5} location={'#47 Daytona Beach, FL'} items={'Gas, Brisket, Hot Grab n Go'} locationVisitNumber={0} stateVisitNumber={0} lifetimeVisitNumber={0} />
            <TripCard date={'May 9, 2024'} price={25.5} location={'#47 Daytona Beach, FL'} items={'Gas, Brisket, Hot Grab n Go'} locationVisitNumber={0} stateVisitNumber={0} lifetimeVisitNumber={0} />
            <TripCard date={'May 9, 2024'} price={25.5} location={'#47 Daytona Beach, FL'} items={'Gas, Brisket, Hot Grab n Go'} locationVisitNumber={0} stateVisitNumber={0} lifetimeVisitNumber={0} />
            <TripCard date={'May 9, 2024'} price={25.5} location={'#47 Daytona Beach, FL'} items={'Gas, Brisket, Hot Grab n Go'} locationVisitNumber={0} stateVisitNumber={0} lifetimeVisitNumber={0} />
          </div>

          <div className="w-[15%] h-[50px] rounded-xl bg-bucee-yellow -mt-4"></div>
        </div>
      </div>
    </main>
  );
}
