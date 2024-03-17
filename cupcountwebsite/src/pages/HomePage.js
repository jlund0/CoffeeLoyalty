import "../App.css";
import { useState } from "react";
import BottomNav from "../bottomNav";
import NavBar from "../NavBar";
const HomePage = () => {
  let rollerText = [
    "carrying loyalty cards",
    "not getting free coffee",
    "losing your loyalty card",
  ];
  const [screenShow, setScreen] = useState(0);

  let screens = ["homescreen", "rewardscreen", "mapscreen"];

  return (
    <>
      <NavBar />
      <section id="landing">
        {/* <h1 class="lobster-regular"></h1> */}
        <div id="heroContianer" className="flex justify-center content-center ">
          <div id="heroText" className="flex-col  self-center">
            <h1 id="hero-title" className="py-5">
              Tired of
              <div class="roller">
                <span id="rolltext">
                  {rollerText[0]}
                  <br />
                  {rollerText[1]}
                  <br />
                  {rollerText[2]}
                  <br />
                </span>
                <br />
              </div>
            </h1>
            <h2 id="hero-slogan" className="py-10">
              Simplify your coffee rewards with CupCount! Have all your cafe
              loyalty cards in one place. Ensuring every sip counts towards
              something great!
            </h2>
            <h1>Download for free</h1>
            <div id="download-wrap" className="py-10 gap-10">
              <img
                src="applestore.svg"
                alt="download on ios"
                height={70}
                className="h-20"
              />
              <img
                src="google-play-badge.png"
                alt="download on google play"
                height={70}
                className="h-20"
              />
            </div>
          </div>
          <div id="heroImageContainer">
            <img
              src="coffeebean.svg"
              alt="coffeebeansketch"
              id="beansvg"
              fill=""
            />
            <img
              id="heroimage"
              src="homescreen.png"
              alt="heroImg"
              height={800}
            ></img>
          </div>
        </div>
      </section>
      <section id="howitworksbox" className="background-image">
        <div id="about-box" className="bluebg backdrop-blur-md flex-col">
          <h1>How it works</h1>
          <div id="screenWrapper" className="flex p-10">
            <img
              src={`${screens[screenShow]}.png`}
              alt="heroImg"
              height={10}
              className=""
            ></img>

            <div id="about" className="">
              <div
                id="tabbox"
                className="grid grid-flow-row h-full  justify-stretch gap-5"
              >
                <div
                  className="border-2 rounded-3xl px-10 flex-col justify-center  bg-slate-200"
                  onClick={() => setScreen(0)}
                >
                  <h2 className="">Your unqiue card</h2>

                  <p className="">
                    All you need to do is get you QR code scanned after
                    purchasing a coffee at participating stores and watch the
                    rewards come in
                  </p>
                </div>
                <div
                  className="border-2 rounded-3xl px-10 w-full bg-slate-200"
                  onClick={() => setScreen(1)}
                >
                  <h2>See your currrent rewards</h2>
                  <p>
                    View all your current loyalty cards in progress and redeem
                    your free coffees
                  </p>
                </div>
                <div
                  className="border-2 rounded-3xl px-10 w-full bg-slate-200"
                  onClick={() => setScreen(2)}
                >
                  <h2>Find your closest cafe</h2>
                  <p>
                    See a map overview of all the cafes close to you to get your
                    next coffee
                  </p>
                </div>
                <div
                  className="border-2 rounded-3xl px-10 w-full bg-slate-200"
                  onClick={() => setScreen(2)}
                >
                  <h2>Claim your Free coffee</h2>
                  <p>Redeem and enjoy your free coffee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BottomNav />
    </>
  );
};
export default HomePage;
