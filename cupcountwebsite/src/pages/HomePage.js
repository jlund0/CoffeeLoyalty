import "../App.css";
import { useState, useRef, useEffect } from "react";
import BottomNav from "../bottomNav";
import NavBar from "../NavBar";
import { Footer } from "../NavBar";
import {
  Box,
  Button,
  Container,
  IconButton,
  Radio,
  RadioGroup,
  Rating,
  StepButton,
  Typography,
} from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const HomePage = () => {
  return (
    <body id-="homePage">
      <NavBar />

      <section id="landing" className="h-screen">
        <LandingPage />
      </section>

      <FeatureStrip />
      <ReviewsAndStats />
      <ContactUs />

      <Footer />
    </body>
  );
};
export default HomePage;

function LandingPage() {
  return (
    <div className="h-full w-full flex flex-col justify-between  ">
      <div className="absolute  w-62 text-center flex flex-col items-end left-[15%] rotate-[-10deg] top-[35%]">
        <div className="animate-[wiggle_1s_ease-in-out_infinite] ">
          <img
            src="arrow.svg"
            alt="arrow"
            width={150}
            className="scale-y-90 rotate-[7deg]"
          />
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
          <Grid xs={12} sx={{}}>
            <Typography
              variant="h5"
              sx={{
                color: "grey",
                textAlign: "center",
                width: "80%",
                margin: "auto",
              }}
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
                  alt="google play logo"
                  className="p-1"
                />
                <Typography variant="h5">Play Store</Typography>
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

function FeatureStrip() {
  const featureRef = useRef(null);
  const [onFocus, setOnFocused] = useState(0);

  const title = ["Scan", "Manage", "Redeem", "Find"];
  const description = [
    "Simply get your unqiue QR code scanned after buying your coffee and let CupCount add it to your Loyalty card wallet",
    "View all your cafe rewards in one place and see how you're tracking for your next free coffee",
    "Once you complete a loyalty card you can then redeem it in store though the CupCount app and enjoy your free drink",
    "See cafes near you and find a new favourite",
  ];
  const phonescreens = ["Home.png", "Card.png", "Redeem.png", "Map.png"];
  console.log(onFocus);
  return (
    <div
      className="w-full h-fit flex flex-col items-center m-0  bg-blue-50 py-10 justify-center snap-center"
      ref={featureRef}
    >
      <h1>CupCount</h1>
      <h3 className="pb-5">Coffee loyalty made simple</h3>
      <div className=" overflow-hidden  w-[50rem]  relative">
        {/* <div className="flex overflow-hidden  w-[60rem] flex-nowrap px-20 gap-20"> */}
        {onFocus !== 3 && (
          <div className="absolute h-full flex justify-center items-center right-0 ">
            <IconButton
              id="right"
              sx={{
                rotate: "180deg",
                zIndex: 1,
              }}
              size="large"
              onClick={() => setOnFocused(onFocus + 1)}
            >
              <ArrowForwardIosNewIcon fontSize="inherit" />
            </IconButton>
          </div>
        )}
        {onFocus !== 0 && (
          <div className="absolute h-full flex justify-center items-center left-0 ">
            <IconButton
              sx={{ zIndex: 1 }}
              size="large"
              onClick={() => setOnFocused(onFocus - 1)}
            >
              <ArrowBackIosNewIcon fontSize="inherit" />
            </IconButton>
          </div>
        )}
        <div
          className={`flex transition-transform ease-in-out duration-500 px-20 gap-x-20`}
        >
          <div
            className={`flex justify-evenly items-center min-w-[40rem] border-2 h-[30rem] bg-slate-300 rounded-2xl px-10 py-10 `}
          >
            <div className="p-5 h-full relative">
              <img
                alt="phones"
                src={`/AppScreens/${phonescreens[onFocus]}`}
                className=""
              />
              {/* <img
                alt="magnifying glass"
                src="/magnifying-glass.svg"
                className="absolute top-0 rotate-[80deg]"
              /> */}
            </div>

            <div className="w-96  text-center">
              <h2>{title[onFocus]}</h2>
              <h3>{description[onFocus]}</h3>
            </div>
          </div>
        </div>
      </div>

      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <Radio value="a" name="radio-buttons" checked={onFocus === 0} />
        <Radio value="b" name="radio-buttons" checked={onFocus === 1} />
        <Radio value="c" name="radio-buttons" checked={onFocus === 2} />
        <Radio value="d" name="radio-buttons" checked={onFocus === 3} />
      </RadioGroup>
    </div>
  );
}

function ReviewsAndStats() {
  const ReviewBox = ({ review, name }) => {
    return (
      <div className=" shadow-xl rounded-xl w-80 flex flex-col px-10 py-5 gap-5">
        <Rating name="size-small" readOnly value={5} />
        <div>
          <h3>{review}</h3>
          <h4 className="text-end">{name}</h4>
        </div>
      </div>
    );
  };
  return (
    <div className="w-screen flex flex-col justify-center items-center p-20 gap-10">
      <div>
        <h1>Join the 500+ CupCount users already saving</h1>
      </div>
      <div className="flex w-full justify-around">
        <ReviewBox
          name={"Julian"}
          review={
            "CupCount has made my life so much easier. I no longer have to carry around a stack of loyalty cards everywhere I go. Thank you!"
          }
        />
        <ReviewBox
          name={"Satisfied Customer"}
          review={
            "I love using CupCount to keep track of all my coffee loyalty cards in one place. It's so convenient and easy to use!"
          }
        />
        <ReviewBox
          name={"Satisfied Customer"}
          review={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
        />
      </div>
    </div>
  );
}

function ContactUs() {
  return (
    <div className="w-full flex flex-col gap-8 items-center bg-black p-24 m-0">
      <div>
        <h1 className="text-center text-white ">Contact Us</h1>
        <h3 className="text-white text-center">
          Have a question about CupCount? <br />
          Contact us now!
        </h3>
      </div>
      <div className="w-2/6 bg-white p-10 rounded-xl">
        <div className="flex flex-col gap-8">
          <TextField label="Your name" />
          <TextField label="Your email" required />
          <TextField rows={4} multiline label="Leave us a message" required />
          <button
            variant="contained"
            className="self-center rounded-full bg-sky-500 px-8 py-4 "
          >
            Submit <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
