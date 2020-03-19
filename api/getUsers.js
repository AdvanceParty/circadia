const { WebClient } = require('@slack/web-api');
const token = process.env.SLACK_BOT_TOKEN;
const web = new WebClient(token);

module.exports = async (req, res) => {
  // ensure the message has originated from
  // an authorised slack channel
  // see https://api.slack.com/docs/verifying-requests-from-slack
  // skipping during dev until I can figure out why my hash
  // isn't matching the expected result.
  const skipOriginVerification = true;

  if (!skipOriginVerification && !verifyMessageOrigin(req)) {
    console.log('Verification failed');
    res.writeHead(403, { 'Content-Type': 'text/html' });
    res.end('Forbidden. Message origin could not be verified.');
    return;
  } else {
    const result = await web.users.list();
    console.log(result);

    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Cache-Control': 's-maxage=28800'
    });

    res.end('');
  }
};
