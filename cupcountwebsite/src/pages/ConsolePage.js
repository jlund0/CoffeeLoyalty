import { useState } from "react";
const ConsolePage = () => {
  //get stores
  const [stores, setStores] = useState([]);
  return (
    <>
    <section>
    <div>
      <button>Manage stores</button>
      <button>Billing</button>
      <button>Your details</button>
      <button>Need help?</button>
      <button>Log out</button></div></section>
      </>
  );
};
export default ConsolePage;

const Dashboard = (store) => {
  return <></>;
};
