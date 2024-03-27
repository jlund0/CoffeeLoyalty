import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
const NavBar = () => {
  return (
    <>
      <nav className="fixed text-lg flex justify-between w-screen border-2 bg-[#efeee8] h-20 drop-shadow-xl z-10">
        {/* <h1 className="logo lobster-regular m-auto">Loyal Bean</h1> */}
        <div className="flex">
          <img src="logo.png" className="h-full p-2 ml-5" alt="logo" />
          <h2 className="lobster-regular">Loyal Bean</h2>
          <Link to="/">
            <h3>Customers</h3>
          </Link>

          <Link to="/store-owner">
            <h3>Store Owners</h3>
          </Link>

          <Link to="/contact">
            <h3>Support</h3>
          </Link>
        </div>
        <div className="flex ">
          <Link to="/signin">
            <h3>Go to admin console</h3>
          </Link>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
