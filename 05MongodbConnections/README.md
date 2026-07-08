 const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

Bhai code ko line by line easy se smjhao

Bilkul bhai. Ye MongoDB Native Driver ka basic connection code hai. Main har line ko aise explain karta hu jaise pehli baar MongoDB padh rahe ho.

Complete Code
const { MongoClient } = require('mongodb');
Line 1
Kya ho raha hai?

Hum mongodb package se MongoClient naam ki class import kar rahe hain.

Socho:

mongodb package
       │
       │
       ├── MongoClient
       ├── ObjectId
       ├── GridFSBucket
       └── ...

Hume sirf MongoClient chahiye.

Isliye

const { MongoClient } = require('mongodb');
Simple Meaning

"MongoDB se baat karne ke liye mujhe MongoClient de do."

// or as an es module:
// import { MongoClient } from 'mongodb'

Ye sirf comment hai.

Agar project ES Module use karta hai to likhenge

import { MongoClient } from "mongodb";

Agar CommonJS hai to

require()
Next
const url = 'mongodb://localhost:27017';
Kya hai?

Ye MongoDB server ka address hai.

Break karte hain.

mongodb://

Matlab

MongoDB protocol use karo.

localhost

Matlab

Server isi computer par chal raha hai.

Agar dusre computer par hota

mongodb://192.168.1.20:27017
27017

Ye MongoDB ka default port hai.

Jaise

Website

google.com:80

Express Server

localhost:3000

React

localhost:5173

MongoDB

localhost:27017

Is line ka matlab

const url = "mongodb://localhost:27017";

"MongoDB mere computer ke localhost par chal raha hai."

Next
const client = new MongoClient(url);

Yaha object ban raha hai.

Diagram

MongoClient
      │
      │
 new MongoClient(url)
      │
      ▼
client

Abhi sirf object bana hai.

Connection abhi nahi hua.

Ye exactly waise hi hai jaise

const car = new Car();

Car ban gayi.

Engine start nahi hua.

Waise hi

const client = new MongoClient(url);

Connection prepare hua.

Connect nahi hua.

Next
const dbName = 'myProject';

Ye database ka naam hai.

Suppose MongoDB me

MongoDB Server

├── admin
├── local
├── config
└── myProject

Hum

myProject

database use karna chahte hain.

Next
async function main() {

Hum ek async function bana rahe hain.

Kyun?

Kyuki MongoDB se connect hone me time lagta hai.

Isliye

await

use karenge.

Next
await client.connect();

Ye sabse important line hai.

Is line se actual connection hota hai.

Pehle

client

↓

Ready

Ab

client.connect()

↓

MongoDB Server

Connection establish ho gaya.

Flow

Application

↓

MongoClient

↓

MongoDB Server
Next
console.log('Connected successfully to server');

Bas console me print karega

Connected successfully to server

Agar connection fail hua

Ye line execute nahi hogi.

Next
const db = client.db(dbName);

Ab hum database select kar rahe hain.

Yani

MongoDB Server

↓

myProject

Diagram

Server

├── admin
├── local
├── config
└── myProject  ← select

Dhyan do.

Ye database create nahi karta.

Sirf select karta hai.

Agar database exist nahi karta to MongoDB baad me first insert ke time create kar dega.

Next
const collection = db.collection('documents');

Ab database ke andar collection select kar rahe hain.

myProject

├── users
├── products
├── documents ← selected

Ab

collection

ke through insert/update/delete/find kar sakte hain.

Example

collection.insertOne()
collection.find()
collection.deleteOne()
Next
// the following code examples can be pasted here...

Yaha MongoDB operations likhenge.

Example

await collection.insertOne({
    name: "Rahul",
    age: 22
});

Ya

const users = await collection.find().toArray();
Next
return 'done.';

Function ek string return kar raha hai.

done.
Function End
}
Function Call
main()

Ab function execute ho raha hai.

Next
.then(console.log)

Agar sab kuch sahi hua

return "done."

Ye print hoga

done.

Equivalent

.then((result)=>{
    console.log(result)
})
Next
.catch(console.error)

Agar kahin error aa gaya

Jaise

MongoDB band hai

To

console.error(error)

chal jayega.

Equivalent

.catch((err)=>{
    console.error(err)
})
Next
.finally(() => client.close());

Chahe

Success ho

Ya

Error ho

Ye hamesha chalega.

Aur MongoDB connection close kar dega.

Diagram

Connect

↓

Work

↓

Close

Ye bahut achhi practice hai.

Complete Flow
Program Start
      │
      ▼
Import MongoClient
      │
      ▼
Create Client Object
      │
      ▼
Call main()
      │
      ▼
client.connect()
      │
      ▼
Connected to MongoDB
      │
      ▼
Select Database
      │
      ▼
Select Collection
      │
      ▼
CRUD Operations
      │
      ▼
Return "done."
      │
      ▼
Close Connection
      │
      ▼
Program End
Ek Real-Life Analogy 🏦

Socho MongoDB ek Bank hai.

MongoClient → Bank ka entry pass.
new MongoClient(url) → Pass ban gaya, lekin bank ke andar nahi gaye.
await client.connect() → Bank ke gate se andar enter kiya.
client.db("myProject") → Bank ki ek specific branch me gaye.
db.collection("documents") → Us branch ke ek specific counter par pahunch gaye.
insertOne(), find(), updateOne() → Counter par apna kaam kiya.
client.close() → Kaam khatam karke bank se bahar aa gaye.

Ye analogy yaad rakhoge to MongoDB ka connection flow kabhi confuse nahi karega.