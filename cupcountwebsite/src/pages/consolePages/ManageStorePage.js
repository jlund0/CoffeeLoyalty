import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import getStores from "../../firebase/getStores";
import getUserInfo from "../../firebase/getUserInfo";
import styles from "../../styles/ManageStorePage.module.css";
import getStoreCards from "../../firebase/getStoreCards";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "../../firebase/firebaseConfig";

const storage = getStorage(app);

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

  useEffect(() => {
    let fetchStoresCards = async () => {
      await Promise.all(
        stores.map(async (store) => {
          let data = await getStoreCards(store.id);
          store["stats"] = data;
        })
      );
      console.log(stores);
      setActiveStore(stores[0]);
    };

    if (stores.length > 0) {
      fetchStoresCards();
    }
  }, [stores]);

  return (
    <section>
      <div>
        <div className={styles.titleBox}>
          <h1>Manage Stores</h1>
          <Link to=".." relative="path">
            {"<"}
          </Link>
        </div>
        <div className="stores-selection-wrapper">
          <div className={styles.storeSelection}>
            <h3>Current Stores</h3>
            {stores.map((store) => (
              <>
                <div onClick={() => setActiveStore(store)}>
                  <button>
                    <h3>{store.name}</h3>
                  </button>
                </div>
              </>
            ))}
            <button id="add-store">+ Add new store</button>
          </div>
        </div>
        <div>{activeStore && <StoreDashboard storeInfo={activeStore} />}</div>
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
  useEffect(() => {
    getDownloadURL(ref(storage, storeInfo.logo)).then((url) => {
      const img = document.getElementById("logo");
      img.setAttribute("src", url);
    });
  }, [storeInfo.logo]);

  return (
    <>
      <div>
        <div>
          <h3>Store Name: {storeInfo.name}</h3>
          <h3>Store Address: {storeInfo.location}</h3>
          <img id="logo" alt="logo" width={50} height={50} />
        </div>

        <div>
          <h4>
            Coffees redeemed <span>{storeInfo.stats.coffeesRedeemed}</span>
          </h4>
        </div>
        <div>
          <h4>
            Coffees sold <span>{storeInfo.stats.coffeesTracked}</span>
          </h4>
        </div>
        <div>
          <h4>
            Active Members <span>{storeInfo.stats.activeMembers}</span>
          </h4>
        </div>
        {/* <div>
          <h4>New Cards</h4>
        </div>
        <div>
          <h4>Most Loyal customers</h4>
        </div> */}

        <div className="red-zone">
          Red Zone <span>Delete Store</span>
        </div>
      </div>
    </>
  );
};
