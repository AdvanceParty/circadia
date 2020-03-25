const { WebClient } = require('@slack/web-api');
const token = process.env.SLACK_BOT_TOKEN;
const web = new WebClient(token);

import authenticateRequest from './_utils/authenticateRequest';
import { forbidden } from './_responses/forbidden';

module.exports = async (req, res) => {
  if (!authenticateRequest(req)) {
    return forbidden(res);
  }

  const result = await web.users.list();
  res.status(200);
  res.json({ body: result });
};
