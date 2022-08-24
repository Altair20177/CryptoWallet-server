const express = require("express");
const fetch = require("node-fetch");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema");
const crypts = [];
const request = require("request");
const app = express();
app.use(cors());

const root = {
  getAllCrypts: async () => {
    crypts.splice(0, crypts.length);
    const cryptsFetchPromise = await fetch(`https://api.coincap.io/v2/assets/`);
    const cryptsFetch = await cryptsFetchPromise.json();

    for (let crypt of cryptsFetch.data) {
      crypts.push(crypt);
    }

    return crypts;
  },

  getCryptAbout: async ({ id }) => {
    const obj = {
      about: crypts.find((crypt) => crypt.id === id),
      historyPerDay: [],
      markets: [],
      rates: {},
    };

    const historyPromise = await fetch(
      `https://api.coincap.io/v2/assets/${id}/history?interval=d1`
    );
    const history = await historyPromise.json();

    const marketsPromise = await fetch(
      `https://api.coincap.io/v2/assets/${id}/markets`
    );
    const markets = await marketsPromise.json();

    const ratesPromise = await fetch(`https://api.coincap.io/v2/rates/${id}`);
    const rates = await ratesPromise.json();

    obj.historyPerDay = history.data;
    obj.markets = markets.data;
    obj.rates = rates.data;

    return obj;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);

app.listen(5000, () => console.log("server started on port 5000"));
