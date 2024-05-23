import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import LogoutIcon from "@mui/icons-material/Logout";
import { Typography } from "@mui/material";

export const StoresList = ({ list }) => {
  console.log(list);
  return (
    <>
      {list.map((store) => (
        <ListItemButton>
          <ListItemIcon>
            <Avatar alt={store.name} src={store.logo} />
          </ListItemIcon>
          <ListItemText primary={store.name} />
        </ListItemButton>
      ))}

      <ListItemButton>
        <ListItemIcon>
          <AddCircleIcon />
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
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Your Details" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ReceiptIcon />
      </ListItemIcon>
      <ListItemText primary="Billing" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Log out" />
    </ListItemButton>
  </>
);
