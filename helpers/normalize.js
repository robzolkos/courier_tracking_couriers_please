const uniqWith = require("lodash.uniqwith");
const isEqual = require("lodash.isequal");

const has_scans = require("./scan_check");
const parseStatus = require("./parseStatus");
const formatDate = require("./formatDate");
const courier_finder = require("courier_finder");

function get_connote(res) {
  try {
    const connote = res.data.consignmentInfo[0].consignmentCode;
    return connote;
  } catch (e) {
    return "Unknown";
  }
}

function parseAction(action) {
  if (action === "Your Parcel Has been Picked Up") {
    return "Picked Up";
  }

  if (action.match(/Your parcel is in transit from/) != null) {
    return "Transfer to new depot";
  }

  if (action.match(/Your parcel\(s\) have arrived in .+ depot./) != null) {
    return "Arrive at destination depot in transit";
  }

  if (action.match(/Attempted to deliver parcel/) != null) {
    return "Failed delivery attempt";
  }

  if (action.match(/Your parcel is on-board for delivery/) != null) {
    return "On-board for delivery";
  }

  if (action.match(/\d+ item has been delivered. Signed for by:/) != null) {
    const signed_for_by = action.match(/Signed for by:(.*)/);
    if (signed_for_by.length > 0) {
      return "Goods delivered: " + signed_for_by[0];
    }
    return "Goods delivered";
  }

  return action;
}

function _compareDate(a, b) {
  let comparison = 0;

  if (a.value > b.value) {
    comparison = -1;
  } else if (a.value < b.value) {
    comparison = 1;
  }

  return comparison;
}

function transform(res) {
  if (!has_scans(res)) {
    return {
      error: true,
      message: "No scan events found"
    };
  }

  let trackingInfo = [];
  let pickedupAt = null;
  let pickedUp = false;
  let image_url = null;
  res.data.consignmentInfo[0].itemsCoupons.forEach(coupon => {
    if (image_url == null && coupon.imageURL.length > 0) {
      image_url = coupon.imageURL;
    }

    coupon.trackingInfo.forEach(info => {
      let isoDate = formatDate(info.date, info.time);

      let h = {
        date: isoDate.date,
        time: isoDate.time,
        value: isoDate.value,
        action: parseAction(info.action.trim())
      };
      if (info.action.indexOf("Picked Up") != -1) {
        pickedupAt = { date: isoDate.date, time: isoDate.time };
        pickedUp = true;
      }
      trackingInfo.push(h);
    });
    trackingInfo.sort(_compareDate);
  });

  let st = parseStatus(res.data.consignmentInfo[0].status);
  trackingInfo = uniqWith(trackingInfo, isEqual);

  let delivered = st.delivered;
  let deliveredAt = null;
  if (delivered) {
    ob = trackingInfo[0];
    deliveredAt = { date: ob.date, time: ob.time };
  }

  trackingInfo.forEach(function(v) {
    delete v.value;
  });

  let r = {
    connote: get_connote(res),
    statusCode: 200,
    courier: "Couriers Please",
    status: st.status,
    pickedUp: pickedUp,
    pickedupAt: pickedupAt,
    delivered: delivered,
    deliveredAt: deliveredAt,
    signature: image_url,
    trackingLink: courier_finder(get_connote(res)).tracking_link,
    activity: trackingInfo
  };

  return r;
}

module.exports = transform;
