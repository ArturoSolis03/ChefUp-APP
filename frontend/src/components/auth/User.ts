export class User {
  id?: string;
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.name) this.name = initializer.name;
    if (initializer.email) this.email = initializer.email;
    if (initializer.password) this.password = initializer.password;
  }
}