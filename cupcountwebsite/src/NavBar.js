import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
export default function NavBar({ showConsoleButton = false }) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  if (isTabletOrMobile) return <MobileMenu />;

  return (
    <nav className="fixed text-lg flex w-full p-6 z-50 justify-center items-center">
      {/* <h1 className="logo lobster-regular m-auto">Loyal Bean</h1> */}
      <div className="absolute top-0 left-0 flex flex-row justify-center items-center p-5">
        <img
          src="logo.png"
          className="h-full p-2 ml-5"
          alt="logo"
          width={75}
          height={75}
        />
        <h2 className="lobster-regular xl:block hidden ">CupCount</h2>
      </div>
      <RevealOnScroll>
        <div className="shadow-xl px-2 py-2 justify-self-center  flex-row  self-center bg-white rounded-full gap-5 border-4 border-r-8 border-b-8 border-black hidden lg:flex">
          <Link to="/">
            <h3 className="hover:text-white hover:bg-black rounded-full p-2 px-4">
              Home
            </h3>
          </Link>

          <Link to="/store-owner">
            <h3 className="hover:text-white hover:bg-black rounded-full p-2 px-4">
              Store Owners
            </h3>
          </Link>

          <Link to="/contact">
            <h3 className="hover:text-white hover:bg-black rounded-full p-2 px-4">
              Contact
            </h3>
          </Link>
          <Link to="/about">
            <h3 className="hover:text-white hover:bg-black rounded-full p-2 px-4">
              Support
            </h3>
          </Link>
          {!showConsoleButton ? (
            <Link to="/about">
              <h3 className="text-white bg-black rounded-full p-2 px-4 bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:shadow-lg">
                Try for free
              </h3>
            </Link>
          ) : (
            <Link to="/about">
              <h3 className="text-white bg-black rounded-full p-2 px-4 bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:shadow-lg">
                Store Login
              </h3>
            </Link>
          )}
        </div>
      </RevealOnScroll>
    </nav>
  );
}

function MobileMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className=" fixed top-0 z-50 w-full flex flex-col">
      <div
        id="navbar"
        className="flex flex-row justify-between items-center  bg-white border-b-2 w-full p-5 shadow-lg"
      >
        <h2 className="lobster-regular ">CupCount</h2>
        <div className="flex">
          <h3 className="text-white bg-black rounded-lg p-2  bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:shadow-lg ">
            Download
          </h3>

          <IconButton
            onClick={handleMenuClick}
            sx={{ margin: 0, padding: 0, paddingX: 2 }}
          >
            {showMenu ? (
              <CloseIcon sx={{ fontSize: 40 }} />
            ) : (
              <MenuIcon sx={{ fontSize: 40 }} />
            )}
          </IconButton>
        </div>
      </div>

      {showMenu && (
        <div className="w-full bg-white z-50 flex flex-col justify-center items-center border-b-2">
          <List sx={{ width: "100%", padding: 2 }}>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Link to="/">
                <h2>Home</h2>
              </Link>
              <ArrowForwardIcon sx={{ fontSize: 40 }} />
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Link to="/store-owner">
                <h2>Store Owners</h2>
              </Link>
              <ArrowForwardIcon sx={{ fontSize: 40 }} />
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Link to="/contact">
                <h2>Contact</h2>
              </Link>
              <ArrowForwardIcon sx={{ fontSize: 40 }} />
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Link to="/about">
                <h2>Support</h2>
              </Link>
              <ArrowForwardIcon sx={{ fontSize: 40 }} />
            </ListItem>
          </List>
        </div>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <>
      <footer className="w-full flex flex-col items-center justify-center content-center text-center bg-transparent px-10 grid-bg">
        <div className="flex flex-row justify-evenly py-10">
          <div className="flex flex-col gap-y-2 ">
            {/* <img
            src="logo.png"
            className="h-full p-2 "
            alt="logo"
            width={60}
            height={60}
          /> */}
            <h2 className="lobster-regular">CupCount</h2>

            <h3>
              Convenient app for tracking coffee loyalty cards in one place.
            </h3>

            <h3 className="pt-1 text-2xl">Download on</h3>
            <div className="flex flex-row  gap-3  justify-center">
              <div className="flex h-10  content-center bg-black text-white px-4 py-2 rounded-full gap-2 bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:shadow-lg hover:scale-110">
                <img
                  src="/appleicon.png"
                  alt="applelogo"
                  className=""
                  height={"100%"}
                />
                <text className="text-sm m-auto">App Store</text>
              </div>
              <div className="flex justify-center h-10 content-center bg-black text-white px-4 py-2 rounded-full gap-1 bg-gradient-to-r hover:from-green-400 hover:to-blue-500 hover:shadow-lg hover:scale-110">
                <img src="/googleicon.png" alt="googlelogo" className="px-1" />
                <text className="text-sm m-auto">Play Store</text>
              </div>
            </div>
            <div className=" flex flex-col pt-5">
              <text>
                Want your cafe on CupCount?
                <a className="underline">Sign up today!</a>
              </text>
            </div>
          </div>
        </div>
        <text className=" text-sm text-slate-500">
          © 2023. CupCount All rights reserved.
        </text>
      </footer>
    </>
  );
}

const RevealOnScroll = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        scrollObserver.unobserve(entry.target);
      }
    });

    scrollObserver.observe(ref.current);

    return () => {
      if (ref.current) {
        scrollObserver.unobserve(ref.current);
      }
    };
  }, []);

  const classes = `transition-opacity duration-1000 
      ${isVisible ? "opacity-100" : "opacity-0"}`;

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
};
