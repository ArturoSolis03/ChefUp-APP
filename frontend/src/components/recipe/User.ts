export class User {
  name: string = '';
  email: string = '';
  password: string = '';
  accessToken: string = '';
  refreshToken: string = '';

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.name) this.name = initializer.name;
    if (initializer.email) this.email = initializer.email;
    if (initializer.password) this.password = initializer.password;
    if (initializer.accessToken) this.accessToken = initializer.accessToken;
    if (initializer.refreshToken) this.refreshToken = initializer.refreshToken;
  }
}