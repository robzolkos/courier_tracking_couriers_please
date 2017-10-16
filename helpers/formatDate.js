const moment = require("moment");

function formatDate(date_part, time_part) {
  const date_to_convert = date_part + " " + time_part;
  const parsed_date = moment(date_to_convert, "D MMM YYYY h:mm a");
  const date_string = parsed_date.format("MMM D, YYYY");
  const time_string = parsed_date.format("h:mma");
  const valueDate = parsed_date.valueOf();

  return {
    date: date_string,
    time: time_string,
    value: valueDate
  };
}

module.exports = formatDate;
