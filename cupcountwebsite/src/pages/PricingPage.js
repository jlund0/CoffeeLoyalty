import { useState } from "react";

const PricingPage = () => {
  const [screenShow, setScreen] = useState(0);

  let screens = ["homescreen", "rewardscreen", "mapscreen"];
  return (
    <>
      <section>
        <div id="store-owner">
          <h1>
            Join CupCount: Expand Your Reach, Connect with Coffee Lovers
            Everywhere!
          </h1>
          <h3>
            Ditch the cost of physical cards and join the CupCount network
          </h3>
          <button>
            <a href="#pricing">Sign up your store up for free today</a>
          </button>
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
              <div className="howitworkstab" onClick={() => setScreen(0)}>
                <h3> 1. Scan customers QR code</h3>
                <p>
                  {" "}
                  Once the customer pruchases a coffee scan there QR though the
                  admin add this will redirect you to their current loyalty card
                  for your store
                </p>
              </div>
              <div className="howitworkstab" onClick={() => setScreen(1)}>
                <h3> 2. Add the stamps</h3>
                <p>
                  Add stamps to the customers loyalty card based on the
                  purchases
                </p>
              </div>
              <div className="howitworkstab" onClick={() => setScreen(2)}>
                <h3> 3. Redeem Complete cards</h3>
                <p>
                  Once a customer has a completed thier card they will be able
                  to free coffee QR. This is scanned and tracked in the admin
                  console.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="pricing">
        <div id="pricing-wrapper">
          <h2>Pricing</h2>

          <div id="pricebox">
            {/* Freebox */}
            <div class="card">
              <div className="header">
                <h2>Single Store</h2>
                <div class="card__desc">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris
                </div>
              </div>
              <h3 className="price">
                $0<span> / month</span>
              </h3>

              <ul className="featureList">
                <li>1 store limit</li>
                <li>250 active cards limit</li>
                <li>Join the CoffeCup network</li>
                <li>Default Loyal card</li>
                <li>Admin console access</li>
              </ul>

              <button className="button button--white">Create account</button>
            </div>
            {/* Paidbox */}
            <div class="card">
              <div className="header">
                <h2>Multiple stores</h2>
                <div class="card__desc">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris
                </div>
              </div>
              <h3 className="price">
                $10<span> /per store a month</span>
              </h3>

              <ul className="featureList">
                <li>Add additional stores</li>
                <li>Unlimited active cards</li>
                <li>Join the CoffeCup network</li>
                <li>Custom Loyalty Card</li>
                <li>Admin console access</li>
              </ul>

              <button className="button button--white">Upgrade now</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default PricingPage;
