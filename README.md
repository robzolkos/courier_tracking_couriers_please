##  courier_tracking_couriers_please

Gets tracking information for a Couriers Please connote and returns normalized json response.

[![Build Status](https://travis-ci.org/robzolkos/courier_tracking_couriers_please.svg?branch=master)](https://travis-ci.org/robzolkos/courier_tracking_couriers_please)

#### Usage

```javascript
const cp_tracker = require('courier_tracking_couriers_please');

cp_tracker("API_KEY", "COURIERS_PLEASE_ACCOUNT", "CONNOTE", (err, r) => {
  if (err) {
    console.log(err);
  } else {
    console.log(r);
  }
});

```

A valid result will return a response like

```javascript
{
    connote: 'CPAHOWE000000',
    statusCode: 200,
    courier: 'Couriers Please',
    status: 'delivered',
    pickedUp: true,
    pickedupAt: {
        date: 'Sep 25, 2017',
        time: '10:50am'
    },
    delivered: true,
    deliveredAt: {
        date: 'Sep 27, 2017',
        time: '3:16pm'
    },
    signature: 'http://edi.couriersplease.com.au/api/track/signature.php?image',
    activity: [{
            date: 'Sep 27, 2017',
            time: '3:16pm',
            action: 'Goods delivered: Signed for by:ROB'
        },
        {
            date: 'Sep 27, 2017',
            time: '12:00pm',
            action: 'On-board for delivery'
        },
        {
            date: 'Sep 27, 2017',
            time: '5:41am',
            action: 'Arrive at destination depot in transit'
        },
        {
            date: 'Sep 25, 2017',
            time: '11:24am',
            action: 'Transfer to new depot'
        },
        {
            date: 'Sep 25, 2017',
            time: '10:50am',
            action: 'Picked Up'
        }
    ]
}
```

An error result will look like:

```javascript
{
  connote: "BLAHBLAH",
  statusCode: 500,
  message: { error: "Invalid Couriers Please connote" }
}
```

#### Command Line testing

There is a command line script `livetest.js` that can be run to get responses in the terminal.

Usage for this is: `node livetest.js apikey account connote`


#### Installation

```
npm install courier_tracking_couriers_please

or

yarn add courier_tracking_couriers_please
```

#### Licence

MIT
