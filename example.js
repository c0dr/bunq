const Bunq = require("./bunq");
const fs = require('fs');
const path = process.cwd();
const buffer = fs.readFileSync(path + "/private.pem");
const privateKey = buffer.toString();

const AUTH_TOKEN = "";
const API_TOKEN = "";

let bunq = new Bunq(AUTH_TOKEN, API_TOKEN, privateKey);
let userId;

bunq.initSession().then(function() {
  bunq.getUser().then(function(response) {
    userId = bunq.parseResponse(response)[0]["UserCompany"]["id"];
    bunq.getMonetaryAccount(userId).then(function(response) {
      let firstAccount = bunq.parseResponse(response)[0]["MonetaryAccountBank"];
      console.log(firstAccount.balance.value + firstAccount.balance.currency);
    }).catch(function(error) {
      console.log(error);
    })
  }).catch(function(error) {
    console.log(error);
  })

}).catch(function(error) {
  console.log(error);
})