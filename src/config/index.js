const env = process.env.REACT_APP_ENV;
let config = null;

if (env === 'prod') {
  config = require('./prod');
} else if (env === 'dev') {
  config = require('./dev');
} else if (env === 'test') {
  config = require('./dev');
} else {
  config = require('./dev');
}

export default config.default;
