const { v4: uuidv4 } = require("uuid");

const User = require("../model/user");
const { setUser } = require("../service/auth");

async function handeluserSingup(req, res) {
  const { name, emailId, password } = req.body;
  await User.create({
    name,
    emailId,
    password,
  });
  return res.redirect("/");
}

async function handeluserlogin(req, res) {
  const { emailId, password } = req.body;
  const user = await User.findOne({ emailId, password });
  console.log("User", user);

  if (!user)
    return res.render("login", {
      error: "invalid username or password ",
    });

  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
}

module.exports = {
  handeluserSingup,
  handeluserlogin,
};
