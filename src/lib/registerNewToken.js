import { db } from '../lib/firebase';
export default function registerNewToken(token) {
  db.collection('items').add({ user_token: token });
}
