const express = require('express');
const app = express();
const port = 80;
//const Firestore = require('@google-cloud/firestore');
var cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(require('body-parser').json());

/* app.use((req, res, next) => {
  res.header("Access-Control-Allow-credentials", "true");
  res.header("Acces-Control-Allow-Origin", "*");
  res.header(
    "Acces-Control-Allow-Header", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token"
  );
  res.header('Acces-Control-Allow-Methods', "GET,OPTIONS, POST, DELETE, PUT, PATCH");

  next();
}); */

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

initializeApp({
  credential: applicationDefault()
});

/* const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
}); */

const db = getFirestore();

/* var whitelist = ['http://34.111.44.180:80', 'http://34.111.44.180:3000', 'http://34.111.44.180/microservice2', 'http://34.111.44.180/microservice1', 'http://34.111.44.180', 'http://34.160.51.212:80/readiness', 'http://10.63.0.141:80/readiness', 'http://10.63.0.141:80']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
} */

/* const db = new Firestore({
  projectId: 'gkemedium',
  keyFilename: '/Users/samyfadel/Downloads/gkemedium-1d285a7a4755.json',
}); */

/* var corsOptions = {
  origin: '*'
} */


const getUsers = async () => {
    const snapshot = await db.collection('users').get();
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