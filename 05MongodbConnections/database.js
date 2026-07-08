const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://navinkr:Navin%402002@navincluster.lp3kp7q.mongodb.net/?appName=NavinCluster';
const client = new MongoClient(url);

// Database Name
const dbName = 'CoderArmy';

async function main() {
  // Use connect method to connect to the server
  await client.connect(); //! ese mere backend and database connect ho rha hai. Means mera backend cluster ke saath connect ho rha hai

  console.log('Connected successfully to server');


  const db = client.db(dbName); //! Cluster ke andar bahut sara database hoga like admin,local, CoderArmy etc. . So jis database se connect krna hai wo yaha karenga. so hum yaha CoderArmy database se connect ho rha hai.


  const collection = db.collection('User'); //! Database ke andar bahut sara collection hota hai. so hum User collection se connect ho rha hai.

  // the following code examples can be pasted here...

  const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
console.log('Inserted documents =>', insertResult);


// const findResult = await collection.find({}).toArray();
// console.log('Found documents =>', findResult);
//It is not good practice, kyuki agar data size 5GB ka raha toh system hang ho jayega

// Alternat:-
const findResult = collection.find({}); // ye cursor dega
for await(const doc of findResult){
  console.log(doc);
}




  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());