export class User {
  private firstName: string;
  private lastName: string;
  private address: string;
  private phoneNumber: string;
  private birthDate: Date;
  private email: string;
  private password: string;

  constructor(email: string, password: string);
  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    birthDate: Date
  );
  constructor(...myarray: any[]) {
    this.email = myarray[0];
    this.password = myarray[1];
    if (myarray.length > 2) {
      this.firstName = myarray[2];
      this.lastName = myarray[3];
      this.address = myarray[4];
      this.phoneNumber = myarray[5];
      this.birthDate = myarray[6];
    }
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getAddress() {
    return this.address;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  getBirthDate() {
    return this.birthDate;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }

  setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  setLastName(lastName: string) {
    this.lastName = lastName;
  }

  setAddress(address: string) {
    this.address = address;
  }

  setPhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  setBirthDate(birthDate: Date) {
    this.birthDate = birthDate;
  }


}
