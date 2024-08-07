import "../App.css";
import { useState, useRef, useCallback, useEffect } from "react";
import AppleIcon from "@mui/icons-material/Apple";
import NavBar from "../NavBar";
import { Footer } from "../NavBar";
import { Box, IconButton, Radio, RadioGroup, Rating } from "@mui/material";

import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useMediaQuery } from "react-responsive";
import ArrowForwardIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { cyan } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { InView } from "react-intersection-observer";

const HomePage = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  return (
    <body id-="homePage">
      <NavBar />

      <LandingPage isTabletOrMobile={isTabletOrMobile} />

      <FeatureStrip isTabletOrMobile={isTabletOrMobile} />
      <ReviewsAndStats isTabletOrMobile={isTabletOrMobile} />

      <ContactUs isTabletOrMobile={isTabletOrMobile} />

      <Footer />
    </body>
  );
};
export default HomePage;

function LandingPage({ isTabletOrMobile }) {
  return (
    <div className="lg:h-screen w-full flex flex-col justify-between  bg-cover dotted-bg bg-fixed ">
      <div className="h-24" id="navbuffer" />

      {/* <img
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
      /> */}

      <div className="h-3/5 lg:h-2/5 flex flex-col justify-center items-center  py-10">
        <h1
          variant="h1"
          className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-900 text-center py-2 font-extrabold text-5xl lg:text-9xl "
        >
          Sip. Scan. Save
        </h1>

        <div sx={{}}>
          <h2 className="text-slate-600 text-center width-4/5 m-auto text-lg px-5 lg:text-3xl lg:w-3/5">
            Easily track and manage your favourite coffee shop rewards in one
            convenient app.
          </h2>
        </div>

        {!isTabletOrMobile ? (
          <div className="flex flex-col gap-5 lg:flex-row justify-center  lg:w-3/6 py-2  border-blue-200 relative">
            <div className="flex content-center bg-black items-center text-white blackHoverbutton px-8 py-4 rounded-full gap-4 bg-gradient-to-r hover:from-green-400 hover:to-[#42AFBC] hover:shadow-lg hover:scale-110">
              <AppleIcon height={8} />
              <h5 variant="h5">App Store</h5>
            </div>
            <div className="blackHoverbutton flex content-center items-center bg-black text-white px-8 py-4 rounded-full gap-4 bg-gradient-to-r hover:from-[#42AFBC] hover:to-blue-500 hover:shadow-lg hover:scale-110">
              <img
                src="/googleicon.png"
                alt="google play logo"
                className="p-1 h-8"
              />
              <h5>Play Store</h5>
            </div>
            <div className="absolute w-62 text-center flex flex-col items-end -left-64 rotate-[-15deg] top-[40%]">
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
            <div className="absolute -right-44 top-[38%] animate-[spin_10s_linear_infinite]">
              <img
                src="/drawnsvg/drawnstar.svg"
                alt="drawn star"
                className=""
                width={200}
                height={200}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="pt-6">
              <div className="relative">
                <Link to="/about">
                  <h3 className="text-white bg-black rounded-full text-2xl py-2 px-5 bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:shadow-lg">
                    Download
                  </h3>
                </Link>
                <div className="absolute -right-24 -top-4 animate-[spin_10s_linear_infinite] -z-10">
                  <img
                    src="/drawnsvg/drawnstar.svg"
                    alt="drawn star"
                    className="rotate-12 "
                    width={80}
                    height={80}
                  />
                </div>
                <div className="absolute text-center flex flex-col items-center  -left-20 -top-3 scale-y-75 ">
                  <div className="animate-[sidewaysbounce_1s_infinite]">
                    <img
                      src="/drawnsvg/sketcharrow.svg"
                      alt="arrow"
                      width={80}
                      className="scale-y-90 rotate-[270deg] "
                    />
                  </div>

                  {/* <text className="permanent-marker-regular text-2xl w-56 self-start">
                Start saving today
              </text> */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Box
        id="heroImagePhoneBox"
        className="lg:h-4/6 h-72 w-full  flex justify-center overflow-hidden relative "
      >
        <div>
          <img
            src="/AppScreens/Card.png"
            width={isTabletOrMobile ? 200 : 350}
            alt="App Card screen"
            className="absolute top-0  z-0 rotate-[30deg] origin-bottom-left right-[35%] lg:hover:-translate-y-24 lg:hover:translate-x-16"
          />

          <img
            src="/AppScreens/Home.png"
            alt="App Home screen"
            className="relative z-10"
            width={isTabletOrMobile ? 200 : 350}
          />

          <img
            src="/AppScreens/Map.png"
            width={isTabletOrMobile ? 200 : 350}
            alt="App Map screen"
            className="absolute rotate-[-30deg] top-0 origin-bottom-right left-[35%] lg:hover:-translate-y-24 lg:hover:-translate-x-16"
          />
        </div>
      </Box>
    </div>
  );
}

function FeatureStrip({ isTabletOrMobile }) {
  const titles = ["Scan", "Manage", "Redeem", "Find"];
  const description = [
    "Simply get your unqiue QR code scanned at a CupCount cafe ",
    "View all your cafe rewards in one place and see how you're tracking for your next free coffee",
    "Completed cards can then be redeem though the CupCount app",
    "See cafes near you and find a new favourite",
  ];
  const phonescreens = ["Home.png", "Card.png", "Redeem.png", "Map.png"];
  const [onFocus, setOnFocused] = useState(0);
  const [visibleSection, setVisibleSection] = useState(titles[0]);
  const setInView = (inView, entry) => {
    if (inView) {
      setVisibleSection(entry.target.getAttribute("id"));
    }
  };

  const MoblieFeatures = () => {
    return (
      <div className="px-10 flex flex-col gap-5 relative ">
        <div className="absolute flex flex-col gap-8 h-full justify-evenly items-center w-4/5  overflow-hidden">
          <img
            src="/doodles/scan.svg"
            alt="scan doodle"
            width={150}
            height={13}
            className={"h-52"}
          />
          <img
            src="/doodles/manage.svg"
            alt="manage doodle"
            width={150}
            className="h-52"
          />
          <img
            src="/doodles/redeem.svg"
            alt="Redeem doodle"
            width={150}
            className="h-52"
          />
          <img
            src="/doodles/find.svg"
            alt="Find doodle"
            width={150}
            className="h-52"
          />
        </div>
        {titles.map((title, index) => (
          <InView onChange={setInView} threshold={0.8} key={title}>
            {({ ref }) => {
              return (
                <div
                  id={title}
                  ref={ref}
                  className={`flex flex-col justify-evenly items-center w-full  h-48 bg-white rounded-2xl px-10 py-5 border-4 border-r-8 border-b-8 border-black z-10 transition-transform ease-in-out duration-1000 delay-1000`}
                >
                  <h2>{title}</h2>
                  <text className="text-center">{description[index]}</text>
                </div>
              );
            }}
          </InView>
        ))}
      </div>
    );
  };
  return (
    <section
      id="featureSection"
      className="w-full h-fit flex flex-col items-center m-0   py-5 justify-center snap-center bg-[#3E97DA]/50 shadow-2xl overflow-hidden grid-bg"
    >
      <h1 className=" font-extrabold pb-5 text-4xl lg:text-6xl text-center">
        Coffee loyalty made{"\n"}
        <span className="underlined underline-clip">simple</span>
      </h1>

      {isTabletOrMobile ? (
        <MoblieFeatures />
      ) : (
        <>
          <div className="overflow-hidden  w-[50rem]  relative">
            {/* <div className="flex overflow-hidden  w-[60rem] flex-nowrap px-20 gap-20"> */}
            {onFocus !== 3 && (
              <div className="absolute h-full flex justify-center items-center right-0">
                <IconButton
                  id="right"
                  sx={{
                    color: "black",
                    rotate: "180deg",
                    zIndex: 1,
                  }}
                  size="large"
                  onClick={() => setOnFocused(onFocus + 1)}
                  color={cyan["A200"]}
                >
                  <ArrowForwardIosNewIcon fontSize="inherit" />
                </IconButton>
              </div>
            )}
            {onFocus !== 0 && (
              <div className="absolute h-full flex justify-center items-center left-0 ">
                <IconButton
                  size="large"
                  onClick={() => setOnFocused(onFocus - 1)}
                  sx={{ color: "black", zIndex: 1 }}
                >
                  <ArrowBackIosNewIcon fontSize="inherit" />
                </IconButton>
              </div>
            )}
            <div
              className={`flex transition-transform ease-in-out duration-500 px-20 gap-x-20 `}
            >
              <div
                className={`flex justify-evenly items-center min-w-[40rem]  h-[25rem] bg-white rounded-2xl px-10  border-4 border-r-8 border-b-8 border-black`}
              >
                <div className="p-5 h-full overflow-hidden">
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
                  <h2>{titles[onFocus]}</h2>
                  <h3>{description[onFocus]}</h3>
                </div>
              </div>
            </div>
          </div>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{ paddingTop: 1 }}
          >
            <Radio
              value="a"
              name="radio-buttons"
              checked={onFocus === 0}
              sx={{
                color: "black",
                "&.Mui-checked": {
                  color: "black",
                },
              }}
              onChange={() => setOnFocused(0)}
            />
            <Radio
              sx={{
                color: "black",
                "&.Mui-checked": {
                  color: "black",
                },
              }}
              value="b"
              name="radio-buttons"
              checked={onFocus === 1}
              onChange={() => setOnFocused(1)}
            />
            <Radio
              sx={{
                color: "black",
                "&.Mui-checked": {
                  color: "black",
                },
              }}
              value="c"
              name="radio-buttons"
              checked={onFocus === 2}
              onChange={() => setOnFocused(2)}
            />
            <Radio
              sx={{
                color: "black",
                "&.Mui-checked": {
                  color: "black",
                },
              }}
              value="d"
              name="radio-buttons"
              checked={onFocus === 3}
              onChange={() => setOnFocused(3)}
            />
          </RadioGroup>
        </>
      )}
    </section>
  );
}

function ReviewsAndStats({ isTabletOrMobile }) {
  const [activeReview, setActiveReview] = useState(0);
  let reviews = [
    {
      name: "Julian",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      name: "Satisfied Customer",
      review:
        "CupCount has made my life so much easier. I no longer have to carry around a stack of loyalty cards everywhere I go. Thank you!",
    },
    {
      name: "Satisfied Customer",
      review:
        "I love using CupCount to keep track of all my coffee loyalty cards in one place. It's so convenient and easy to use!",
    },
  ];
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe)
      console.log("swipe", isLeftSwipe ? "left" : "right");
    isLeftSwipe
      ? setActiveReview((x) => x > 0 && x - 1)
      : setActiveReview((x) => x < 4 && x + 1);
  };
  const ReviewBox = ({ review, name }) => {
    return (
      <>
        <div
          className=" border-4 border-r-8 border-b-8 border-black rounded-xl lg:w-80 flex flex-col p-10 py-5 gap-5 bg-[#e0f7fa] justify-between "
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Rating name="size-small" readOnly value={5} />
          <h3 className="lg:text-xl text-sm">{review}</h3>
          <h4 className="text-end"> - {name}</h4>
        </div>
      </>
    );
  };
  return (
    <div className="w-full flex flex-col justify-center items-center py-10 gap-3 bg-white shadow-xl overflow-hidden dotted-bg">
      <h1 className="lg:text-5xl text-3xl text-center ">
        Join the 500+ CupCount users already saving
      </h1>
      <div className="flex">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="flex w-full justify-center gap-20 ">
        {isTabletOrMobile ? (
          <div className="flex flex-col justify-center items-center px-10">
            <ReviewBox
              name={reviews[activeReview].name}
              review={reviews[activeReview].review}
            />
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{ padding: 2 }}
            >
              <Radio
                value="a"
                name="radio-buttons"
                checked={activeReview === 0}
                sx={{
                  color: "black",
                  "&.Mui-checked": {
                    color: "black",
                  },
                }}
                onChange={() => setActiveReview(0)}
              />
              <Radio
                sx={{
                  color: "black",
                  "&.Mui-checked": {
                    color: "black",
                  },
                }}
                value="b"
                name="radio-buttons"
                checked={activeReview === 1}
                onChange={() => setActiveReview(1)}
              />
              <Radio
                sx={{
                  color: "black",
                  "&.Mui-checked": {
                    color: "black",
                  },
                }}
                value="c"
                name="radio-buttons"
                checked={activeReview === 2}
                onChange={() => setActiveReview(2)}
              />
            </RadioGroup>
          </div>
        ) : (
          <>
            {reviews.map((x) => (
              <ReviewBox name={x.name} review={x.review} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      alert("Email sent successfully!");
    } else {
      alert("Failed to send email.");
    }
  };
  return (
    <div
      // id="contactUs"
      className="w-full flex flex-col lg:gap-8 gap-2 items-center  lg:p-12 p-6 bg-cover bg-fixed  bg-[#3E97DA]/50"
    >
      <div>
        <h1 className="text-center  text-4xl  lg:text-6xl">Contact Us</h1>
        <h3 className=" text-center">
          Have a question about CupCount? <br />
          Contact us now!
        </h3>
      </div>
      <div className="xl:w-3/6 w-5/6 bg-white lg:p-10 p-5 rounded-xl shadow-xl border-4 border-r-8 border-b-8 border-black">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:gap-8 gap-2">
            <TextField
              label="Your name"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              rows={4}
              multiline
              label="Leave us a message"
              required
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              variant="contained"
              type="submit"
              className="self-center rounded-full bg-sky-500 lg:px-8 lg:py-4 px-4 py-2 "
            >
              Send <SendIcon />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
