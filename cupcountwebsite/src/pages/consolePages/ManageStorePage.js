import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import getStores from "../../firebase/getStores";
import getUserInfo from "../../firebase/getUserInfo";
import styles from "../../styles/ManageStorePage.module.css";

function ManageStorePage() {
  const [stores, setStore] = useState([]);
  const [user, setUser] = useState();
  const [activeStore, setActiveStore] = useState(null);
  let { id } = useParams();
  useEffect(() => {
    let fetchUserInfo = async () => {
      let data = await getUserInfo(id);
      console.log(data);
      setUser(data);
    };
    fetchUserInfo();
  }, [id]);

  useEffect(() => {
    let fetchStores = async () => {
      let data = await getStores(user.stores);
      setStore(data);
    };
    if (user) {
      fetchStores();
    }
  }, [user]);
  return (
    <section>
      <div className="title-box">
        <h1>Manage Stores</h1>
        <Link to=".." relative="path">
          {"<"}
        </Link>
      </div>
      <div className="stores-selection-wrapper">
        <h3>Current Stores</h3>
        {stores.map((store) => (
          <>
            <div onClick={() => setActiveStore(store)}>
              <button>
                <h3>{store.name}</h3>
              </button>
              <image src={store.logo} />
            </div>
          </>
        ))}
        <button id="add-store">+ Add new store</button>
      </div>
      <div>
        {activeStore == null ? (
          <OverallDashboard />
        ) : (
          <StoreDashboard
            storeInfo={activeStore}
            click={() => setActiveStore(null)}
          />
        )}
      </div>
    </section>
  );
}

export default ManageStorePage;

const OverallDashboard = () => {
  return (
    <div>
      <h1>Overall</h1>
      <div>
        <h4>Coffees redeemed</h4>
      </div>
      <div>
        <h4>Coffees sold</h4>
      </div>
      <div>
        <h4>Active Members</h4>
      </div>
      <div>
        <h4>New Cards</h4>
      </div>
    </div>
  );
};

const StoreDashboard = ({ storeInfo, click }) => {
  return (
    <>
      <div>
        <div>
          <h3>Store Name: {storeInfo.name}</h3>
          <h3>Store Address: {storeInfo.address}</h3>
          <img src={storeInfo.logo} alt="logo" />
          <div onClick={click}>X</div>
        </div>

        <div>
          <h4>Coffees redeemed</h4>
        </div>
        <div>
          <h4>Coffees sold</h4>
        </div>
        <div>
          <h4>Active Members</h4>
        </div>
        <div>
          <h4>New Cards</h4>
        </div>
        <div>
          <h4>Most Loyal customers</h4>
        </div>
        <div className="red-zone">
          Red Zone <span>Delete Store</span>
        </div>
      </div>
    </>
  );
};
