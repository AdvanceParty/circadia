const qs = require('qs');
const crypto = require('crypto');
const versionString = 'v0';

const generateHash = str => {
  return crypto
    .createHmac('sha256', process.env.SLACK_SIGNING_SECRET)
    .update(str)
    .digest('hex');
};

export default req => {
  let verified = false;
  try {
    const requestSignature = req.headers['x-slack-signature'];
    const timestamp = req.headers['x-slack-request-timestamp'];
    const bodyString = qs.stringify(JSON.stringify(req.body), {
      format: 'RFC1738'
    });
    const basestring = `${versionString}:${timestamp}:${bodyString}`;
    const generatedSignature = `${versionString}=${generateHash(basestring)}`;

    verified = generatedSignature === requestSignature;

    console.log(`HELLO`);
    console.log(`timestamp: ${timestamp}`);
    console.log(`bodyString: ${bodyString}`);

    console.log(`generatedSignature: ${generatedSignature}`);
    console.log(`requestSignature:   ${requestSignature}`);
    console.log(`Verified: ${verified}`);
  } catch (e) {
    console.error(e.message);
  }
  return verified;
};
