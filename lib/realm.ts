// app/lib/realm.ts
import Realm from 'realm';
import { Profile } from '../models/User';

export const getRealm = () => {
  return new Realm({ schema: [Profile] });
};
