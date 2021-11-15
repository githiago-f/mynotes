import { User } from 'models/User';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';

const basic = new BasicStrategy(async (username, password, done) => {
  const user = await User.findByEmail(username);
  const isPasswordValid = user?.validPassword(password) || false;
  if(isPasswordValid) {
    return done(null, user);
  }
  return done('Email or password are invalid', null);
})

passport.use('basic', basic);

export const passportMiddleware = passport.authenticate('basic');

