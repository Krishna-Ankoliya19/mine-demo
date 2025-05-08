import Realm from 'realm';
import { Profile } from '../models/User.native';

export const getRealm = () => {
  return new Realm({ schema: [Profile] });
};

export const BSON = Realm.BSON;
