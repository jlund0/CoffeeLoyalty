import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import getStores from "../../firebase/getStores";
import getUserInfo from "../../firebase/getUserInfo";
import styles from "../../styles/ManageStorePage.module.css";
import getStoreCards from "../../firebase/getStoreCards";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from "../../firebase/firebaseConfig";
import { FaEdit, FaRegWindowClose } from "react-icons/fa";
import updateStore from "../../firebase/updateStore";
import updateLogo from "../../firebase/updateStore";
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
    <body>
      <div className="flex-col w-full px-40 ">
        <div className={styles.titleBox}></div>
        <div className={styles.dashboardGrid}>
          <div className="border-b-4 w-full flex content-center">
            <h3 className="m-0">Your Stores</h3>
            {stores.map((store) => (
              <>
                <button
                  className="px-6 py-4 hover:bg-slate-200 "
                  onClick={() => setActiveStore(store)}
                >
                  {store.name}
                </button>
              </>
            ))}
            <button className="self-end px-6 py-4 hover:bg-slate-200 ">
              + Store
            </button>
          </div>
          <br />
        </div>
        {activeStore && <StoreDashboard storeInfo={activeStore} />}
      </div>
    </body>
  );
}

export default ManageStorePage;

const StoreDashboard = ({ storeInfo, click }) => {
  const [editing, setEdit] = useState(false);
  const [logourl, setLogoUrl] = useState();
  useEffect(() => {
    getDownloadURL(ref(storage, storeInfo.logo)).then((url) => {
      setLogoUrl(url);
    });
  }, [storeInfo.logo]);

  return (
    <>
      <div className={styles.dashboard}>
        <AppTracker storeInfo={storeInfo} />
        {editing ? (
          <EditStoreInfo storeInfo={storeInfo} logo={logourl} edit={setEdit} />
        ) : (
          <StoreInfo storeInfo={storeInfo} logo={logourl} edit={setEdit} />
        )}
        <DangerZone />
      </div>
    </>
  );
};

function AppTracker({ storeInfo }) {
  return (
    <div>
      <h3 className="">App Tracker</h3>
      <div className="flex  border-4 p-10 px-20 bg-slate-100 gap-5 rounded-xl">
        <div className="border-2 p-5 rounded-lg flex-col justify-between bg-white w-40">
          <h4 className="text-center">Active Members</h4>
          <h3 className="text-center underline">
            {storeInfo.stats.activeMembers}
          </h3>
        </div>
        <div className="border-2 p-5 rounded-lg flex-col justify-between bg-white w-40">
          <h4 className="text-center">Redeemed</h4>
          <h3 className="text-center underline">
            {storeInfo.stats.coffeesRedeemed}
          </h3>
        </div>
        <div className="border-2 p-5 rounded-lg flex-col justify-between bg-white w-40">
          <h4 className="text-center">Sold</h4>
          <h3 className="text-center underline">
            {storeInfo.stats.coffeesTracked}
          </h3>
        </div>
      </div>
    </div>
  );
}

function StoreInfo({ storeInfo, logo, edit }) {
  return (
    <div>
      <h3>Store info</h3>
      <div className="flex-col px-20 border-4 p-10 bg-slate-100 gap-4 rounded-xl ">
        <div className="flex justify-end">
          <button onClick={() => edit(true)}>
            <FaEdit size={20} />
          </button>
        </div>{" "}
        <br />
        <div className="bg-white flex justify-between border-dashed border-b-2 my-2">
          <div>Name</div>
          <div>{storeInfo.name}</div>
        </div>
        <div className="bg-white flex justify-between border-dashed border-b-2 my-2">
          <div>Location</div>
          <div>{storeInfo.location}</div>
        </div>
        <div className="bg-white flex justify-between border-dashed border-b-2 my-2">
          <div>Reward Requirements:</div>
          <div>{storeInfo.coffees_required}</div>
        </div>
        <div className="bg-white flex justify-between border-dashed border-b-2 my-2 ">
          <div>Logo</div>
          <div className="h-32">
            <img id="logo" alt="logo" src={logo} className="h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function EditStoreInfo({ storeInfo, logo, edit }) {
  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [reward, setReward] = useState();
  const [img, setImg] = useState();

  const handleImgAdd = (e) => {
    if (e.target.files[0].size <= 3000) {
      setImg(URL.createObjectURL(e.target.files[0]));
    } else {
      document.getElementById("logoinput").value = "";
      return alert("Image is too large. Max size 300Kb");
    }
  };

  const onCancel = () => {
    setImg(null);
    setLocation(null);
    setName(null);
    setReward(null);
    document.getElementById("nameinput").value = "";
    document.getElementById("logoinput").value = "";
    document.getElementById("locationinput").value = "";
    document.getElementById("rewardinput").value = "";
  };

  const onConfirm = () => {
    const toUpdate = {};
    if (img) {
      updateLogo(img);
    }

    if (name) {
      toUpdate.name = name;
    }

    if (location) {
      toUpdate.location = location;
    }
    if (reward) {
      toUpdate.coffees_required = reward;
    }
    updateStore(storeInfo.id, toUpdate);
  };
  return (
    <div>
      <h3>Store info</h3>
      <div className="flex-col px-20 border-4 p-10 bg-slate-100 gap-4 rounded-xl ">
        <div className="flex justify-end">
          <button onClick={() => edit(false)}>
            <FaRegWindowClose size={20} />
          </button>
        </div>
        <br />
        <div className="bg-white flex justify-between border-dashed border-b-2 my-2">
          <div>Name</div>
          <input
            type="text"
            placeholder={storeInfo.name}
            id="nameinput"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="bg-white flex justify-between border-dashed border-b-2 my-2">
          <div>Location</div>
          <input
            placeholder={storeInfo.location}
            id="locationinput"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </div>
        <div className="bg-white flex justify-between border-dashed border-b-2 my-2">
          <div>Reward Requirements:</div>
          <input
            type="number"
            placeholder={storeInfo.coffees_required}
            max="20"
            min="1"
            id="rewardinput"
            onChange={(e) => setReward(e.target.value)}
          />
        </div>
        <div className="bg-white flex justify-between border-dashed border-b-2 my-2">
          <div>Logo</div>
          <div className="h-32 flex">
            {/* <img
              id="oldlogo"
              alt="logo"
              src={logo}
              className="h-full opacity-50"
            /> */}
            <input
              type="file"
              id="logoinput"
              alt="logo"
              name={storeInfo.id}
              // className="h-4/5"
              accept="image/png, image/jpeg"
              onChange={handleImgAdd}
            />

            <img id="newlogo" alt="" src={img} className="h-4/5" />
          </div>
        </div>
        <div className="justify-end w-full">
          <button onClick={() => onCancel()}>Clear</button>
          <button onClick={() => onConfirm()}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <>
      <h3>App Tracking</h3>

      <h3>Store Info</h3>

      <h3>Danger Zone</h3>
    </>
  );
}

function DangerZone() {
  return (
    <div>
      <h3>Danger Zone</h3>
      <div className="flex-col px-20 border-4 p-10 bg-red-300 gap-4 rounded-xl ">
        <button className="bg-white p-2">
          <h4>Delete Store</h4>
        </button>
      </div>
    </div>
  );
}
