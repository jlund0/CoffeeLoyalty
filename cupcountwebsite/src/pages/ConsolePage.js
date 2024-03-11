import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ConsolePage = () => {
  let { id } = useParams();
  return (
    <>
      <section>
        <h1>Welcome {}</h1>
        <div>
          <Link to={`/console/${id}/stores`}>Manage stores</Link>
          <Link to={`/console/${id}/billing`}>Billing</Link>
          <Link to={`/console/${id}/details`}>Your details</Link>
          <Link to={`/console/${id}/help`}>Need help?</Link>
          <button>Log out</button>
        </div>
      </section>
    </>
  );
};
export default ConsolePage;
