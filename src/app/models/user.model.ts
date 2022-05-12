export class User {
  private id: string;
  private firstName: string;
  private lastName: string;
  private address: string;
  private phoneNumber: string;
  private birthDate: Date;
  private email: string;
  private password: string;
  private role: string;

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

  public get Id(): string {
    return this.id;
  }


  public get Email() {
    return this.email;
  }

  public get Password() {
    return this.password;
  }

  public get FirstName() : string {
    return this.firstName;
  }

  public get LastName() {
    return this.lastName;
  }

  public get Address() {
    return this.address;
  }

  public get PhoneNumber() {
    return this.phoneNumber;
  }

  public get BirthDate() {
    return this.birthDate;
  }

  set Id(id: string) {
    this.id = id;
  }

  set Email(email: string) {
    this.email = email;
  }

  set Password(password: string) {
    this.password = password;
  }

  set FirstName(firstName: string) {
    this.firstName = firstName;
  }

  set LastName(lastName: string) {
    this.lastName = lastName;
  }

  set Address(address: string) {
    this.address = address;
  }

  set PhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  set BirthDate(birthDate: Date) {
    this.birthDate = birthDate;
  }

  set Role(role: string) {
    this.role = role;
  }

  get Role(): string {
    return this.role;
  }

}
