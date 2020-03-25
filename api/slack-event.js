// const { text } = require('micro');
// const { parse } = require('querystring');
import verifyMessageOrigin from './_utils/verifyMessageOrigin';
import User from './_classes/User';

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
    if (req.body.event) {
      onSlackEvent(req.body.event);
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('');
  }
};

const onSlackEvent = event => {
  const type = event.type;
  switch (type) {
    case 'user_change':
      onUserChange(event);
      break;
    case 'dnd_updated_user':
      onDndUpdatedUser(event);
      break;
    case 'presence_change':
      onPresenceUpdatedUser(event);
      break;
    default:
      console.log(`Igonoring ${event.type} event from Slack`);
      break;
  }
};

const onUserChange = event => {
  const user = new User(event.user);
  console.log(`${user.displayName} | ${user.statusText} | ${user.statusEmoji}`);
};

const onDndUpdatedUser = event => {
  // EVENT OBJECT EXAMPLE:
  // {
  //   type: 'dnd_updated_user',
  //   user: 'U94DFU1FX',
  //   dnd_status: {
  //     dnd_enabled: true,
  //     next_dnd_start_ts: 1584586995,
  //     next_dnd_end_ts: 1584590595
  //   },
  //   event_ts: '1584586996.075000'
  // }

  console.log(event);
  console.log('DO NOT DISTURB UPDATED!');
};

const onPresenceUpdatedUser = event => {
  // EVENT OBJECT EXAMPLE:
  // {
  //   type: 'dnd_updated_user',
  //   user: 'U94DFU1FX',
  //   dnd_status: {
  //     dnd_enabled: true,
  //     next_dnd_start_ts: 1584586995,
  //     next_dnd_end_ts: 1584590595
  //   },
  //   event_ts: '1584586996.075000'
  // }

  console.log(event);
  console.log('Presence Change!');
};
