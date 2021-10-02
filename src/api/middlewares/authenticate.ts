import * as passport from 'passport';
import { Authenticator } from 'passport';

export default function authenticate(): Authenticator {
  return passport.authenticate('jwt', {
    session: false
  });
}
