import { useState } from "react";
const BottomNav = ({ bgColor }) => {
  const [color, setColor] = useState(bgColor);
  return (
    // <div className={`bg-[${bgColor}]`}>

    <div id="bottomNav" className="object-cover">
      {/* <div id="bottomNav" className="absolute bottom-0 bg-transparent"> */}
      <div id="bottom-nav" className="flex w-screen justify-center">
        <ul className="w-3/12 flex justify-evenly  cursor-pointer">
          <li>Download</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="flex w-screen justify-center ">
        <ul className="w-3/12 flex justify-evenly  cursor-pointer text-neutral-600 pb-4">
          <li className="no-underline">
            <span className="lobster-regular">CupCount</span>©2024
          </li>
          <li className=""> Created by Julian Lund</li>
        </ul>
      </div>
    </div>
  );
};
export default BottomNav;
