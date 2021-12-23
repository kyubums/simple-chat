const { nanoid } = require("nanoid");

module.exports = {
  type: String,
  default: () => nanoid(),
  index: true,
}
