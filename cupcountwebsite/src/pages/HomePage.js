import "../App.css";
import { useState } from "react";
import BottomNav from "../bottomNav";
import NavBar from "../NavBar";
import { Footer } from "../NavBar";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

const HomePage = () => {
  return (
    <body id-="homePage">
      <NavBar />
      <section id="landing" className="h-screen">
        <LandingPage />
      </section>

      <FeatureStrip />

      <ContactUs />

      <Footer />
    </body>
  );
};
export default HomePage;

function LandingPage() {
  return (
    <div className="h-full w-full flex flex-col justify-between  ">
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
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <div className="w-full flex flex-col items-center m-0">
      <h1>How it all work?</h1>
      <div className="flex justify-evenly">
        <img alt="phones" />
        <div className="w-2/6">
          <Stepper orientation="vertical">
            <Step>
              <StepLabel>Scan</StepLabel>
              <StepContent>
                Simply get your unqiue QR code scanned after buying your coffee
                and let CupCount add it to your Loyalty card wallet
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Manage</StepLabel>
              <StepContent>
                View all your cafe rewards in one place and see how you're
                tracking for your next free coffee
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Redeem</StepLabel>
              <StepContent>
                Once you complete a loyalty card you can then redeem it in store
                though the CupCount app and enjoy your free drink
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Find</StepLabel>
              <StepContent>
                Simply get your unqiue QR code scanned after buying your coffee
                and let CupCount add it to your Loyalty card wallet
              </StepContent>
            </Step>
          </Stepper>
        </div>
      </div>
    </div>
  );
}

function ReviewsAndStats() {
  const ReviewBox = ({ review, name }) => {
    <div className="">
      <div>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </div>
      <div>
        <h3>{review}</h3>
        <h4>~ {name}</h4>
      </div>
    </div>;
  };
  return (
    <div className="w-screen m-0">
      <h1>Happy Customers</h1>
      <h3>
        Read what our customers have to say about their experience with
        CupCount.
      </h3>
      <ReviewBox
        name={"Julian"}
        review={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor urna nunc id cursus metus. Mattis nunc sed blandit libero volutpat sed cras."
        }
      />
      <ReviewBox
        name={"Satisfied Customer"}
        review={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec dui nunc mattis enim ut tellus."
        }
      />
      <ReviewBox
        name={"Satisfied Customer"}
        review={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
      />
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
