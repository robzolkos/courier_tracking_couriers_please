function has_scans(res) {
  try {
    if (
      res.data.consignmentInfo[0].itemsCoupons[0].trackingInfo[0].action ==
      "No scan events found"
    ) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = has_scans;
