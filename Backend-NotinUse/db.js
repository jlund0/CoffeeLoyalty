const CONNETION_STRING =
  "mongodb+srv://julianlund22:9Nyqlonx46Vfin9s@loyalcoffee.gr6rlnl.mongodb.net/";

const { MongoClient } = require("mongodb");

const client = new MongoClient(CONNETION_STRING);

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db("CoffeeLoyalty");
    const users = db.collection("Users");
    const addUser = await users.insertOne({
      userID: "0",
      name: "Julian",
      email: "XXXXXXXXXXXXXXXXXXXXXX",
      freeCoffees: 0,
    });
    console.log(addUser);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

export async function addUser(userDetails) {
  userDetails[freeCoffees] = 0;
  userDetials[createdAt] = Date();
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
