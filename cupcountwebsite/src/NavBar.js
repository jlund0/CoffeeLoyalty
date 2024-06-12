import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function NavBar() {
  return (
    <nav className="fixed text-lg flex w-full p-6 h-28  z-50 justify-center items-center ">
      {/* <h1 className="logo lobster-regular m-auto">Loyal Bean</h1> */}

      <div className="absolute top-0 left-0 flex flex-row justify-center items-center p-5">
        <img
          src="logo.png"
          className="h-full p-2 ml-5"
          alt="logo"
          width={75}
          height={75}
        />
        <h2 className="lobster-regular">CupCount</h2>
      </div>
      <div className="shadow-xl px-10 py-2 justify-self-center flex flex-row  self-center bg-white rounded-full gap-5 border-2 border-black">
        <Link to="/">
          <h3 className="hover:text-white hover:bg-black rounded-full p-2 px-4">
            Home
          </h3>
        </Link>

        <Link to="/store-owner">
          <h3 className="hover:text-white hover:bg-black rounded-full p-2 px-4">
            Store Owners
          </h3>
        </Link>

        <Link to="/contact">
          <h3 className="hover:text-white hover:bg-black rounded-full p-2 px-4">
            Contact
          </h3>
        </Link>
        <Link to="/about">
          <h3 className="hover:text-white hover:bg-black rounded-full p-2 px-4">
            Support
          </h3>
        </Link>
        <Link to="/about">
          <h3 className="text-white bg-black rounded-full p-2 px-4 bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:shadow-lg">
            Get CupCount
          </h3>
        </Link>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="w-full flex flex-col items-center m-0">
      <div className="flex flex-row justify-evenly py-10 w-4/5">
        <div className="flex flex-col gap-2 w-2/5">
          <div className="flex flex-row  items-center">
            {/* <img
            src="logo.png"
            className="h-full p-2 "
            alt="logo"
            width={60}
            height={60}
          /> */}
            <h2 className="lobster-regular">CupCount</h2>
          </div>
          <text>
            Convenient app for tracking coffee loyalty cards in one place.
          </text>
          <text>support@cupcount.com</text>
          <h3>Download Today</h3>
          <div className="flex flex-row  gap-3 w-3/5">
            <div className="flex h-10  content-center bg-black text-white px-2 py-2 rounded-full gap-2 bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:shadow-lg hover:scale-110">
              <img
                src="/appleicon.png"
                alt="applelogo"
                className=""
                height={"100%"}
              />
              <text className="text-sm m-auto">App Store</text>
            </div>
            <div className="flex justify-center h-10 content-center bg-black text-white px-2 py-2 rounded-full gap-1 bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:shadow-lg hover:scale-110">
              <img src="/googleicon.png" alt="googlelogo" className="px-1" />
              <text className="text-sm m-auto">Play Store</text>
            </div>
          </div>
        </div>
        <div className="w-2/5 flex flex-col">
          <text>Have a cafe and want to join the CupCount network?</text>
          <text>Sign up today!</text>
        </div>
      </div>
      <text className="">© 2023. CupCount All rights reserved.</text>
    </footer>
  );
}
