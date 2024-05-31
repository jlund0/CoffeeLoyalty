import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getAuth, signOut } from "firebase/auth";

import LogoutIcon from "@mui/icons-material/Logout";
import { Typography } from "@mui/material";
const auth = getAuth();

export const StoresList = ({ list, setStore }) => {
  console.log(list);
  return (
    <>
      {list.map((store) => (
        <ListItemButton onClick={() => setStore(store)}>
          <ListItemIcon>
            <Avatar alt={store.name} src={store.logo} />
          </ListItemIcon>
          <ListItemText primary={store.name} />
        </ListItemButton>
      ))}

      <ListItemButton>
        <ListItemIcon>
          <AddCircleIcon sx={{ fontSize: 35 }} />
        </ListItemIcon>
        <ListItemText primary="Add store" />
      </ListItemButton>
    </>
  );
};

export const BottomList = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <AccountCircleIcon sx={{ fontSize: 35 }} />
      </ListItemIcon>
      <ListItemText primary="Your Details" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ReceiptIcon sx={{ fontSize: 35 }} />
      </ListItemIcon>
      <ListItemText primary="Billing" />
    </ListItemButton>
    <ListItemButton onClick={() => signOut(auth)}>
      <ListItemIcon>
        <LogoutIcon sx={{ fontSize: 35 }} />
      </ListItemIcon>
      <ListItemText primary="Log out" />
    </ListItemButton>
  </>
);
