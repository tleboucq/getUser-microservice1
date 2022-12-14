const express = require('express');
const app = express();
const port = 80;
const {Firestore} = require('@google-cloud/firestore');
var cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(require('body-parser').json());

/* const getUsers = async () => {
    const snapshot = await db.collection('users').get();
    let users = snapshot.docs.map(doc => doc.data());
    return users
  } */
  
  const firestore = new Firestore();
  const getUsers = async () => {
    const snapshot = await firestore.collection('users').get();
    let users = snapshot.docs.map(doc => doc.data());
    return users
  }

app.get('/readiness', (req, res) => {
    res.send('<h1>pod container is ready!</h1>');
 });


app.get('/microservice1', (req, res) => {
   getUsers().then((users) => {
      console.log(users);
      res.send(users);
  });
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});