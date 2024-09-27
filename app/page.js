"use client"
import { useEffect, useState } from "react";
// import Image from "next/image";
import dynamic from 'next/dynamic';
// import Campaign from './_components/campaign';
import Contact from "./_components/Contact";
import Gallery from './_components/Gallery';
import Hero from "./_components/Hero";
import Attendance from "./_components/attendance";
import Chatbot from "./_components/chatbot";
import EventPage from "./_components/events";
import GlobalApi from "./_utils/GlobalApi";

// Dynamically import MapComponent with server-side rendering disabled
const MapComponent = dynamic(() => import('./_components/map'), { ssr: false });
export default function Home() {

const [doctorList,setDoctorList]=useState( []);
useEffect(()=>{
  getDoctorList();
},[])

  const getDoctorList=()=>{
    GlobalApi.getDoctorList().then(resp=>{
      console.log(resp.data.data);
      setDoctorList(resp.data.data)
    })
  }
  return (
    <>
      <div>
        <Hero/>
        
        {/* <DoctorList doctorList={doctorList}/> */}
      </div>
      <div className="mt-20">
        <Attendance/>
      </div>
      <div className="mt-20">
        <Chatbot/>
      </div>
      <div className="mt-20">
        <EventPage/>
      </div>
      <div className="mt-20">
        <Gallery/>
      </div>
      {/* <div className="mt-20">
        <Campaign/>
      </div> */}
      <div id="main-container" className="main-container">
      <div id="contact-card" className="card-container">
          <h1 id="contact-header" className="header-text">Contact Us</h1>
          <Contact />
      </div>
      {/* <div id="timings-card" className="timings-container">
          <Timings />
      </div> */}
      </div>
      <div id="map-container" className="map-container">
          <MapComponent />
      </div>
    </>
  );
}
