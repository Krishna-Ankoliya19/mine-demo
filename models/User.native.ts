// app/models/User.native.ts
import { BSON } from 'realm';

export class Profile extends Realm.Object<Profile> {
  _id!: BSON.ObjectId;
  name!: string;
  email!: string;
  gender!: string;
  age!: number;
  interests!: string[];
  dateOfBirth!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Profile',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      email: 'string',
      gender: 'string',
      age: 'int',
      interests: 'string[]',
      dateOfBirth: 'date',
    },
  };
}
