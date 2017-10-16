const formatDate = require("./formatDate");

describe("formatDate", () => {
  it("returns a date", () => {
    expect(formatDate("22 Sep 2017", "11:01 am")).toEqual({
      date: "Sep 22, 2017",
      time: "11:01am",
      value: 1506078060000
    });
  });
});
