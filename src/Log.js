import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: process.env.REACT_APP_ROLLBAR_CLIENT_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

class Log {
  static critical = (msg) => rollbar.critical(msg);
  static error = (msg) => rollbar.error(msg);
  static warning = (msg) => rollbar.warning(msg);
  static info = (msg) => rollbar.info(msg);
  static debug = (msg) => rollbar.debug(msg);
}

export default Log;
