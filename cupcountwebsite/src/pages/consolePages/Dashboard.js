import * as React from "react";
import { useParams } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { StoresList, BottomList } from "../../components/ListItems";
import CancelIcon from "@mui/icons-material/Cancel";
import { LineChart } from "@mui/x-charts/LineChart";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
import getStores from "../../firebase/getStores";
import { Fab, ListItem, ListItemText, Stack, TextField } from "@mui/material";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { BarChart } from "@mui/x-charts";
import EditIcon from "@mui/icons-material/Edit";
import GoogleMaps from "../../components/autocompleteplaces";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const storage = getStorage();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        CupCount
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const { id } = useParams();
  const [open, setOpen] = React.useState(true);
  const day = new Date().getDay();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [edit, setEdit] = React.useState(false);
  const [stores, setStores] = React.useState([
    {
      name: "The Bell Tower",
      owner: "XXsfIYJK2qOsWVGvffL82MQaT5J3",
      coffees_required: 10,
      geohash: "qd66hrr8w1",
      location: "Barrack Square, Riverside Dr, Perth WA 6000",
      coords: {
        _lat: -31.958897845256022,
        _long: 115.85825858788468,
      },
      logo: "https://firebasestorage.googleapis.com/v0/b/loyal-coffee-bad9d.appspot.com/o/STORES%2FLogos%2FseGkfKcY739bYE6zWknO.jpg?alt=media&token=25b04f40-b701-431d-81ce-55bae1070a04",
      id: "seGkfKcY739bYE6zWknO",
    },
    {
      coffees_required: 6,
      logo: "https://firebasestorage.googleapis.com/v0/b/loyal-coffee-bad9d.appspot.com/o/STORES%2FLogos%2FUHDwqbIfd33ivWSAH3Q7p.png?alt=media&token=127ef4d2-16a4-476a-81f0-8a969229742e",
      location: "Perth",
      owner: "XXsfIYJK2qOsWVGvffL82MQaT5J3",
      name: "Your Store Here",
      geohash: "qd66hrx48q46e",
      coords: {
        _lat: 31.572123,
        _long: 115.513809,
      },
      id: "UHDwqbIfd33ivWSAH3Q7",
    },
    {
      owner: "XXsfIYJK2qOsWVGvffL82MQaT5J3",
      coffees_required: 6,
      location: "Perth Cultural Centre, Perth WA 6000",
      name: "Starbucks",
      logo: "https://firebasestorage.googleapis.com/v0/b/loyal-coffee-bad9d.appspot.com/o/STORES%2FLogos%2FStarbucks_test.png?alt=media&token=7787804c-203c-45f9-97c5-4846f153a08b",
      geohash: "qd66hxb01",
      coords: {
        _lat: -31.94957336300768,
        _long: 115.8618892559894,
      },
      id: "Starbucks_test",
    },
    {
      name: "Yagan Square",
      geohash: "qd66hrtf3",
      coords: {
        _lat: -31.950433033721932,
        _long: 115.85893457057465,
      },
      coffees_required: 7,
      logo: "https://firebasestorage.googleapis.com/v0/b/loyal-coffee-bad9d.appspot.com/o/STORES%2FLogos%2Fnco9b56Fi48Ixiq55b1r.jpg?alt=media&token=53e7ab1a-f12e-45c3-84ef-462c8b751e6b",
      owner: "XXsfIYJK2qOsWVGvffL82MQaT5J3",
      location: "Cnr Wellington Street and William St, Perth WA 6000",
      id: "nco9b56Fi48Ixiq55b1r",
    },
  ]);
  const [activeStore, setActiveStore] = React.useState({
    name: "The Bell Tower",
    owner: "XXsfIYJK2qOsWVGvffL82MQaT5J3",
    coffees_required: 10,
    geohash: "qd66hrr8w1",
    location: "Barrack Square, Riverside Dr, Perth WA 6000",
    coords: {
      _lat: -31.958897845256022,
      _long: 115.85825858788468,
    },
    logo: "https://firebasestorage.googleapis.com/v0/b/loyal-coffee-bad9d.appspot.com/o/STORES%2FLogos%2FseGkfKcY739bYE6zWknO.jpg?alt=media&token=25b04f40-b701-431d-81ce-55bae1070a04",
    id: "seGkfKcY739bYE6zWknO",
  });
  const googlemapKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  console.log(googlemapKey);
  let embbedMapURL =
    "https://www.google.com/maps/embed/v1/place?key=" +
    googlemapKey +
    "&q=" +
    activeStore.location.replaceAll(" ", "+");
  console.log(embbedMapURL);
  // React.useEffect(() => {
  //   const fetchStores = async () => {
  //     let data = await getStores(id);
  //     setStores(data);
  //   };
  //   fetchStores();
  // }, [id]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              textAlign="center"
              color="grey"
            >
              {open ? "Mangage your Stores" : "Stores"}
            </Typography>
            <StoresList list={stores} setStore={setActiveStore} />
            <Divider sx={{ my: 1 }} />
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              textAlign="center"
              color="grey"
            >
              {open ? "Your Info" : "Info"}
            </Typography>
            {BottomList}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ p: 10 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <StatsBox />
              </Grid>

              <Grid item xs={8} md={8}>
                <StoreInfoBox activeStore={activeStore} />
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={4}>
                <Paper
                  sx={{
                    // p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    title="storemap"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    src={
                      "https://www.google.com/maps/embed/v1/place?key=AIzaSyDhvMFjBGQode7tIJQWN7NyeXJ7fsy6Xzo" +
                      "&q=" +
                      activeStore.location.replaceAll(" ", "+")
                    }
                  ></iframe>
                </Paper>
              </Grid>
              {/* Recent Orders */}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function StatsBox() {
  const StatBox = ({ title, stat }) => {
    return (
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          Width: "100%",
        }}
      >
        <Box sx={{ color: "text.secondary" }}>{title}</Box>
        <Box
          sx={{
            color: "text.primary",
            fontSize: 34,
            fontWeight: "medium",
          }}
        >
          {stat}
        </Box>
        <Box
          sx={{
            color: "success.dark",
            display: "inline",
            fontWeight: "bold",
            mx: 0.5,
            fontSize: 14,
          }}
        >
          +18.77%
        </Box>
        <Box
          sx={{
            color: "text.secondary",
            display: "inline",
            fontSize: 14,
          }}
        >
          vs. last month
        </Box>
      </Box>
    );
  };
  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" gutterBottom>
        Today's Stats
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "space-around" }}
      >
        <StatBox title="New users" stat="98" />
        <StatBox title="Returning Customers" stat="98" />
        <StatBox title="Cups Redeemed" stat="98" />
        <StatBox title="CupCount" stat="98" />
      </Stack>
    </Paper>
  );
}

function StoreInfoBox({ activeStore }) {
  const [editName, setEditName] = React.useState(false);
  const [editLogo, setEditLogo] = React.useState(false);
  const [editPoints, setEditPoints] = React.useState(false);
  const [editLocation, setEditLocation] = React.useState(false);
  const handleNameChange = () => {};
  const handleLogoChange = () => {};
  const handlePointsChange = () => {};
  const handleLocationChange = () => {};

  const StoreSection = ({
    edit,
    handleChange,
    setEdit,
    title,
    placeholder,
    children,
  }) => {
    return (
      <ListItem>
        <ListItemText
          primary={title}
          secondary={
            title === "Logo" ? (
              <img src={placeholder} alt="Store Logo" width={60} />
            ) : (
              placeholder
            )
          }
        />

        {!edit ? (
          <>
            <IconButton aria-label="edit"></IconButton>
            <EditIcon onClick={() => setEdit(!edit)} />
          </>
        ) : (
          <>
            {children}
            <CheckIcon onPress={handleChange} />
            <CloseIcon onClick={() => setEdit(!edit)} />
          </>
        )}
      </ListItem>
    );
  };
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Store Info
        </Typography>
      </Box>

      <Divider />
      <List>
        <StoreSection
          edit={editName}
          activeStore={activeStore}
          handleChange={handleNameChange}
          setEdit={setEditName}
          title="Name"
          placeholder={activeStore.name}
        >
          <TextField
            id="outlined-basic"
            placeholder={`Change Name`}
            variant="outlined"
          />
        </StoreSection>
        <Divider component="li" />
        <StoreSection
          edit={editLocation}
          activeStore={activeStore}
          handleChange={handleLocationChange}
          setEdit={setEditLocation}
          title="Location"
          placeholder={activeStore.location}
        >
          <GoogleMaps />
        </StoreSection>
        <Divider component="li" />
        <StoreSection
          edit={editPoints}
          activeStore={activeStore}
          handleChange={handlePointsChange}
          setEdit={setEditPoints}
          title="Points"
          placeholder={activeStore.coffees_required}
        >
          <TextField
            id="outlined-basic"
            placeholder={`Change Points`}
            variant="outlined"
            type="number"
          />
        </StoreSection>
        <Divider component="li" />
        <StoreSection
          edit={editLogo}
          activeStore={activeStore}
          handleChange={handleLogoChange}
          setEdit={setEditLogo}
          title="Logo"
          placeholder={activeStore.logo}
        >
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
        </StoreSection>
      </List>
    </Paper>
  );
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
