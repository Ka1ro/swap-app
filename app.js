const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const {DB_CONNECTION} = require('./keys')
const cookieParser = require('cookie-parser');


const userValidation = require('./validation/userValidator');
const itemValidation = require('./validation/itemValidator');
const {createUser, loginUser, authMe} = require('./db/db-requests/userRequests');

const {itemCreate, itemUpdate, itemDelete, getAllInCollection} = require('./db/db-requests/itemRequests');

const {addCollectionRequest, addItemToCollection, removeItemFromCollection} = require('./db/db-requests/setRequests');
const { DB_CONNECTION } = require('./keys');

const PORT = 3001;
const app = express();

mongoose.connect(DB_CONNECTION)
.then(()=>console.log('db connected')).catch(error=>console.log(error));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());


app.get('/main', authMe, (req, res)=>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/main/reg', (req, res)=>{
  res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});


app.get('/main/login', (req, res)=>{
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/auth/reg', userValidation, createUser);
app.post('/auth/login', userValidation, loginUser);
app.get('/auth/me', authMe );

app.get('/items/show-all/:collectionName', getAllInCollection);

app.post('/items/create-item', authMe, itemValidation, itemCreate);
app.patch('/items/:id', authMe, itemValidation, itemUpdate);
app.delete('/items/:id', authMe, itemValidation, itemDelete);

app.post('/collections/add-one', addCollectionRequest);
app.post('/collections/add-item-to-collection', addItemToCollection);
app.delete('/collections/delete-item', removeItemFromCollection);

app.listen(PORT, ()=>{
  console.log("calling serv");
});