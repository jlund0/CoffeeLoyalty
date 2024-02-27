import "../App.css";
import { useState } from "react";
import BottomNav from "../bottomNav";
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
      <section id="landing">
        {/* <h1 class="lobster-regular"></h1> */}
        <div id="heroContianer">
          <div id="heroText">
            <h2 id="hero-title">
              Tired of{" "}
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
            </h2>
            <h3 id="hero-slogan">
              Simplify Your Coffee Rewards with CupCount! Have all your cafe
              loyalty cards in one place. Ensuring every sip counts towards
              something great!
            </h3>
            <h2>Download for free</h2>
            <div id="download-wrap">
              <img src="applestore.svg" alt="download on ios" height={70} />
              <img
                src="google-play-badge.png"
                alt="download on google play"
                height={100}
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
              height={600}
            ></img>
          </div>
        </div>
      </section>
      <section id="howitworksbox">
        <div id="about-box">
          <div id="screenWrapper">
            <img
              src={`${screens[screenShow]}.png`}
              alt="heroImg"
              height={600}
            ></img>
          </div>
          <div id="about">
            <h2>How it works</h2>
            <div id="tabbox">
              <div class="howitworkstab" onClick={() => setScreen(0)}>
                <h3>Your unqiue card</h3>
                <p>
                  All you need to do is get you QR code scanned after purchasing
                  a coffee at participating stores and watch the rewards come in
                </p>
              </div>
              <div class="howitworkstab" onClick={() => setScreen(1)}>
                <h3>See your currrent rewards</h3>
                <p>
                  View all your current loyalty cards in progress and redeem
                  your free coffees
                </p>
              </div>
              <div class="howitworkstab" onClick={() => setScreen(2)}>
                <h3>Find your closest cafe</h3>
                <p>
                  See a map overview of all the cafes close to you to get your
                  next coffee
                </p>
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
