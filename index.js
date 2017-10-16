const request = require("request");
const courier_finder = require("courier_finder");

const normalize = require("./helpers/normalize");

const url =
  "https://api.couriersplease.com.au/v1/domestic/locateParcel?trackingCode=";

function fetcher(api_key, account_number, connote, cb) {
  const check_validity = courier_finder(connote);

  if (check_validity.courier != "Couriers Please") {
    return cb({
      connote: connote,
      statusCode: 500,
      message: { error: "Invalid Couriers Please connote" }
    });
  }

  const auth_header = new Buffer(account_number + ":" + api_key).toString(
    "base64"
  );

  request.get(
    {
      url: url + connote,
      headers: {
        Authorization: "Basic " + auth_header,
        "Content-Type": "application/json"
      }
    },
    (error, response, body) => {
      try {
        response_body = JSON.parse(body);
      } catch (e) {
        return cb({
          connote: connote,
          statusCode: 500,
          message: "Error in reponse from Couriers Please"
        });
      }

      if (
        response.statusCode === 200 &&
        response_body.responseCode == "SUCCESS"
      ) {
        return cb(null, normalize(response_body));
      }

      return cb({
        connote: connote,
        statusCode: response.statusCode,
        message: response_body
      });
    }
  );
}

module.exports = fetcher;
