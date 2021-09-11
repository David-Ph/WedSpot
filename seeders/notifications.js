const { Notification } = require("../models"); // TODO should add vendor later

async function deleteNotifications() {
  await Notification.remove();
  console.log("Notifications has been deleted");
}

module.exports = {
  deleteNotifications,
};
