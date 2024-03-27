import { useState } from "react";
import BottomNav from "../bottomNav";
import NavBar from "../NavBar";
import { GiCoffeeBeans } from "react-icons/gi";
import { Link } from "react-router-dom";
const PricingPage = () => {
  const [screenShow, setScreen] = useState(0);

  let screens = ["homescreen", "rewardscreen", "mapscreen"];
  return (
    <body id="adminPage">
      <NavBar />
      <section className="h-screen pt-16 grid grid-cols-1 grid-row-2  backgroundImage1 ">
        <div id="store-owner" className="row-span-3 flex justify-center">
          <div className="flex-col ">
            <h1>
              Join CupCount: Expand Your Reach <br /> Connect with Coffee Lovers
              Everywhere!
            </h1>
            <h2>
              Ditch the cost of physical cards and join the CupCount network
            </h2>

            <h2>
              {" "}
              <button className="rounded-full border-4 px-5  border-black transition ease-in-out delay-150 bg-white hover:bg-[#89cff0]  duration-300">
                <a href="#pricing">Sign Up</a>
              </button>{" "}
              free today
            </h2>
          </div>
          <div>
            <p>Hero image</p>
          </div>
        </div>

        <div
          id="hero-perks"
          className="border-y-4 border-black pt-2 row-span-1 bg-[#89cff0] backdrop-blur-lg"
        >
          <h1>
            <GiCoffeeBeans className="inline-block size-5 mx-5" />
            Sustainable
            <GiCoffeeBeans className="inline-block size-5 mx-5" />
            Easy to use
            <GiCoffeeBeans className="inline-block size-5 mx-5" />
            Trackable stats
            <GiCoffeeBeans className="inline-block size-5 mx-5" />
            In your control
            <GiCoffeeBeans className="inline-block size-5 mx-5" />
            Get discovered
            <GiCoffeeBeans className="inline-block size-5 mx-5" />
            Save
          </h1>
          <h1 className="">
            <GiCoffeeBeans className="inline-block size-5 mx-5" />
            Sustainable
            <GiCoffeeBeans className="inline-block size-5 mx-5" />
            Easy to use
            <GiCoffeeBeans className="inline-block size-5 mx-5" />
            Trackable stats
            <GiCoffeeBeans className="inline-block size-5 mx-5" />
            In your control
            <GiCoffeeBeans className="inline-block size-5 mx-5" />
            Get discovered
            <GiCoffeeBeans className="inline-block size-5 mx-5" />
            Save
          </h1>
          <h1 className="">
            <GiCoffeeBeans className="inline-block size-5 mx-5" />
            Sustainable
            <GiCoffeeBeans className="inline-block size-5 mx-5" />
            Easy to use
            <GiCoffeeBeans className="inline-block size-5 mx-5" />
            Trackable stats
            <GiCoffeeBeans className="inline-block size-5 mx-5" />
            In your control
            <GiCoffeeBeans className="inline-block size-5 mx-5" />
            Get discovered
            <GiCoffeeBeans className="inline-block size-5 mx-5" />
            Save
          </h1>
        </div>
      </section>

      <section id="howitworksbox" className="background-image h-screen">
        <div className="">
          <div
            id="about-box"
            className="bg-[#89cff0]  backdrop-blur-lg flex-col h-full  shadow-2xl"
          >
            <h1>How it works</h1>

            <div id="screenWrapper" className="flex p-10 gap-3">
              <img
                src={`${screens[screenShow]}.png`}
                alt="heroImg"
                width={250}
                className="object-cover"
              ></img>

              <div id="about" className="w-10/12">
                <div
                  id="tabbox"
                  className="grid grid-rows-3 justify-stretch gap-5 py-5"
                >
                  <div
                    className=" row-span-1 rounded-xl  p-5  bg-slate-200 cursor-pointer"
                    onClick={() => setScreen(0)}
                  >
                    <h2 className="">Customer present their card</h2>

                    <p className="">
                      Once the customer pruchases a coffee scan there QR though
                      the admin add this will redirect you to their current
                      loyalty card for your store
                    </p>
                  </div>
                  <div
                    className="row-span-1  rounded-xl  p-5 w-full bg-slate-200 cursor-pointer "
                    onClick={() => setScreen(1)}
                  >
                    <h2>Stamp the card</h2>
                    <p>
                      Add stamps to the customers loyalty card based on the
                      purchases
                    </p>
                  </div>
                  <div
                    className="row-span-1  rounded-xl p-5 w-full bg-slate-200 cursor-pointer "
                    onClick={() => setScreen(2)}
                  >
                    <h2 className="">Redeem Complete cards</h2>
                    <p className="">
                      Once a customer has a completed thier card they will be
                      able to free coffee QR. This is scanned and tracked in the
                      admin console.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="pricing" className="h-screen backgroundImage3 relative">
        <div id="pricing-wrapper" className="w-6/12">
          <h1 className="text-white py-5">Pricing</h1>

          <div id="pricebox" className="flex gap-10">
            {/* Freebox */}
            <div className="w-6/12 grid grid-cols-1 gap-5 grid-rows-6 bg-white/70 shadow-2xl backdrop-blur-sm rounded-xl p-5 ">
              <div className="header row-span-2">
                <h2 className="">Starter</h2>
                <div class="card__desc">
                  Great if you're a small shop wanting to try CupCount
                </div>
                <br />
                <h3 className="text-2xl ">
                  $0<span className="text-sm align-top"> / month</span>
                </h3>
              </div>

              <ul className="row-span-3 grid list-inside  pb-5">
                <li>
                  <GiCoffeeBeans className="inline-block size-6 mr-3" />1 store
                  limit
                </li>
                <li>
                  <GiCoffeeBeans className="inline-block size-6 mr-3" />
                  150 active member limit
                </li>
                <li>
                  <GiCoffeeBeans className="inline-block size-6 mr-3" />
                  Join the CoffeCup network
                </li>
                {/* <li>
                  <GiCoffeeBeans className="inline-block size-6 mr-3" />
                  Default Loyal card
                </li> */}
                <li>
                  <GiCoffeeBeans className="inline-block size-6 mr-3" />
                  Admin console access
                </li>
              </ul>

              <button className="button button--white bluebg row-span-1">
                <Link to="/signin">Create account</Link>
              </button>
            </div>
            {/* Paidbox */}
            <div className="grid grid-cols-1 gap-5 grid-rows-6 bg-white/70 shadow-2xl backdrop-blur-sm rounded-xl p-5 w-6/12">
              <div className="header row-span-2">
                <h2 className="text-center">Full Access</h2>
                <div class="card__desc">
                  Great for a larger store or a owner managing multiple stores
                </div>
                <br />
                <h3 className="text-2xl ">
                  $10<span className="text-sm align-top"> /month</span>
                </h3>
              </div>

              <ul className="row-span-3 grid list-inside  pb-5">
                <li>
                  {" "}
                  <GiCoffeeBeans className="inline-block size-6 mr-3" />
                  Multiple stores *
                </li>
                <li>
                  {" "}
                  <GiCoffeeBeans className="inline-block size-6 mr-3" />
                  Unlimited active members
                </li>
                <li>
                  {" "}
                  <GiCoffeeBeans className="inline-block size-6 mr-3" />
                  Join the CoffeCup network
                </li>
                {/* <li>Custom Loyalty Card</li> */}
                <li>
                  {" "}
                  <GiCoffeeBeans className="inline-block size-6 mr-3" />
                  Admin console access
                </li>
                <li className="text-xs">
                  * Access 2 stores for free and ability to add more for $5
                  extra per additional store
                </li>
              </ul>

              <button className="button button--white bluebg row-span-1">
                <Link to="/signin">Upgrade now</Link>
              </button>
            </div>
          </div>
        </div>
      </section>
      <BottomNav bgColor="#23170D" />
    </body>
  );
};
export default PricingPage;
