const CONNETION_STRING =
  "mongodb+srv://julianlund22:9Nyqlonx46Vfin9s@loyalcoffee.gr6rlnl.mongodb.net/";

const { MongoClient } = require("mongodb");

const client = new MongoClient(CONNETION_STRING);

const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  console.log("hello world");

  res.send("hello world");
});

//get user info
app.get("/:userId/", (req, res) => {
  console.log("getting user info");
  const userID = req.params.userId;
  const user = getUser(userID);
  res.send(user);
});
async function getUser(userID) {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db("CoffeeLoyalty");
    const users = db.collection("Users");
    const User = users.findOne({ userID: userID });
    console.log(User);
    return User;
  } finally {
    await client.close();
  }
}

//adding new user
app.post("/:userId/", (req, res) => {
  const userDetail = req.body;
  console.log(`adding user:${userDetail.userID} to database`);
  if (!userDetail) {
    res.status(418).send({ message: "no user info" });
  }
  addUser(userDetail);
  res.send(`user added ${userDetail.userID}`);
});

async function addUser(userDetails) {
  userDetails["freeCoffees"] = 0;
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db("CoffeeLoyalty");
    const users = db.collection("Users");
    const addUser = await users.insertOne(userDetails);
    console.log(addUser);
  } finally {
    await client.close();
  }
}

//Get Stores in Distance to User
app.get("/stores", (req, res) => {
  console.log("getting stores");
  const distance = req.body.distance;
  const stores = getStores(distance);
});

async function getStores(distance) {
  return stores;
}

//Adding a card to a user
app.post("/:userID/:shopID", (req, res) => {
  const userID = req.params.userID;
  const shopID = req.params.shopID;
  console.log(`adding shop: ${shopID} card to userID: ${userID}`);
});

//Getting Users Cards
app.get("/:userID/cards/", (req, res) => {
  const userID = req.params.userID;
  console.log(`getting users: ${userID} cards`);
  cards = getUserCards(userID);
  res.send(cards);
});

async function getUserCards(userID) {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db("CoffeeLoyalty");
    const cards = db.collection("Cards");
    const UserCards = cards.find({ userID: userID });
    console.log(UserCards);
    return UserCards;
  } finally {
    await client.close();
  }
}

app.listen();
