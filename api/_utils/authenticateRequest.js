// This is a hacky, temporary security measure to restrict
// API access to authorised users, via a password check.
//  ToDo ******************
// Upgrade to JWT token integrated wit Auth0 before release

const pw = process.env.TEMP_API_PW;
console.log(pw);

export default req => {
  let verified = false;
  try {
    const tempToken = req.headers['temp-token'];
    console.log(`tempToken: ${tempToken}`);
    verified = tempToken === pw;
  } catch (e) {
    console.error(e.message);
  }
  return verified;
};
