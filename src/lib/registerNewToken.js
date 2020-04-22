import { db } from '../lib/firebase';
import { ITEMS } from '../../src/constants';

export default function registerNewToken(token) {
  db.collection(ITEMS).add({ user_token: token });
}
