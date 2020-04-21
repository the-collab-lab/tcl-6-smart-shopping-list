import { db } from '../lib/firebase';
export default function registerNewToken(token) {
  db.collection('users')
    .doc(token)
    .collection('items')
    .add({});
}
