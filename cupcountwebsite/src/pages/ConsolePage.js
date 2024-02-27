import { useState } from "react";
const ConsolePage = () => {
  //get stores
  const [stores, setStores] = useState([]);
  return (
    <>
      <header>
        <h2>CupCount</h2>
        <button></button>
      </header>
      <nav id="storenav">
        {stores.map((store) => (
          <button>{store.name}</button>
        ))}
        <button>+</button>
      </nav>
      <Dashboard />
    </>
  );
};
export default ConsolePage;

const Dashboard = (store) => {
  return <></>;
};
