const has_scans = require("./scan_check");

describe("when scan has an action item with 'No scan events found'", () => {
  it("returns false", () => {
    expect(has_scans(no_scans)).toBe(false);
  });
});

describe("when there is no items scanned in at all", () => {
  it("returns true", () => {
    expect(has_scans(scans_no_items)).toBe(true);
  });
});

describe("when there is a valid item scanned in", () => {
  it("returns true", () => {
    expect(has_scans(contains_scans)).toBe(true);
  });
});

const contains_scans = {
  data: {
    consignmentInfo: [
      {
        itemsCoupons: [
          {
            trackingInfo: [{ action: "Picked up" }]
          }
        ]
      }
    ]
  }
};

const no_scans = {
  data: {
    consignmentInfo: [
      {
        itemsCoupons: [
          {
            trackingInfo: [{ action: "No scan events found" }]
          }
        ]
      }
    ]
  }
};

const scans_no_items = {
  data: {
    consignmentInfo: [{}]
  }
};
