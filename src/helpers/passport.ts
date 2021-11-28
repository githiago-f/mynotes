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
});

passport.use('basic', basic);

passport.serializeUser((user, done) => {
  if(user)
    done(null, (user as User)._id);
  else
    done('User not found!');
});

passport.deserializeUser(async (id: string, done) => {
  const user = await User.findByPk(id);
  if(user)
    done(null, user);
  else
    done('User not found!');
});

export const passportMiddleware = passport.authenticate('basic');

