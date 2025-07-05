const crypto = require('crypto');
const User = require("../models/user");

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserViewModel {

  async authUserGoogle(body){
    const ticket = await client.verifyIdToken({
      idToken: body.credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    //now check it out in database
    const statusUser = await User.findByEmail(payload.email);

    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      status: statusUser,
    };

  }

  async register(body){
    //check it out first password and password_confirmation if it's not same return error else go next algorithm
    let email = body.email;
    let name = body.name;
    let password = body.password;
    let password_confirmation = body.password_confirmation;

    if (password !== password_confirmation) {
      return false;
    }

    // Hash password using SHA-256
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex'); // Final hashed string

    // Register user with hashed password
    const user = await User.register(email, hashedPassword, name);
    return user;
  }

  async getContent(query){
    const content = await User.getContent(query.email);
    return content;
  }

  async login(body){
    //check it out first password and password_confirmation if it's not same return error else go next algorithm
    let email = body.email;
    let password = body.password;

    // Hash password using SHA-256
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex'); // Final hashed string

    // Register user with hashed password
    const user = await User.login(email, hashedPassword);
    return user;
  }

}

module.exports = new UserViewModel();
