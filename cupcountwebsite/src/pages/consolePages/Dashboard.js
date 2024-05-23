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
import { LineChart } from "@mui/x-charts/LineChart";
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
import getStores from "../../firebase/getStores";
import { ListItem, ListItemText, Stack, TextField } from "@mui/material";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
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
      </Link>{" "}
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
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
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
              Stores
            </Typography>
            <StoresList list={stores} />
            <Divider sx={{ my: 1 }} />
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Stack direction="row" spacing={2}>
                  <Paper>
                    <LineChart
                      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                      series={[
                        {
                          data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                      ]}
                      width={500}
                      height={300}
                    />
                  </Paper>
                  <Paper></Paper>
                  <Paper></Paper>
                  <Paper></Paper>
                </Stack>
              </Paper>
            </Grid>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Store Info
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Name"
                        secondary={activeStore.name}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemText
                        primary="Location"
                        secondary={activeStore.location}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemText
                        primary="Loyalty Program"
                        secondary={activeStore.coffees_required}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemText primary="Logo" />
                      <img
                        alt="store logo"
                        src={activeStore.logo}
                        width={50}
                        height={50}
                      />
                    </ListItem>
                  </List>

                  {/* <Chart /> */}
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  {/* <Deposits /> */}
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
