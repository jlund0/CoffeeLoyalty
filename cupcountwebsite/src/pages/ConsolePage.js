import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./../styles/ConsolePage.module.css";
const ConsolePage = () => {
  let { id } = useParams();

  return (
    <>
      <section className="h-screen">
        <div className={styles.linkboxwrapper}>
          <h1>Welcome {}</h1>

          <div className={styles.linkbox}>
            <Link to={`/console/${id}/stores`} className={styles.link}>
              Manage stores
            </Link>
            <Link to={`/console/${id}/billing`} className={styles.link}>
              Billing
            </Link>
            <Link to={`/console/${id}/details`} className={styles.link}>
              Your details
            </Link>
            <Link to={`/console/${id}/help`} className={styles.link}>
              Need help?
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
export default ConsolePage;
