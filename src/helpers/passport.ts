import { Unauthorized } from 'controllers/errors/AuthErrors';
import { User } from 'models/User';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { hash } from 'bcrypt';

const basic = new BasicStrategy(async (username, password, done) => {
  const user = await User.findByEmail(username);
  await hash('a', 10);
  if(!user) {
    return done(new Unauthorized());
  }
  const isPasswordValid = await user.validPassword(password);
  if(isPasswordValid) {
    return done(null, user);
  }
  return done(new Unauthorized());
});

passport.use('basic', basic);

passport.serializeUser((user, done) => {
  if(user)
    done(null, (user as User)._id);
  else
    done(new Unauthorized());
});

passport.deserializeUser(async (id: string, done) => {
  const user = await User.findByPk(id);
  if(user)
    done(null, user);
  else
    done(new Unauthorized());
});

export const passportMiddleware = passport.authenticate('basic');

