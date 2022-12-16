const express = require('express');
const app = express();
const port = 80;
var cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(require('body-parser').json());

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

initializeApp({
  credential: applicationDefault()
});

const db = getFirestore();

const getUsers = async () => {
  console.log("in getUser");
    const snapshot = await db.collection('users').get();
    let users = snapshot.docs.map(doc => doc.data());
    return users
  }

app.get('/readiness', (req, res) => {
    res.send('<h1>pod container is ready!</h1>');
 });


app.get('/microservice1', (req, res) => {
  console.log("in microservice1");
   getUsers().then((users) => {
      console.log(users);
      res.send(users);
  });
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});