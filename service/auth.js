// const sessionIdtoUserMap = new Map();

const jwt = require("jsonwebtoken");
const secret = "vishnu$428@$";
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      emailId: user.emailId,
    },
    secret
  );
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, secret);
}

module.exports = {
  setUser,
  getUser,
};
