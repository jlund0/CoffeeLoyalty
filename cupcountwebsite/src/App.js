import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Link,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import PricingPage from "./pages/PricingPage";
import ConsolePage from "./pages/ConsolePage";
import ContactPage from "./pages/ContactPage";
import SignInPage from "./pages/SignInPage";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";
import app from "./firebase/firebaseConfig";
import BottomNav from "./bottomNav";
import ManageStorePage from "./pages/consolePages/ManageStorePage";
import HelpPage from "./pages/consolePages/NeedHelpPage";
import DetailsPage from "./pages/consolePages/YourDetailsPage";
import BillingPage from "./pages/consolePages/BillingPage";
import NavBar from "./NavBar";

const auth = getAuth(app);
function App() {
  const [userId, setUserId] = useState();
  function RequireAuth({ children }) {
    let location = useLocation();

    if (!userId) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    return children;
  }
  function CheckAuth({ children }) {
    let location = useLocation();
    if (userId) {
      return <Navigate to={`/console/${userId}`} state={{ from: location }} />;
    }
    return children;
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserId(user.uid);
    } else {
      setUserId(null);
    }
  });

  return (
    <BrowserRouter>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Lobster&display=swap')
      </style>
      <div className="App">
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route
              path="/signin"
              element={
                <CheckAuth>
                  <SignInPage />
                </CheckAuth>
              }
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/console/:id"
              element={
                <RequireAuth>
                  <ConsoleLayout>
                    <ConsolePage />
                  </ConsoleLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/console/:id/stores"
              element={
                <RequireAuth>
                  <ConsolesPagesLayout userId>
                    <ManageStorePage />
                  </ConsolesPagesLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/console/:id/billing"
              element={
                <RequireAuth>
                  <ConsolesPagesLayout userId>
                    <BillingPage />
                  </ConsolesPagesLayout>
                </RequireAuth>
              }
            />
            <Route
              path="/console/:id/details"
              element={
                <RequireAuth>
                  <ConsolesPagesLayout userIdt>
                    <DetailsPage />
                  </ConsolesPagesLayout>
                </RequireAuth>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

function ConsoleLayout({ children }) {
  let logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <>
      <nav>
        <Link to="/">
          <h1 className="logo lobster-regular">CupCount</h1>
        </Link>
        <button className="LogoutButton" onClick={logout}>
          Logout
        </button>
      </nav>
      {children}
      <BottomNav />
    </>
  );
}

function ConsolesPagesLayout({ children, userId }) {
  let logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <>
      <nav>
        <Link to="/">
          <h1 className="logo lobster-regular">CupCount</h1>
        </Link>
        <div className="">
          <Link to={`/console/${userId}/stores`}>Manage stores</Link>
          <Link to={`/console/${userId}/billing`}>Billing</Link>
          <Link to={`/console/${userId}/details`}>Your details</Link>
          <Link to={`/console/${userId}/help`}>Need help?</Link>
        </div>
        <button className="LogoutButton" onClick={logout}>
          Logout
        </button>
      </nav>
      {children}
      <BottomNav />
    </>
  );
}

function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <BottomNav />
    </>
  );
}
