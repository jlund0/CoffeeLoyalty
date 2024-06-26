import { useState } from "react";
import { ContactUs } from "./HomePage";
import NavBar from "../NavBar";
import { GiCoffeeBeans } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Footer } from "../NavBar";

const PricingPage = () => {
  return (
    <body id="adminPage">
      <NavBar showConsoleButton={true} />
      <Home />
      <Pricing />
      <ContactUs />
      <Footer />
    </body>
  );
};
export default PricingPage;

function Home() {
  return (
    <section className="lg:h-screen flex justify-center items-center dotted-bg flex-col">
      <div id="nav_buffer h-24"></div>
      <div id="store-owner" className="flex justify-center h-2/4">
        <div className="flex flex-col ">
          <h1 className="lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-900 font-extrabold py-2">
            Get on CupCount Today:
          </h1>
          <h2 className="text-5xl my-2">
            Expand Your Reach <br />
            and connect with Coffee Lovers Everywhere!
          </h2>

          <div>
            <button className="rounded-full border-4 px-5 my-2 py-2 border-black transition ease-in-out delay-150 bg-white hover:bg-[#89cff0]  duration-300">
              Sign up free today
            </button>
          </div>
        </div>
      </div>
      {/* <div className="w-full absolute -bottom-28 ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            // fill="#a2d9ff"
            stroke-width="15"
            id="curve"
            fill-opacity="01"
            d="M0,160L60,170.7C120,181,240,203,360,181.3C480,160,600,96,720,96C840,96,960,160,1080,176C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>

          <text className="text-4xl  text-black">
            <textPath href="#curve" startOffset={"2%"}>
              Save
            </textPath>
            <textPath href="#curve" startOffset={"8%"}>
              Easy to track
            </textPath>
            <textPath href="#curve" startOffset={"20%"}>
              Get discovered
            </textPath>
            <textPath href="#curve" startOffset={"35%"}>
              Sustainable
            </textPath>
            <textPath href="#curve" startOffset={900}></textPath>
          </text>
        </svg>
      </div> */}
      <div
        id="perks"
        className=" lg:absolute bottom-20 flex flex-col lg:flex-row w-full justify-around gap-5"
      >
        <div className="lg:w-2/12 text-center border-2 p-5 rounded-lg bg-white flex flex-col justify-center shadow-[0px_10px_black] hover:shadow-[10px_10px_black] ">
          <h2>Save</h2>
          <text className="text-xl">
            Ditch the cost of constantly buying physical cards
          </text>
        </div>
        <div className="lg:w-2/12 text-center border-2 p-5 rounded-lg bg-white flex flex-col justify-center  shadow-[0px_10px_black] hover:shadow-[10px_10px_black] ">
          <h2>Easy to setup</h2>
          <text className="text-xl">Set your store up in under 5 minutes</text>
        </div>
        <div className="lg:w-2/12 text-center border-2 p-5 rounded-lg bg-white flex flex-col justify-center  shadow-[0px_10px_black] hover:shadow-[10px_10px_black] ">
          <h2>Be found</h2>
          <text className="text-xl">
            Get your store discovered by thousands of customers
          </text>
        </div>
        <div className="lg:w-2/12 text-center border-2 p-5 rounded-lg bg-white flex flex-col justify-center  shadow-[0px_10px_black] hover:shadow-[10px_10px_black] ">
          <h2>Sustainable</h2>
          <text className="text-xl">
            Reduce your waste of single use loyalty cards
          </text>
        </div>
        <div className="lg:w-2/12 text-center border-2 p-5 rounded-lg bg-white flex flex-col justify-center  shadow-[0px_10px_black] hover:shadow-[10px_10px_black] ">
          <h2 className="text-3xl">Trackable stats</h2>
          <text className="text-xl">
            Track your store's sales and customer base
          </text>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [subscriptionType, setSubscritionType] = useState("monthly");
  return (
    <div
      id="pricing"
      className="w-full flex flex-col items-center gap-10 py-10"
    >
      <h1>Try CupCount for Free</h1>
      <div className="flex w-6/12 gap-10 justify-between ">
        <div className="w-1/2 flex justify-between px-10 py-10 border-2 rounded-xl relative">
          <div className="flex flex-col ">
            <div className="bg-black text-white px-3 py-2 rounded-lg absolute -top-4 ">
              <text>Save 33%</text>
            </div>
            <text>Annual</text>
            <text className="text-xl">
              $9.99 AUD<span className="text-lg text-slate-500">/month</span>
            </text>
          </div>
          <input
            type="checkbox"
            className="h-6 w-6 my-auto"
            onChange={() => setSubscritionType("yearly")}
            checked={subscriptionType === "yearly" ? true : false}
          />
        </div>
        <div className="w-1/2 flex justify-between px-10 py-10 border-2 relative rounded-xl">
          <div className="flex flex-col ">
            <text>Month</text>
            <text className="text-xl">
              $14.99 AUD<span className="text-lg text-slate-500">/month</span>
            </text>
          </div>
          <input
            type="checkbox"
            className="h-6 w-6 my-auto"
            onChange={() => setSubscritionType("monthly")}
            checked={subscriptionType === "monthly" ? true : false}
          />
        </div>
      </div>
      <text>
        After your free trial, the {subscriptionType} subscription is{" "}
        {subscriptionType === "yearly" ? "$119.88" : "$14.99"} and automatically
        renews each {subscriptionType === "yearly" ? "year" : "month"}.
      </text>
      <div className="flex flex-col items-center">
        <button className="bg-black  text-white p-5 rounded-md ">
          <text>Start your 30-day free trial today</text>
        </button>
        <text className="text-sm">Cancel anytime</text>
      </div>
    </div>
  );
}
