"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';

export default function Home() {
  const [isWindowAvailable, setIsWindowAvailable] = useState(false);
  let othent;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsWindowAvailable(true);
       // Import the connect function only after window is available
       import('@othent/kms').then((module) => {
       othent= module
      });
    }else{
      setIsWindowAvailable(false);

    }
  }, [isWindowAvailable]);
//connects the othentkms during signup or login
  async function handleConnect() {
    try{
    const res = await  othent.connect();
    console.log("Connect,\n", res);
    }catch(err){
      console.log(err)
    }
  };
  return (
    <div className="h-screen flex flex-col">
      <div className="flex h-16 items-center w-full p-6">
        <Image
          className=""
          width={50}
          height={50}
          src="/veridoc2.webp"
          alt="Veridoc Log"
        />
        <div className="ml-5">
          <h1 className="text-3xl font-bold text-secondary-blue">Veridoc</h1>
          <p className="text-sm text-alt-blue"> 
            Decentralizing Trust: Fairness for All
          </p>
        </div>
        <Link
          href="/dashboard"
          className="bg-main-blue rounded px-5 py-1 text-white ml-auto"
          onClick={handleConnect}
        >
          Login
        </Link>
      </div>
      <div className="grow flex items-center w-full">
        <div className="image-part w-3/6">
          <Image
            className=""
            width={500}
            height={500}
            src="/veridoc_logo.png"
            alt="Veridoc Log"
          />
        </div> 
        <div className="w-3/6 p-4">
          <h2 className="text-4xl font-bold mb-4">
            Empowering the Judiciary with Blockchain
          </h2>
          <p className="mb-6">
            Veridoc introduces a revolutionary e-filing system designed to
            transform judicial document management. Utilizing blockchain
            technology, we offer unmatched security, transparency, and
            efficiency, setting a new standard for legal processes worldwide.
          </p>
          <div>
            <Link className="bg-main-blue rounded px-6 py-2 text-white mx-2" href='/signup' 
              onClick={handleConnect}>
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
