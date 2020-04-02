require("dotenv").config();
const express = require("express");
const massive = require("massive");

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;
// const {getAll, getOne, update, create, delete}  = require('./controller/studentsCtrl')
    // the "delete" kept giving me an error, so i changed the name of the func tion to deleteProduct
const {getAll, getOne, update, create, deleteProduct} = require('./controller/productsCtrl')


massive({
connectionString: CONNECTION_STRING,
ssl: {rejectUnauthorized: false}
})
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.use(express.json());

// GET ALL
app.get('/api/products', getAll);

// GET ONE 
app.get('/api/products/:id', getOne);

// UPDATE 
app.put('/api/products/:id', update);

// CREATE 
app.post('/api/products', create)

app.delete('/api/products/:id', deleteProduct);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});