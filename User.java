class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  login() {
    console.log(`${this.name} has logged in.`);
  }

  logout() {
    console.log(`${this.name} has logged out.`);
  }
}
