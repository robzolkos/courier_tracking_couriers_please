function parseStatus(status) {
  if (status == null || status.trim().length == 0) {
    status = "No status";
  }
  let s = status.match(/(?=\w+)(\d+) of (\d+)/);

  let statusText;
  let delivered = false;

  if (s && s.length >= 3) {
    let item_counts = s[0];
    let firstItem = s[1];
    let totalItems = s[2];

    status_text = status.split(item_counts)[0];
    status_text = status_text.trim().toLowerCase();

    if (status_text === "delivered" && firstItem === totalItems) {
      delivered = true;
    }
  } else {
    status_text = status;
  }

  return {
    status: status_text,
    delivered: delivered
  };
}

module.exports = parseStatus;
