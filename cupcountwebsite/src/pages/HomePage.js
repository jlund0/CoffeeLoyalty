import "../App.css";
import { useState } from "react";
import BottomNav from "../bottomNav";
import NavBar from "../NavBar";
import { Box, Container, Typography } from "@mui/material";

const HomePage = () => {
  let rollerText = [
    "carrying loyalty cards",
    "not getting free coffee",
    "losing your loyalty card",
  ];
  const [screenShow, setScreen] = useState(0);

  let screens = ["homescreen", "rewardscreen", "mapscreen"];

  return (
    <body id-="homePage">
      <NavBar />
      <section id="landing" className="h-screen">
        <LandingPage />
        {/* <h1 class="lobster-regular"></h1> */}
        {/* <div id="heroContianer" className="flex justify-center content-center ">
          <div id="heroText" className="flex-col w-6/12 h-4/12self-center">
            <h1 className="py-5 lobster-regular">
              <span id="hero-title" className="lobster-regular">
                Tired of
              </span>
              <div class="roller">
                <span id="rolltext" className="">
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
            <button className="rounded-full border-4 px-5  border-black transition ease-in-out delay-150 bg-white hover:bg-[#89cff0] duration-300 hover:text-white  ">
              <h1>Get the app</h1>
            </button>
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
              width={400}
              className="object-cover"
            ></img>
          </div>
        </div> */}
      </section>
      <section
        id="howitworksbox"
        className="background-image h-screen relative"
      >
        <div className="">
          <div
            id="about-box"
            className="bg-[#89cff0]  backdrop-blur-lg flex-col h-full  shadow-2xl"
          >
            <h1>How it works</h1>
            {/* <div className="w-full bg-white flex justify-evenly ">
              <div className="border-2 p-5 aspect-square rounded-full">1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </div> */}
            <div id="screenWrapper" className="flex p-10 gap-3">
              <img
                src={`${screens[screenShow]}.png`}
                alt="heroImg"
                width={250}
                className="object-cover h-full"
              ></img>

              <div id="about" className="w-10/12">
                <div
                  id="tabbox"
                  className="grid grid-flow-row justify-stretch gap-5 py-5"
                >
                  <div
                    className="border-2 rounded-3xl px-10 flex-col justify-center  bg-slate-200 cursor-pointer"
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
                    className="border-2 rounded-3xl px-10 w-full bg-slate-200 cursor-pointer"
                    onClick={() => setScreen(1)}
                  >
                    <h2>See your currrent rewards</h2>
                    <p>
                      View all your current loyalty cards in progress and redeem
                      your free coffees
                    </p>
                  </div>
                  <div
                    className="border-2 rounded-3xl px-10 w-full bg-slate-200 cursor-pointer"
                    onClick={() => setScreen(2)}
                  >
                    <h2>Find your closest cafe</h2>
                    <p>
                      See a map overview of all the cafes close to you to get
                      your next coffee
                    </p>
                  </div>
                  <div
                    className="border-2 rounded-3xl px-10 w-full bg-slate-200 cursor-pointer"
                    onClick={() => setScreen(2)}
                  >
                    <h2>Claim your Free coffee</h2>
                    <p>Redeem and enjoy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BottomNav bgColor="#3E230F" />
    </body>
  );
};
export default HomePage;

function LandingPage() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Box id="heroTextBox">
        <Typography variant="h1">Sip. Scan. Save</Typography>
        <Typography variant="h3">
          Easily track and manage your favourite coffee shop rewards in one
          convenient app.
        </Typography>
        <Box>
          <img
            src="/download-on-the-app-store-apple-logo-svgrepo-com.svg"
            alt="download app store"
          />
          <img
            src="/google-play-badge-logo-svgrepo-com.svg"
            alt="download google play"
          />
        </Box>
      </Box>
      <Box id="heroImagePhoneBox"></Box>
    </div>
  );
}
