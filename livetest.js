const fetcher = require("./index");

// USAGE: node livetest.js apikey account connote
// eg node livetest.js 12345 abcd CP0001001001

const cp_api_key = process.argv[2];
const cp_account_number = process.argv[3];
const connote = process.argv[4];

fetcher(cp_api_key, cp_account_number, connote, (err, r) => {
  if (err) {
    console.log(err);
  } else {
    console.log(r);
  }
});
