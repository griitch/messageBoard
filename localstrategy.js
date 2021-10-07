const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const strategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    const isMatching = await bcrypt.compare(password, user.password);
    if (isMatching) {
      return done(null, user);
    }

    return done(null, false, { message: "Incorrect password " });
  } catch (error) {
    console.log(error);
  }
});

module.exports = strategy;
