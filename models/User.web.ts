// app/models/User.web.ts
export class Profile {
    _id: string;
    name: string;
    email: string;
    gender: string;
    age: number;
    interests: string[];
    dateOfBirth: Date;
  
    constructor() {
      this._id = "";
      this.name = "";
      this.email = "";
      this.gender = "";
      this.age = 0;
      this.interests = [];
      this.dateOfBirth = new Date();
    }
  
    static schema = {
      name: "Profile",
      properties: {
        _id: "string",
        name: "string",
        email: "string",
        gender: "string",
        age: "int",
        interests: "string[]",
        dateOfBirth: "date",
      },
    };
  }
  