import "../App.css";

const HomePage = () => {
  let rollerText = [
    "carring loyalty cards",
    "not getting free coffee",
    "losing your loyalty card",
  ];
  return (
    <>
      <section id="landing">
        {/* <h1 class="lobster-regular"></h1> */}
        <div id="heroContianer">
          <div id="heroText">
            <h2 id="hero-title">
              Tired of <span>{rollerText[0]}</span>
            </h2>
            <h3 id="hero-slogan">
              Simplify Your Coffee Rewards with CupCount! Have all your cafe
              loyalty cards into one place. Ensuring every sip counts towards
              something great!
            </h3>
            <h2>Download for free</h2>
            <div id="download-wrap">
              <img src="applestore.svg" alt="download on ios" />
              <img
                src="google-play-badge.png"
                alt="download on google play"
                height={60}
              />
            </div>
          </div>
          <div id="heroImageContainer">
            <img
              id="heroimage"
              src="iphone.png"
              alt="heroImg"
              height={600}
            ></img>
          </div>
        </div>
      </section>
      <section>
        <div id="about">
          <h1>How it works</h1>
          <div>
            <h2>Your unqiue card</h2>
            <p>
              All you need to do is get you QR code scanned after purchasing a
              coffee at participating stores and watch the rewards come in
            </p>
          </div>
          <div>
            <h2>See your currrent rewards</h2>
            <p>
              View all your current loyalty cards in progress and redeem your
              free coffees
            </p>
          </div>
          <div>
            <h2>Find your closest cafe</h2>
            <p>
              See a map overview of all the cafes close to you to get your next
              coffee
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
export default HomePage;
