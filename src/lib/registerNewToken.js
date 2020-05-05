import { db } from '../lib/firebase';
import { USERS } from '../../src/constants';

export default function registerNewToken(token) {
  db.collection(USERS)
    .doc(token)
    .set({ user_token: token });
}
