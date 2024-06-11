import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
const NavBar = () => {
  return (
    <>
      <nav className="fixed text-lg flex w-screen p-6 h-28  z-10 justify-center items-center ">
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
        </div>
        {/* <div className="self-end">
          <Link to="/signin">
            <h3>Go to admin console</h3>
          </Link>
        </div> */}
      </nav>
    </>
  );
};
export default NavBar;
