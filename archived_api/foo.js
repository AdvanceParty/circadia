import authenticateRequest from './_utils/authenticateRequest';
import { forbidden } from './_responses/forbidden';

module.exports = async (req, res) => {
  if (!authenticateRequest(req)) {
    return forbidden(res);
  }

  res.json({ body: 'BAR' });
};
