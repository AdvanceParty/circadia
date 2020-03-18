require('dotenv').config();
const { WebClient, ErrorCode } = require('@slack/web-api');
const api_token = process.env.AU_COM_ADVANCEPARTY_SLASHIE_TOKEN;
const slack = new WebClient(api_token);

const MESSAGES = {
  NO_REQUEST: 'You need to ask me to do something.',
  REQUEST_NOT_RECOGNISED: "I don't know how to do that.",
  NOT_AUTHORISED: 'Slack authentication faled.'
};

const ERRORS = {
  channel_not_found:
    "Can't find the requested channel to post your message into.",
  not_in_channel:
    'Oops, I need to be invited in first! Please add me to the channel and try again.'
};

const postMessage = (channel, text) => {
  return slack.chat.postMessage({
    api_token,
    channel,
    text
  });
};

const postEphemeral = (channel, user, text) => {
  return slack.chat.postEphemeral({
    api_token,
    channel,
    user,
    text
  });
};

const getFriendlyErrorMessage = error => {
  const errorCode =
    (error.data && error.data.error) ||
    error.code ||
    error.message ||
    'Unknown Error';

  return ERRORS[errorCode] || errorCode;
};

module.exports = async (req, res) => {
  const { body } = req;
  const { channel_id, user_id, user_name, text } = body;
  const failedPosts = [];
  const msg = `Hello, ${user_name}. I heard you say: "${text}"`;
  const dms = text.match(/\@[\w]*/g) || [];

  console.log(dms);
  const bullet = '\n\t • ';

  for (var i = 0; i < dms.length; i++) {
    const recipient = dms[i];
    try {
      await postMessage(recipient, msg);
    } catch (e) {
      failedPosts.push(recipient);
    }
  }

  try {
    if (failedPosts.length > 0) {
      await postEphemeral(
        channel_id,
        user_id,
        `Oh-oh! Couldn't send messages to one or more recipients:${bullet}${failedPosts.join(
          bullet
        )}\n\nMake sure the names are correct and try again.`
      );
    }
    await postMessage(channel_id, msg);
  } catch (error) {
    res.status(200).send(getFriendlyErrorMessage(error));
  }
  res.status(200).end();
};
