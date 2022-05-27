export class User {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  birthDate: Date;
  email: string;
  password: string;
  role: string;

  constructor(data: any)
  {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.address = data.address;
    this.phoneNumber = data.phoneNumber;
    this.birthDate = data.birthDate;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
 }

}
