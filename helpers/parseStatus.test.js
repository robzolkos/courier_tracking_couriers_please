const parseStatus = require("./parseStatus");

describe("parseStatus ", () => {
  it("returns a delivered true object when `delivered1 of 1", () => {
    expect(parseStatus("delivered1 of 1")).toEqual({
      delivered: true,
      status: "delivered"
    });
  });

  it("returns a delivered true object when `delivered2 of 2", () => {
    expect(parseStatus("delivered2 of 2")).toEqual({
      delivered: true,
      status: "delivered"
    });
  });

  it("returns a delivered false object when `delivered1 of 2", () => {
    expect(parseStatus("delivered1 of 2")).toEqual({
      delivered: false,
      status: "delivered"
    });
  });

  it("returns a delivered false object when `picked up1 of 2", () => {
    expect(parseStatus("picked up1 of 2")).toEqual({
      delivered: false,
      status: "picked up"
    });
  });

  it("returns a delivered false object when no numbers in text", () => {
    expect(parseStatus("picked up")).toEqual({
      delivered: false,
      status: "picked up"
    });
  });

  it("returns a delivered false object when null is passed in", () => {
    expect(parseStatus(null)).toEqual({
      delivered: false,
      status: "No status"
    });
  });

  it("returns a delivered false object when empty string is passed in", () => {
    expect(parseStatus("")).toEqual({
      delivered: false,
      status: "No status"
    });
  });
});
