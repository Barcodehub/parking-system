export class CreateUserDTO {
  name: string;
  email: string;
  password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export class UserDTO {
  id: number;
  name: string;
  email: string;
  createdAt: Date;

  constructor(user: { id: number; name: string; email: string; createdAt: Date }) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
  }
}