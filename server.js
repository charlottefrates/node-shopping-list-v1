
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

//importing ShoppingList model from  diff module
// just an interface to retrieve current state of application's shopping list
const {ShoppingList,Recipes} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

//When server starts manual addition of items below are listed for response
// we're going to add some items to ShoppingList
// so there's some data to look at
ShoppingList.create('beans', 2);
ShoppingList.create('tomatoes', 3);
ShoppingList.create('peppers', 4);

//Recipe additions
Recipes.create('chocolate milk', ['cocoa', 'milk', 'sugar']);
Recipes.create('peanut butter and jelly sandwhich', ['2 pieces bread', 'peanut butter', 'jelly']);

// when the root of this router is called with GET, return
// all current ShoppingList items
app.get('/shopping-list', (req, res) => {
  //app responses by serializing the data returned by ShoppingList
  // note endpoint does not know how ShoppingList is implemented
  res.json(ShoppingList.get());
});

//recipe request
app.get('/recipes', (req, res) => {
  //app responses by serializing the data returned by ShoppingList
  // note endpoint does not know how ShoppingList is implemented
  res.json(Recipes.get());
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
