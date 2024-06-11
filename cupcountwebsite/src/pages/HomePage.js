import "../App.css";
import { useState } from "react";
import BottomNav from "../bottomNav";
import NavBar from "../NavBar";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
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
      {/* <section
        id="howitworksbox"
        className="background-image h-screen relative"
      >
        <div className="">
          <div
            id="about-box"
            className="bg-[#89cff0]  backdrop-blur-lg flex-col h-full  shadow-2xl"
          >
            <h1>How it works</h1>
            <div className="w-full bg-white flex justify-evenly ">
              <div className="border-2 p-5 aspect-square rounded-full">1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </div> 
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
      </section> */}
      {/* <BottomNav bgColor="#3E230F" /> */}
    </body>
  );
};
export default HomePage;

function LandingPage() {
  return (
    <div className="h-screen w-full flex flex-col justify-between  ">
      <div className="absolute  w-62 text-center flex flex-col items-end left-[18%] rotate-[-10deg] top-[40%]">
        <div className="animate-[wiggle_1s_ease-in-out_infinite]">
          <img src="arrow.svg" alt="arrow" width={150} className="scale-y-90" />
        </div>
        <text className="permanent-marker-regular text-5xl w-72 self-start">
          Start saving today
        </text>
      </div>
      <img
        src="/drawnsvg/drawnbean.svg"
        alt="drawn bean"
        className="absolute right-[15%] top-[40%] rotate-[15deg]"
        width={150}
        height={150}
      />
      <img
        src="/drawnsvg/drawncup.svg"
        alt="drawn cup"
        className="absolute right-[18%] top-[55%] rotate-[30deg]"
        width={150}
        height={150}
      />
      <img
        src="/drawnsvg/drawnstar.svg"
        alt="drawn star"
        className="absolute right-[25%] top-[40%] rotate-[-15deg]"
        width={150}
        height={150}
      />
      <div className="h-2/4 flex justify-center items-end">
        <Grid container sx={{ maxWidth: 1000, height: "fit-content" }}>
          <Grid xs={12}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: "800",
                textAlign: "center",
              }}
            >
              Sip. Scan. Save
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Typography
              variant="h3"
              sx={{ color: "grey", textAlign: "center" }}
            >
              Easily track and manage your favourite coffee shop rewards in one
              convenient app.
            </Typography>
          </Grid>
          <Grid xs={12}>
            <div className="flex flex-row justify-center gap-10 py-8">
              <div className="flex h-16 content-center bg-black text-white px-8 py-4 rounded-full gap-4 bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:shadow-lg hover:scale-110">
                <img src="/appleicon.png" cal alt="applelogo" className="p-1" />
                <Typography variant="h5">App Store</Typography>
              </div>
              <div className="flex h-16 content-center bg-black text-white px-8 py-4 rounded-full gap-4 bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:shadow-lg hover:scale-110">
                <img
                  src="/googleicon.png"
                  cal
                  alt="applelogo"
                  className="p-1"
                />
                <Typography variant="h5">App Store</Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <Box
        id="heroImagePhoneBox"
        className="h-3/6 w-full  flex justify-center overflow-hidden relative "
      >
        <div>
          <img
            src="/AppScreens/Card.png"
            height={800}
            alt="App Card screen"
            className="absolute top-0  z-0 rotate-[30deg] origin-bottom-left right-[35%] hover:-translate-y-24 hover:translate-x-16"
          />

          <img
            src="/AppScreens/Home.png"
            height={800}
            alt="App Home screen"
            className="relative z-10"
          />

          <img
            src="/AppScreens/Map.png"
            height={800}
            alt="App Map screen"
            className="absolute rotate-[-30deg] top-0 origin-bottom-right left-[35%] hover:-translate-y-24 hover:-translate-x-16"
          />
        </div>
      </Box>
    </div>
  );
}
